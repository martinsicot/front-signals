'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

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

const BASE = '/api'

export default function InscriptionPage() {
  const { login } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function validate(): string | null {
    if (!form.email.includes('@')) return 'Adresse email invalide.'
    if (form.password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.'
    if (form.password !== form.password_confirm) return 'Les mots de passe ne correspondent pas.'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setLoading(true)
    try {
      const res = await fetch(`${BASE}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
          password_confirm: form.password_confirm,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as Record<string, unknown>
        const msg = (data.detail as string) || (data.email as string[])?.join(' ') || 'Une erreur est survenue.'
        setError(msg)
        setLoading(false)
        return
      }

      // Auto-login after registration
      const result = await login(form.email, form.password)
      if (!result.ok) {
        router.push('/connexion')
        return
      }
      router.push('/mon-compte')
    } catch {
      setError('Une erreur réseau est survenue.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '40px 36px',
      }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 8,
          color: 'var(--ink)',
        }}>
          Créer un compte
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 28 }}>
          Accédez à votre historique de commandes et devis.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Prénom</label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                autoComplete="given-name"
                placeholder="Martin"
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Nom</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                autoComplete="family-name"
                placeholder="Dupont"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="vous@exemple.fr"
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Mot de passe</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Confirmer le mot de passe</label>
            <input
              name="password_confirm"
              type="password"
              value={form.password_confirm}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{
              fontSize: 13,
              color: '#dc2626',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 6,
              padding: '8px 12px',
              margin: 0,
            }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              padding: '11px 16px',
              background: 'var(--ink)',
              color: 'var(--bg)',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 'var(--r)',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity .15s',
            }}
          >
            {loading ? 'Création…' : 'Créer mon compte'}
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center' }}>
          Déjà un compte ?{' '}
          <Link href="/connexion" style={{ color: 'var(--verde)', fontWeight: 500 }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
