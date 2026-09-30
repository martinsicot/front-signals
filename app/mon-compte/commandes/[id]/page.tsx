'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const ORDER_STATUS: Record<string, { label: string; color: string }> = {
  en_cours: { label: 'En cours', color: '#2563eb' },
  expediee: { label: 'Expédiée', color: '#ea580c' },
  livree: { label: 'Livrée', color: 'var(--verde)' },
  annulee: { label: 'Annulée', color: '#9ca3af' },
}

interface OrderItem {
  product_id: string
  name: string
  quantity: number
  unit_price_ttc: string
  image_url?: string
}

interface OrderDetail {
  id: string
  created_at: string
  status: string
  total_ht: string
  total_ttc: string
  shipping_address: { line1: string; line2?: string; zip_code: string; city: string; country?: string }
  tracking_url?: string
  items: OrderItem[]
}

const TVA_RATE = 0.2

export default function CommandeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: session, status } = useSession()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/connexion' })
      return
    }
    if (!session?.accessToken) return

    fetch(`/api/account/orders/${id}/`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((d: OrderDetail | null) => { if (d) setOrder(d) })
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [session, status, id])

  if (loading) return <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Chargement…</p>
  if (notFound) return (
    <div>
      <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 16 }}>Commande introuvable.</p>
      <Link href="/mon-compte/commandes" style={{ color: 'var(--verde)', fontSize: 14 }}>← Retour aux commandes</Link>
    </div>
  )
  if (!order) return null

  const statusInfo = ORDER_STATUS[order.status] ?? { label: order.status, color: '#9ca3af' }
  const totalHT = parseFloat(order.total_ht)
  const totalTTC = parseFloat(order.total_ttc)
  const tva = totalTTC - totalHT

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link href="/mon-compte" style={{ color: 'var(--ink-muted)' }}>Mon compte</Link>
        <span>›</span>
        <Link href="/mon-compte/commandes" style={{ color: 'var(--ink-muted)' }}>Commandes</Link>
        <span>›</span>
        <span style={{ color: 'var(--ink)' }}>{order.id}</span>
      </nav>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            marginBottom: 4,
          }}>
            Commande {order.id}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
            {new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            padding: '4px 12px',
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 20,
            background: `${statusInfo.color}22`,
            color: statusInfo.color,
          }}>{statusInfo.label}</span>
          {order.tracking_url && (
            <a
              href={order.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                background: 'var(--verde)',
                color: 'white',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 'var(--r)',
              }}
            >
              Suivre ma commande →
            </a>
          )}
        </div>
      </div>

      {/* Items */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px 120px 120px',
          padding: '10px 20px',
          background: 'var(--surface-alt)',
          borderBottom: '1px solid var(--border)',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--ink-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          <span>Produit</span>
          <span>Qté</span>
          <span>Prix u. TTC</span>
          <span style={{ textAlign: 'right' }}>Sous-total</span>
        </div>
        {order.items.map((item, i) => (
          <div key={item.product_id + i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 80px 120px 120px',
            padding: '14px 20px',
            borderBottom: i < order.items.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{item.name}</span>
            <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{item.quantity}</span>
            <span style={{ fontSize: 14, color: 'var(--ink)' }}>{parseFloat(item.unit_price_ttc).toFixed(2)} €</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', textAlign: 'right' }}>
              {(parseFloat(item.unit_price_ttc) * item.quantity).toFixed(2)} €
            </span>
          </div>
        ))}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="order-bottom">
        {/* Shipping address */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Adresse de livraison
          </h2>
          <address style={{ fontStyle: 'normal', fontSize: 14, color: 'var(--ink)', lineHeight: 1.7 }}>
            {order.shipping_address.line1}<br />
            {order.shipping_address.line2 && <>{order.shipping_address.line2}<br /></>}
            {order.shipping_address.zip_code} {order.shipping_address.city}
          </address>
        </section>

        {/* Totals */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Récapitulatif
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Sous-total HT', `${totalHT.toFixed(2)} €`],
              [`TVA (${Math.round(TVA_RATE * 100)} %)`, `${tva.toFixed(2)} €`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--ink-muted)' }}>
                <span>{label}</span><span>{value}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
              <span>Total TTC</span><span>{totalTTC.toFixed(2)} €</span>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .order-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
