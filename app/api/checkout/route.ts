import { NextResponse, type NextRequest } from 'next/server'
import Stripe from 'stripe'
import { api, type ProductDetail } from '@/lib/api/server'
import { TVA_RATE, type CheckoutRequest } from '@/lib/checkout'

const secretKey = process.env.STRIPE_SECRET_KEY
const stripe = secretKey ? new Stripe(secretKey) : null

/**
 * Create a Stripe Checkout Session from the client cart.
 *
 * Prices are never trusted from the client: each line is re-priced from the
 * catalogue API by (productSlug, variantId). Amounts are sent to Stripe TTC so
 * the charged total matches the total displayed at checkout.
 */
export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Le paiement n’est pas configuré (STRIPE_SECRET_KEY manquante).' },
      { status: 503 },
    )
  }

  let body: CheckoutRequest
  try {
    body = (await req.json()) as CheckoutRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { items, customer } = body ?? {}
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Le panier est vide.' }, { status: 422 })
  }
  if (!customer?.nom?.trim() || !customer?.adresse?.trim() || !customer?.ville?.trim()) {
    return NextResponse.json({ error: 'Adresse de livraison incomplète.' }, { status: 422 })
  }

  // Re-price server-side. Fetch each distinct product once.
  const slugs = [...new Set(items.map(i => i.productSlug))]
  let products: ProductDetail[]
  try {
    products = await Promise.all(slugs.map(slug => api.product(slug)))
  } catch {
    return NextResponse.json({ error: 'Produit introuvable.' }, { status: 502 })
  }
  const bySlug = new Map(products.map(p => [p.slug, p]))

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  for (const item of items) {
    const product = bySlug.get(item.productSlug)
    const variant = product?.variants.find(v => v.id === item.variantId)
    if (!product || !variant) {
      return NextResponse.json(
        { error: `Article indisponible (${item.productSlug}).` },
        { status: 422 },
      )
    }

    const priceHT = parseFloat(variant.price)
    if (Number.isNaN(priceHT)) {
      return NextResponse.json(
        { error: `Cet article est disponible sur devis uniquement (${product.name}).` },
        { status: 422 },
      )
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return NextResponse.json({ error: 'Quantité invalide.' }, { status: 422 })
    }

    const variantLabel = variant.attributes.map(a => a.display).join(' · ')
    const unitAmountTTC = Math.round(priceHT * (1 + TVA_RATE) * 100)

    lineItems.push({
      quantity: item.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: unitAmountTTC,
        product_data: {
          name: variantLabel ? `${product.name} — ${variantLabel}` : product.name,
          metadata: { sku: variant.sku },
        },
      },
    })
  }

  const origin = new URL(req.url).origin

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
      shipping_address_collection: { allowed_countries: ['FR', 'BE', 'LU', 'CH', 'DE'] },
      metadata: {
        nom: customer.nom,
        adresse: customer.adresse,
        code_postal: customer.codePostal,
        ville: customer.ville,
        pays: customer.pays,
      },
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] stripe error:', err)
    return NextResponse.json({ error: 'Échec de la création du paiement.' }, { status: 500 })
  }
}

/** Retrieve a completed session so the confirmation page can show the order. */
export async function GET(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Paiement non configuré.' }, { status: 503 })
  }

  const sessionId = new URL(req.url).searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.json({ error: 'session_id manquant.' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json({
      id: session.id,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Commande introuvable.' }, { status: 404 })
  }
}
