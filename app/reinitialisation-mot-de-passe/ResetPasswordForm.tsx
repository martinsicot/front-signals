'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthCard, { AuthField, authButtonStyle, authErrorStyle } from '@/components/auth/AuthCard'

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

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const uid = searchParams.get('uid')
  const token = searchParams.get('token')

  const [form, setForm] = useState({ password: '', confirm: '' })
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
      const res = await fetch('/api/auth/password-reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, password: form.password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(
          extractError(data) ??
            'Le lien est invalide ou a expiré. Demandez un nouveau lien.'
        )
        setLoading(false)
        return
      }

      router.push('/connexion')
    } catch {
      setError('Une erreur est survenue. Réessayez plus tard.')
      setLoading(false)
    }
  }

  if (!uid || !token) {
    return (
      <AuthCard
        eyebrow="Espace client"
        title="Lien invalide"
        subtitle="Ce lien de réinitialisation est incomplet ou a expiré. Demandez-en un nouveau."
      >
        <Link
          href="/mot-de-passe-oublie"
          style={{ ...authButtonStyle, display: 'block', textAlign: 'center' }}
        >
          Demander un nouveau lien
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="Espace client"
      title="Nouveau mot de passe"
      subtitle="Choisissez un nouveau mot de passe pour votre compte."
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AuthField
          label="Nouveau mot de passe"
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
          {loading ? 'Enregistrement…' : 'Réinitialiser le mot de passe'}
        </button>
      </form>
    </AuthCard>
  )
}
