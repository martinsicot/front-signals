import type { CSSProperties, ReactNode } from 'react'

/** Shared input styling for all auth forms (mirrors the devis form inputs). */
export const authInputStyle: CSSProperties = {
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

/** Full-width primary submit button used across auth forms. */
export const authButtonStyle: CSSProperties = {
  width: '100%',
  padding: '13px 24px',
  background: 'var(--verde)',
  color: 'white',
  border: 'none',
  borderRadius: 'var(--r)',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 15,
  fontWeight: 600,
}

interface AuthFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
  required?: boolean
}

/** Labelled text input, consistent across every auth form. */
export function AuthField({ label, ...input }: AuthFieldProps) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
      <input {...input} style={authInputStyle} />
    </label>
  )
}

interface AuthCardProps {
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * Centered white card used as the shell for the public auth pages
 * (connexion, inscription, mot de passe oublié, réinitialisation).
 */
export default function AuthCard({ eyebrow, title, subtitle, children }: AuthCardProps) {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--nav-h))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          boxShadow: 'var(--shadow-md)',
          padding: '36px 32px',
        }}
      >
        <p className="label" style={{ marginBottom: 8 }}>{eyebrow}</p>
        <h1 style={{ fontSize: 26, letterSpacing: '-0.02em', marginBottom: subtitle ? 10 : 24 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 28 }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

/** Inline error/feedback message styling helpers. */
export const authErrorStyle: CSSProperties = {
  fontSize: 13,
  color: '#c0392b',
  marginTop: 4,
}
