import { NextResponse, type NextRequest } from 'next/server'
import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const stripe = secretKey ? new Stripe(secretKey) : null

/**
 * Stripe webhook endpoint. Verifies the signature against STRIPE_WEBHOOK_SECRET
 * and acknowledges payment events. Fulfillment logic (order persistence, email)
 * hooks in here once a backend order model exists.
 */
export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook non configuré.' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante.' }, { status: 400 })
  }

  const payload = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', err)
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.info('[stripe-webhook] checkout completed:', session.id)
      break
    }
    case 'payment_intent.succeeded': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.info('[stripe-webhook] payment succeeded:', intent.id)
      break
    }
    default:
      console.info('[stripe-webhook] unhandled event:', event.type)
  }

  return NextResponse.json({ received: true })
}
