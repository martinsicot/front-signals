import { NextResponse, type NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'

const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

interface CartItem {
  productSlug: string
  variantId: number
  quantity: number
}

interface CheckoutBody {
  items: CartItem[]
  shipping_address: Record<string, string>
  guest_email?: string
}

export async function POST(req: NextRequest) {
  let body: CheckoutBody
  try {
    body = (await req.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { items, shipping_address, guest_email } = body ?? {}
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Le panier est vide.' }, { status: 422 })
  }

  const session = await getServerSession(authOptions)
  const extraHeaders: Record<string, string> = session?.accessToken
    ? { Authorization: `Bearer ${session.accessToken}` }
    : {}

  const orderPayload: Record<string, unknown> = {
    items: items.map(i => ({ variant_id: i.variantId, quantity: i.quantity })),
    shipping_address,
  }
  if (!session?.accessToken && guest_email) {
    orderPayload.guest_email = guest_email
  }

  const orderRes = await fetch(`${BASE}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
    body: JSON.stringify(orderPayload),
  })

  const orderData = (await orderRes.json().catch(() => ({}))) as { id?: number; error?: string; [key: string]: unknown }

  if (!orderRes.ok || !orderData.id) {
    const message = orderData.error ?? Object.values(orderData).flat().join(' ') ?? `HTTP ${orderRes.status}`
    return NextResponse.json({ error: String(message) }, { status: orderRes.status })
  }

  const orderId = orderData.id
  const origin = new URL(req.url).origin

  const checkoutBody: Record<string, string> = {
    return_url: `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  }
  if (!session?.accessToken && guest_email) {
    checkoutBody.guest_email = guest_email
  }

  const checkoutRes = await fetch(`${BASE}/orders/${orderId}/checkout/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
    body: JSON.stringify(checkoutBody),
  })

  const checkoutData = (await checkoutRes.json().catch(() => ({}))) as { client_secret?: string; error?: string }

  if (!checkoutRes.ok || !checkoutData.client_secret) {
    return NextResponse.json(
      { error: checkoutData.error ?? "Échec de la création du paiement." },
      { status: checkoutRes.status },
    )
  }

  return NextResponse.json({ clientSecret: checkoutData.client_secret, orderId })
}

