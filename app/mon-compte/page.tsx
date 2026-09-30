'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ORDER_STATUS: Record<string, { label: string; color: string }> = {
  en_cours: { label: 'En cours', color: '#2563eb' },
  expediee: { label: 'Expédiée', color: '#ea580c' },
  livree: { label: 'Livrée', color: 'var(--verde)' },
  annulee: { label: 'Annulée', color: '#9ca3af' },
}

const QUOTE_STATUS: Record<string, { label: string; color: string }> = {
  en_attente: { label: 'En attente', color: '#9ca3af' },
  repondu: { label: 'Répondu', color: '#2563eb' },
  accepte: { label: 'Accepté', color: 'var(--verde)' },
  refuse: { label: 'Refusé', color: '#9ca3af' },
}

const inputStyle: React.CSSProperties = {
  padding: '9px 12px',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 14,
  color: 'var(--ink)',
  background: 'var(--bg)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

interface Address {
  line1: string
  line2: string
  zip_code: string
  city: string
  country: string
}

interface Profile {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  default_shipping_address: Address | null
}

interface Order {
  id: string
  created_at: string
  status: string
  total_ttc: string
  items_count: number
}

interface Quote {
  id: string
  created_at: string
  status: string
  items_count: number
}

function StatusBadge({ status, map }: { status: string; map: Record<string, { label: string; color: string }> }) {
  const s = map[status] ?? { label: status, color: '#9ca3af' }
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

export default function MonComptePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState({ first_name: '', last_name: '', phone: '', line1: '', line2: '', zip_code: '', city: '' })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/connexion' })
      return
    }
    if (!session?.accessToken) return

    const headers = { Authorization: `Bearer ${session.accessToken}` }

    fetch('/api/account/me/', { headers })
      .then(r => r.json())
      .then((p: Profile) => {
        setProfile(p)
        setEditForm({
          first_name: p.first_name,
          last_name: p.last_name,
          phone: p.phone ?? '',
          line1: p.default_shipping_address?.line1 ?? '',
          line2: p.default_shipping_address?.line2 ?? '',
          zip_code: p.default_shipping_address?.zip_code ?? '',
          city: p.default_shipping_address?.city ?? '',
        })
      })
      .catch(() => null)

    fetch('/api/account/orders/?page=1', { headers })
      .then(r => r.json())
      .then((d: { results: Order[] }) => setOrders((d.results ?? []).slice(0, 3)))
      .catch(() => null)

    fetch('/api/account/quotes/', { headers })
      .then(r => r.json())
      .then((d: { results: Quote[] }) =>
        setQuotes((d.results ?? []).filter(q => q.status === 'en_attente' || q.status === 'repondu').slice(0, 3))
      )
      .catch(() => null)
  }, [session, status])

  async function saveProfile() {
    if (!session?.accessToken) return
    setSaving(true)
    await fetch('/api/account/me/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        phone: editForm.phone,
        default_shipping_address: {
          line1: editForm.line1,
          line2: editForm.line2,
          zip_code: editForm.zip_code,
          city: editForm.city,
          country: 'FR',
        },
      }),
    })
      .then(r => r.json())
      .then((p: Profile) => {
        setProfile(p)
        setEditMode(false)
        setToast(true)
        setTimeout(() => setToast(false), 3000)
      })
      .catch(() => null)
    setSaving(false)
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  if (status === 'loading') {
    return <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Chargement…</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--ink)',
          marginBottom: 4,
        }}>
          Bonjour{profile ? `, ${profile.first_name}` : ''} 👋
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Bienvenue dans votre espace personnel.</p>
      </div>

      {/* Last orders */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Mes dernières commandes</h2>
          <Link href="/mon-compte/commandes" style={{ fontSize: 13, color: 'var(--verde)' }}>Voir tout →</Link>
        </div>
        {orders.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
            Vous n&apos;avez pas encore de commande.{' '}
            <Link href="/catalogue" style={{ color: 'var(--verde)' }}>Parcourir le catalogue</Link>
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {orders.map(o => (
              <Link key={o.id} href={`/mon-compte/commandes/${o.id}`} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--ink)',
              }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{o.id}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-muted)', marginLeft: 10 }}>{formatDate(o.created_at)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{parseFloat(o.total_ttc).toFixed(2)} €</span>
                  <StatusBadge status={o.status} map={ORDER_STATUS} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Active quotes */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Mes devis en cours</h2>
          <Link href="/mon-compte/devis" style={{ fontSize: 13, color: 'var(--verde)' }}>Voir tout →</Link>
        </div>
        {quotes.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
            Aucun devis en cours.{' '}
            <Link href="/devis" style={{ color: 'var(--verde)' }}>Faire une demande</Link>
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quotes.map(q => (
              <Link key={q.id} href={`/mon-compte/devis/${q.id}`} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--ink)',
              }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{q.id}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-muted)', marginLeft: 10 }}>{formatDate(q.created_at)}</span>
                </div>
                <StatusBadge status={q.status} map={QUOTE_STATUS} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Profile */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Mon profil</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              style={{
                fontSize: 13,
                color: 'var(--verde)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Modifier
            </button>
          )}
        </div>

        {!editMode ? (
          profile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Nom', `${profile.first_name} ${profile.last_name}`],
                ['Email', profile.email],
                ['Téléphone', profile.phone || '—'],
                ['Adresse par défaut', profile.default_shipping_address
                  ? `${profile.default_shipping_address.line1}, ${profile.default_shipping_address.zip_code} ${profile.default_shipping_address.city}`
                  : '—'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: 12, fontSize: 14 }}>
                  <span style={{ color: 'var(--ink-muted)', minWidth: 140 }}>{label}</span>
                  <span style={{ color: 'var(--ink)' }}>{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Chargement…</p>
          )
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Prénom</label>
                <input value={editForm.first_name} onChange={e => setEditForm(f => ({ ...f, first_name: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Nom</label>
                <input value={editForm.last_name} onChange={e => setEditForm(f => ({ ...f, last_name: e.target.value }))} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Téléphone</label>
              <input value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} placeholder="06 12 34 56 78" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Adresse ligne 1</label>
              <input value={editForm.line1} onChange={e => setEditForm(f => ({ ...f, line1: e.target.value }))} style={inputStyle} placeholder="12 rue des Acacias" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Adresse ligne 2 (optionnel)</label>
              <input value={editForm.line2} onChange={e => setEditForm(f => ({ ...f, line2: e.target.value }))} style={inputStyle} placeholder="Bâtiment B" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Code postal</label>
                <input value={editForm.zip_code} onChange={e => setEditForm(f => ({ ...f, zip_code: e.target.value }))} style={inputStyle} placeholder="75001" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Ville</label>
                <input value={editForm.city} onChange={e => setEditForm(f => ({ ...f, city: e.target.value }))} style={inputStyle} placeholder="Paris" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button
                onClick={saveProfile}
                disabled={saving}
                style={{
                  padding: '9px 20px',
                  background: 'var(--ink)',
                  color: 'var(--bg)',
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 'var(--r)',
                  border: 'none',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button
                onClick={() => setEditMode(false)}
                style={{
                  padding: '9px 20px',
                  background: 'transparent',
                  color: 'var(--ink-muted)',
                  fontSize: 13,
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r)',
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'var(--ink)',
          color: 'var(--bg)',
          fontSize: 13,
          fontWeight: 500,
          padding: '12px 20px',
          borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,.2)',
          zIndex: 999,
        }}>
          ✓ Profil mis à jour
        </div>
      )}
    </div>
  )
}
