'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const QUOTE_STATUS: Record<string, { label: string; color: string }> = {
  en_attente: { label: 'En attente', color: '#9ca3af' },
  repondu: { label: 'Répondu', color: '#2563eb' },
  accepte: { label: 'Accepté', color: 'var(--verde)' },
  refuse: { label: 'Refusé', color: '#9ca3af' },
}

interface QuoteItem {
  name: string
  quantity: number
}

interface QuoteDetail {
  id: string
  created_at: string
  status: string
  items: QuoteItem[]
  message?: string
  // Response fields
  total_ht?: string
  total_ttc?: string
  valid_until?: string
  notes?: string
  pdf_url?: string
}

export default function DevisDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: session, status } = useSession()
  const [quote, setQuote] = useState<QuoteDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/connexion' })
      return
    }
    if (!session?.accessToken) return

    fetch(`/api/account/quotes/${id}/`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((d: QuoteDetail | null) => { if (d) setQuote(d) })
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [session, status, id])

  if (loading) return <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Chargement…</p>
  if (notFound) return (
    <div>
      <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 16 }}>Devis introuvable.</p>
      <Link href="/mon-compte/devis" style={{ color: 'var(--verde)', fontSize: 14 }}>← Retour aux devis</Link>
    </div>
  )
  if (!quote) return null

  const statusInfo = QUOTE_STATUS[quote.status] ?? { label: quote.status, color: '#9ca3af' }
  const hasResponse = quote.status !== 'en_attente'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link href="/mon-compte" style={{ color: 'var(--ink-muted)' }}>Mon compte</Link>
        <span>›</span>
        <Link href="/mon-compte/devis" style={{ color: 'var(--ink-muted)' }}>Devis</Link>
        <span>›</span>
        <span style={{ color: 'var(--ink)' }}>{quote.id}</span>
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
            Devis {quote.id}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
            Demande du {new Date(quote.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <span style={{
          padding: '4px 12px',
          fontSize: 13,
          fontWeight: 600,
          borderRadius: 20,
          background: `${statusInfo.color}22`,
          color: statusInfo.color,
        }}>{statusInfo.label}</span>
      </div>

      {/* Items requested */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
          Produits demandés
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {quote.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              fontSize: 14,
            }}>
              <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{item.name}</span>
              <span style={{ color: 'var(--ink-muted)' }}>× {item.quantity}</span>
            </div>
          ))}
        </div>

        {quote.message && (
          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Message joint
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.6, background: 'var(--surface-alt)', padding: '12px 14px', borderRadius: 8 }}>
              {quote.message}
            </p>
          </div>
        )}
      </section>

      {/* Response block — shown only when answered */}
      {hasResponse && (
        <section style={{
          background: 'var(--verde-light)',
          border: '1px solid var(--verde-mid)',
          borderRadius: 10,
          padding: '24px',
        }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
            Réponse de notre équipe
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quote.total_ht && (
              <>
                {[
                  ['Total HT', `${parseFloat(quote.total_ht).toFixed(2)} €`],
                  ...(quote.total_ttc ? [['Total TTC', `${parseFloat(quote.total_ttc).toFixed(2)} €`]] as [string, string][] : []),
                  ...(quote.valid_until ? [['Valable jusqu&apos;au', new Date(quote.valid_until).toLocaleDateString('fr-FR')]] as [string, string][] : []),
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: 'var(--ink-muted)' }} dangerouslySetInnerHTML={{ __html: label }} />
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{value}</span>
                  </div>
                ))}
              </>
            )}

            {quote.notes && (
              <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.6, marginTop: 6 }}>{quote.notes}</p>
            )}

            {quote.pdf_url && (
              <a
                href={quote.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 8,
                  padding: '10px 18px',
                  background: 'var(--verde)',
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 'var(--r)',
                  alignSelf: 'flex-start',
                }}
              >
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 1v8M4 6l3 3 3-3M1 11h12" />
                </svg>
                Télécharger le devis PDF
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
