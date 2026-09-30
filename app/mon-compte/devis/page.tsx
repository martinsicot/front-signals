'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const QUOTE_STATUS: Record<string, { label: string; color: string }> = {
  en_attente: { label: 'En attente', color: '#9ca3af' },
  repondu: { label: 'Répondu', color: '#2563eb' },
  accepte: { label: 'Accepté', color: 'var(--verde)' },
  refuse: { label: 'Refusé', color: '#9ca3af' },
}

interface Quote {
  id: string
  created_at: string
  status: string
  items_count: number
}

interface PagedQuotes {
  count: number
  next: string | null
  previous: string | null
  results: Quote[]
}

function StatusBadge({ status }: { status: string }) {
  const s = QUOTE_STATUS[status] ?? { label: status, color: '#9ca3af' }
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

export default function DevisListPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<PagedQuotes | null>(null)
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
    fetch(`/api/account/quotes/?page=${page}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
      .then(r => r.json())
      .then((d: PagedQuotes) => setData(d))
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
        Mes demandes de devis
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
            Vous n&apos;avez pas encore de demande de devis.
          </p>
          <Link href="/devis" style={{
            display: 'inline-block',
            padding: '9px 20px',
            background: 'var(--ink)',
            color: 'var(--bg)',
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 'var(--r)',
          }}>
            Faire une demande de devis
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px',
              padding: '10px 20px',
              background: 'var(--surface-alt)',
              borderBottom: '1px solid var(--border)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              <span>Référence</span>
              <span>Articles</span>
              <span>Statut</span>
            </div>

            {data.results.map((quote, i) => (
              <Link
                key={quote.id}
                href={`/mon-compte/devis/${quote.id}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 120px',
                  padding: '14px 20px',
                  borderBottom: i < data.results.length - 1 ? '1px solid var(--border)' : 'none',
                  color: 'var(--ink)',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-alt)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{quote.id}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{formatDate(quote.created_at)}</div>
                </div>
                <span style={{ fontSize: 14, alignSelf: 'center' }}>{quote.items_count} article{quote.items_count > 1 ? 's' : ''}</span>
                <span style={{ alignSelf: 'center' }}><StatusBadge status={quote.status} /></span>
              </Link>
            ))}
          </div>

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
    </div>
  )
}
