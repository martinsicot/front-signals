'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import AuthCard, { AuthField, authButtonStyle, authErrorStyle } from '@/components/auth/AuthCard'

/** Pull a human-readable message out of a DRF-style error body. */
function extractError(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null
  const obj = data as Record<string, unknown>
  if (typeof obj.error === 'string') return obj.error
  for (const value of Object.values(obj)) {
    if (typeof value === 'string') return value
    if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
  }
  return null
}

export default function RegisterForm() {
  const router = useRouter()
  const { login } = useAuth()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (form.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(extractError(data) ?? 'Impossible de créer le compte. Réessayez.')
        setLoading(false)
        return
      }

      // Auto-login with the freshly created credentials.
      const result = await login(form.email, form.password)
      if (!result.ok) {
        // Account exists but sign-in failed — send them to the login page.
        router.push('/connexion')
        return
      }

      router.push('/mon-compte')
      router.refresh()
    } catch {
      setError('Une erreur est survenue. Réessayez plus tard.')
      setLoading(false)
    }
  }

  return (
    <AuthCard eyebrow="Espace client" title="Créer un compte">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="auth-grid">
          <AuthField
            label="Prénom"
            name="firstName"
            autoComplete="given-name"
            required
            value={form.firstName}
            onChange={handleChange}
            placeholder="Jean"
          />
          <AuthField
            label="Nom"
            name="lastName"
            autoComplete="family-name"
            required
            value={form.lastName}
            onChange={handleChange}
            placeholder="Dupont"
          />
        </div>
        <AuthField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jean@mairie.fr"
        />
        <AuthField
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={form.password}
          onChange={handleChange}
          placeholder="8 caractères minimum"
        />
        <AuthField
          label="Confirmer le mot de passe"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          value={form.confirm}
          onChange={handleChange}
          placeholder="••••••••"
        />

        {error && <p style={authErrorStyle} role="alert">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ ...authButtonStyle, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Création…' : 'Créer mon compte'}
        </button>
      </form>

      <p style={{ fontSize: 14, color: 'var(--ink-muted)', textAlign: 'center', marginTop: 24 }}>
        Déjà un compte ?{' '}
        <Link href="/connexion" style={{ color: 'var(--verde)', fontWeight: 500 }}>
          Se connecter
        </Link>
      </p>

      <style>{`
        @media (max-width: 400px) {
          .auth-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AuthCard>
  )
}
