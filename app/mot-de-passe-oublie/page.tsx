'use client'

import { useState } from 'react'
import Link from 'next/link'

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

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/auth/password-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // Swallow errors — always show confirmation for security
    }
    setLoading(false)
    setSent(true)
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
        {sent ? (
          <>
            <div style={{
              width: 48,
              height: 48,
              background: 'var(--verde-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
              <svg width={22} height={22} viewBox="0 0 22 22" fill="none" stroke="var(--verde)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 12,
              color: 'var(--ink)',
            }}>
              Email envoyé
            </h1>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 28 }}>
              Si un compte existe pour <strong style={{ color: 'var(--ink)' }}>{email}</strong>, vous recevrez un lien de réinitialisation dans quelques minutes. Pensez à vérifier vos spams.
            </p>
            <Link href="/connexion" style={{
              display: 'block',
              textAlign: 'center',
              padding: '11px 16px',
              background: 'var(--ink)',
              color: 'var(--bg)',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 'var(--r)',
            }}>
              Retour à la connexion
            </Link>
          </>
        ) : (
          <>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 8,
              color: 'var(--ink)',
            }}>
              Mot de passe oublié
            </h1>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 28 }}>
              Entrez votre email et nous vous enverrons un lien de réinitialisation.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="vous@exemple.fr"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
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
                {loading ? 'Envoi…' : 'Envoyer le lien'}
              </button>
            </form>

            <p style={{ marginTop: 24, fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center' }}>
              <Link href="/connexion" style={{ color: 'var(--verde)', fontWeight: 500 }}>
                ← Retour à la connexion
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
