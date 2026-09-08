import type { ReactNode } from 'react'

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>
      <p className="label" style={{ marginBottom: 8 }}>Informations légales</p>
      <h1 style={{ fontSize: 30, letterSpacing: '-0.02em', marginBottom: 40 }}>{title}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {children}
      </div>
    </div>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 17, fontWeight: 600, marginBottom: 12,
        paddingBottom: 8, borderBottom: '1px solid var(--border)',
      }}>
        {title}
      </h2>
      <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--ink-muted)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </section>
  )
}

export function Placeholder({ label }: { label: string }) {
  return (
    <mark style={{
      background: '#fff3cd', color: '#856404',
      padding: '1px 6px', borderRadius: 4,
      fontFamily: 'monospace', fontSize: 13,
    }}>
      [{label}]
    </mark>
  )
}
