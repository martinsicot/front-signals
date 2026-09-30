'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/lib/cart'
import { DEVIS_THRESHOLD, TVA_RATE, formatEUR } from '@/lib/checkout'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 14,
  color: 'var(--ink)',
  background: 'var(--bg)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

function variantLabel(item: CartItem): string {
  return item.attributes.map(a => a.display).join(' · ')
}

function OrderSummary({ items, totalHT }: { items: CartItem[]; totalHT: number }) {
  const tva = totalHT * TVA_RATE
  const totalTTC = totalHT + tva

  return (
    <aside style={{
      background: 'var(--surface-alt)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '20px 22px', alignSelf: 'start',
    }}>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: 'var(--ink)', marginBottom: 16 }}>
        Récapitulatif
      </h2>
      {items.map(item => {
        const unit = parseFloat(item.price)
        const line = Number.isNaN(unit) ? NaN : unit * item.quantity
        return (
          <div key={item.variantId} style={{
            display: 'flex', justifyContent: 'space-between', gap: 12,
            fontSize: 13, color: 'var(--ink-muted)', padding: '7px 0',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ minWidth: 0 }}>
              <span style={{ color: 'var(--ink)' }}>{item.productName}</span>
              {variantLabel(item) && <span style={{ opacity: 0.7 }}> ({variantLabel(item)})</span>}
              <span style={{ whiteSpace: 'nowrap' }}> × {item.quantity}</span>
            </span>
            <span style={{ color: 'var(--ink)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {Number.isNaN(line) ? 'Sur devis' : formatEUR(line)}
            </span>
          </div>
        )
      })}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-muted)' }}>
          <span>Sous-total HT</span>
          <span style={{ color: 'var(--ink)' }}>{formatEUR(totalHT)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-muted)' }}>
          <span>TVA ({Math.round(TVA_RATE * 100)} %)</span>
          <span style={{ color: 'var(--ink)' }}>{formatEUR(tva)}</span>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginTop: 6, paddingTop: 12, borderTop: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: 15, color: 'var(--ink)' }}>Total TTC</span>
          <strong style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--ink)',
          }}>{formatEUR(totalTTC)}</strong>
        </div>
      </div>
    </aside>
  )
}

export default function CheckoutClient() {
  const { items, totalHT } = useCart()
  const { data: session, status: sessionStatus } = useSession()

  const [form, setForm] = useState({
    email: '',
    nom: '',
    adresse: '',
    codePostal: '',
    ville: '',
    pays: 'France',
  })
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasUnpriced = items.some(i => Number.isNaN(parseFloat(i.price)))
  const isAuthenticated = sessionStatus === 'authenticated'

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const payload: Record<string, unknown> = {
      items,
      shipping_address: {
        nom: form.nom,
        adresse: form.adresse,
        code_postal: form.codePostal,
        ville: form.ville,
        pays: form.pays,
      },
    }
    if (!isAuthenticated) {
      payload.guest_email = form.email
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { clientSecret?: string; error?: string }
      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }
      setClientSecret(data.clientSecret)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 24px' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, marginBottom: 10 }}>
          Votre panier est vide
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 24 }}>
          Ajoutez des articles avant de passer commande.
        </p>
        <Link href="/catalogue" style={{
          display: 'inline-block', padding: '12px 24px',
          background: 'var(--verde)', color: 'white',
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
          borderRadius: 'var(--r)', textDecoration: 'none',
        }}>
          Voir le catalogue
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 28,
        letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 24,
      }}>
        Finaliser la commande
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }} className="checkout-grid">
        <div>
          {!clientSecret ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: 'var(--ink)' }}>
                Adresse de livraison
              </h2>

              {!isAuthenticated && (
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Email *</span>
                  <input
                    name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="jean@mairie.fr" style={inputStyle}
                  />
                </label>
              )}

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Nom complet *</span>
                <input name="nom" required value={form.nom} onChange={handleChange} placeholder="Jean Dupont" style={inputStyle} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Adresse *</span>
                <input name="adresse" required value={form.adresse} onChange={handleChange} placeholder="12 rue de la Signalétique" style={inputStyle} />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12 }} className="checkout-city-row">
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Code postal *</span>
                  <input name="codePostal" required value={form.codePostal} onChange={handleChange} placeholder="69001" style={inputStyle} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Ville *</span>
                  <input name="ville" required value={form.ville} onChange={handleChange} placeholder="Lyon" style={inputStyle} />
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Pays *</span>
                <input name="pays" required value={form.pays} onChange={handleChange} style={inputStyle} />
              </label>

              {error && (
                <p style={{ fontSize: 13, color: '#c0392b', margin: 0 }} role="alert">{error}</p>
              )}

              {hasUnpriced ? (
                <p style={{ fontSize: 13, color: '#c0392b' }}>
                  Certains articles sont disponibles sur devis uniquement.{' '}
                  <Link href="/devis?from=panier" style={{ color: 'var(--verde)', textDecoration: 'underline' }}>
                    Demandez un devis
                  </Link>.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 8, padding: '14px 24px',
                    background: 'var(--verde)', color: 'white', border: 'none',
                    borderRadius: 'var(--r)', cursor: loading ? 'default' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
                  }}
                >
                  {loading ? 'Chargement…' : 'Procéder au paiement'}
                </button>
              )}

              {totalHT > DEVIS_THRESHOLD && (
                <div style={{
                  padding: '12px 14px',
                  background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10,
                }}>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-muted)', marginBottom: 10 }}>
                    Commande supérieure à {DEVIS_THRESHOLD} € — vous pouvez demander un devis personnalisé.
                  </p>
                  <Link href="/devis?from=panier" style={{
                    display: 'inline-block', padding: '8px 16px',
                    border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--ink)',
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                    borderRadius: 'var(--r)', textDecoration: 'none',
                  }}>
                    Demander un devis
                  </Link>
                </div>
              )}

              <Link href="/panier" style={{
                marginTop: 4, textAlign: 'center',
                fontSize: 13, color: 'var(--ink-muted)', textDecoration: 'underline',
              }}>
                Retour au panier
              </Link>
            </form>
          ) : (
            <div>
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setClientSecret(null)}
                  style={{
                    fontSize: 13, color: 'var(--ink-muted)', background: 'transparent',
                    border: 'none', cursor: 'pointer', textDecoration: 'underline',
                  }}
                >
                  ← Modifier mon adresse
                </button>
              </div>
            </div>
          )}
        </div>

        <OrderSummary items={items} totalHT={totalHT} />
      </div>

      <style>{`
        @media (max-width: 760px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .checkout-city-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
