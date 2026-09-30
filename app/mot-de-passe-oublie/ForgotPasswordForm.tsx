'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthCard, { AuthField, authButtonStyle, authErrorStyle } from '@/components/auth/AuthCard'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/auth/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      // The backend intentionally returns success even for unknown emails
      // to avoid account enumeration.
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <AuthCard
        eyebrow="Espace client"
        title="Vérifiez vos emails"
        subtitle="Si un compte est associé à cette adresse, vous recevrez un lien pour réinitialiser votre mot de passe dans quelques minutes."
      >
        <Link
          href="/connexion"
          style={{ ...authButtonStyle, display: 'block', textAlign: 'center' }}
        >
          Retour à la connexion
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="Espace client"
      title="Mot de passe oublié"
      subtitle="Saisissez votre adresse email : nous vous enverrons un lien de réinitialisation."
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AuthField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="jean@mairie.fr"
        />

        {status === 'error' && (
          <p style={authErrorStyle} role="alert">
            Une erreur est survenue. Réessayez plus tard.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            ...authButtonStyle,
            cursor: status === 'loading' ? 'default' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1,
          }}
        >
          {status === 'loading' ? 'Envoi…' : 'Envoyer le lien'}
        </button>
      </form>

      <p style={{ fontSize: 14, color: 'var(--ink-muted)', textAlign: 'center', marginTop: 24 }}>
        <Link href="/connexion" style={{ color: 'var(--verde)', fontWeight: 500 }}>
          Retour à la connexion
        </Link>
      </p>
    </AuthCard>
  )
}
