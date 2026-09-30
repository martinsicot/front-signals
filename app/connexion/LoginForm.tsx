'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import AuthCard, { AuthField, authButtonStyle, authErrorStyle } from '@/components/auth/AuthCard'

/** Only allow internal redirect targets to avoid open-redirect abuse. */
function safeRedirect(target: string | null): string {
  if (target && target.startsWith('/') && !target.startsWith('//')) return target
  return '/mon-compte'
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await login(form.email, form.password)

    if (!result.ok) {
      setError(result.error ?? 'Une erreur est survenue.')
      setLoading(false)
      return
    }

    const destination = safeRedirect(searchParams.get('redirect'))
    router.push(destination)
    router.refresh()
  }

  return (
    <AuthCard eyebrow="Espace client" title="Se connecter">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
        <div>
          <AuthField
            label="Mot de passe"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <div style={{ textAlign: 'right', marginTop: 6 }}>
            <Link
              href="/mot-de-passe-oublie"
              style={{ fontSize: 13, color: 'var(--verde)', fontWeight: 500 }}
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        {error && <p style={authErrorStyle} role="alert">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ ...authButtonStyle, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <p style={{ fontSize: 14, color: 'var(--ink-muted)', textAlign: 'center', marginTop: 24 }}>
        Pas encore de compte ?{' '}
        <Link href="/inscription" style={{ color: 'var(--verde)', fontWeight: 500 }}>
          Créer un compte
        </Link>
      </p>
    </AuthCard>
  )
}
