'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatEUR } from '@/lib/checkout'

interface OrderSummary {
  id: string
  paymentStatus: string
  amountTotal: number | null
  currency: string | null
  customerEmail: string | null
}

/** Short human-friendly order reference derived from the Stripe session id. */
function orderRef(sessionId: string): string {
  return sessionId.replace(/^cs_(test_|live_)?/, '').slice(0, 10).toUpperCase()
}

export default function ConfirmationClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()

  const [order, setOrder] = useState<OrderSummary | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>(
    sessionId ? 'loading' : 'error',
  )

  // Empty the cart exactly once, as soon as we land here with a session id.
  const cleared = useRef(false)
  useEffect(() => {
    if (sessionId && !cleared.current) {
      cleared.current = true
      clearCart()
    }
  }, [sessionId, clearCart])

  useEffect(() => {
    if (!sessionId) return
    let active = true
    fetch(`/api/checkout?session_id=${encodeURIComponent(sessionId)}`)
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: OrderSummary) => {
        if (active) {
          setOrder(data)
          setState('ready')
        }
      })
      .catch(() => active && setState('error'))
    return () => {
      active = false
    }
  }, [sessionId])

  if (state === 'error') {
    return (
      <div style={{ textAlign: 'center', padding: '64px 24px' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, marginBottom: 10 }}>
          Commande introuvable
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', maxWidth: 420, margin: '0 auto 28px' }}>
          Nous n’avons pas pu retrouver votre commande. Si vous avez été débité, contactez-nous à{' '}
          <a href="mailto:contact@strada-signal.fr" style={{ color: 'var(--verde)' }}>contact@strada-signal.fr</a>.
        </p>
        <Link href="/catalogue" style={{
          display: 'inline-block', padding: '12px 24px', background: 'var(--verde)', color: 'white',
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
          borderRadius: 'var(--r)', textDecoration: 'none',
        }}>
          Retour au catalogue
        </Link>
      </div>
    )
  }

  const amount =
    order?.amountTotal != null ? formatEUR(order.amountTotal / 100) : null

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '56px 24px', textAlign: 'center' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'var(--verde-light)', border: '1px solid var(--verde-mid)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px',
      }}>
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--verde)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, letterSpacing: '-0.02em', marginBottom: 12 }}>
        Merci pour votre commande !
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 32 }}>
        Un email de confirmation
        {order?.customerEmail ? ` a été envoyé à ${order.customerEmail}` : ' vous a été envoyé'}.
        Votre commande est en préparation.
      </p>

      <div style={{
        textAlign: 'left', background: 'var(--surface-alt)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '20px 22px', marginBottom: 32,
      }}>
        {sessionId && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Numéro de commande</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: "'Space Grotesk', sans-serif" }}>
              {orderRef(sessionId)}
            </span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Total payé</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
            {state === 'loading' ? '…' : amount ?? '—'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Livraison estimée</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Sous 3 jours ouvrés</span>
        </div>
      </div>

      <Link href="/catalogue" style={{
        display: 'inline-block', padding: '13px 26px', background: 'var(--verde)', color: 'white',
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
        borderRadius: 'var(--r)', textDecoration: 'none',
      }}>
        Continuer mes achats
      </Link>
    </div>
  )
}
