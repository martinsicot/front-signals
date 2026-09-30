'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const ORDER_STATUS: Record<string, { label: string; color: string }> = {
  en_cours: { label: 'En cours', color: '#2563eb' },
  expediee: { label: 'Expédiée', color: '#ea580c' },
  livree: { label: 'Livrée', color: 'var(--verde)' },
  annulee: { label: 'Annulée', color: '#9ca3af' },
}

interface Order {
  id: string
  created_at: string
  status: string
  total_ttc: string
  items_count: number
}

interface PagedOrders {
  count: number
  next: string | null
  previous: string | null
  results: Order[]
}

function StatusBadge({ status }: { status: string }) {
  const s = ORDER_STATUS[status] ?? { label: status, color: '#9ca3af' }
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      fontSize: 12,
      fontWeight: 600,
      borderRadius: 20,
      background: `${s.color}22`,
      color: s.color,
    }}>{s.label}</span>
  )
}

export default function CommandesPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<PagedOrders | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/connexion' })
      return
    }
    if (!session?.accessToken) return

    setLoading(true)
    fetch(`/api/account/orders/?page=${page}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
      .then(r => r.json())
      .then((d: PagedOrders) => setData(d))
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [session, status, page])

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div>
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--ink)',
        marginBottom: 24,
      }}>
        Mes commandes
      </h1>

      {loading ? (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Chargement…</p>
      ) : !data || data.results.length === 0 ? (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 16 }}>
            Vous n&apos;avez pas encore de commande.
          </p>
          <Link href="/catalogue" style={{
            display: 'inline-block',
            padding: '9px 20px',
            background: 'var(--ink)',
            color: 'var(--bg)',
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 'var(--r)',
          }}>
            Parcourir le catalogue
          </Link>
        </div>
      ) : (
        <>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 100px 120px',
              padding: '10px 20px',
              background: 'var(--surface-alt)',
              borderBottom: '1px solid var(--border)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }} className="orders-header">
              <span>Référence</span>
              <span>Articles</span>
              <span>Total TTC</span>
              <span>Statut</span>
            </div>

            {data.results.map((order, i) => (
              <Link
                key={order.id}
                href={`/mon-compte/commandes/${order.id}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 100px 120px',
                  padding: '14px 20px',
                  borderBottom: i < data.results.length - 1 ? '1px solid var(--border)' : 'none',
                  color: 'var(--ink)',
                  transition: 'background .15s',
                }}
                className="orders-row"
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-alt)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{order.id}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{formatDate(order.created_at)}</div>
                </div>
                <span style={{ fontSize: 14, alignSelf: 'center' }}>{order.items_count} article{order.items_count > 1 ? 's' : ''}</span>
                <span style={{ fontSize: 14, fontWeight: 600, alignSelf: 'center' }}>{parseFloat(order.total_ttc).toFixed(2)} €</span>
                <span style={{ alignSelf: 'center' }}><StatusBadge status={order.status} /></span>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {(data.previous || data.next) && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={!data.previous}
                style={{
                  padding: '8px 18px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r)',
                  background: 'transparent',
                  color: data.previous ? 'var(--ink)' : 'var(--ink-muted)',
                  fontSize: 14,
                  cursor: data.previous ? 'pointer' : 'not-allowed',
                }}
              >
                ← Précédent
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!data.next}
                style={{
                  padding: '8px 18px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r)',
                  background: 'transparent',
                  color: data.next ? 'var(--ink)' : 'var(--ink-muted)',
                  fontSize: 14,
                  cursor: data.next ? 'pointer' : 'not-allowed',
                }}
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}

      <style>{`
        @media (max-width: 600px) {
          .orders-header { grid-template-columns: 1fr auto !important; }
          .orders-header span:nth-child(2),
          .orders-header span:nth-child(3) { display: none; }
          .orders-row { grid-template-columns: 1fr auto !important; }
          .orders-row span:nth-child(2),
          .orders-row span:nth-child(3) { display: none; }
        }
      `}</style>
    </div>
  )
}
