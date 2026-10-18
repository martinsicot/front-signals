'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const NAV = [
  { label: 'Mon compte', href: '/v3/mon-compte' },
  { label: 'Mes commandes', href: '/v3/mon-compte/commandes' },
  { label: 'Mes devis', href: '/v3/mon-compte/devis' },
]

export default function MonCompteV3Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px', boxSizing: 'border-box' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '240px 1fr',
        gap: 48, alignItems: 'start',
      }} className="v3-account-grid">

        {/* Sidebar */}
        <aside style={{
          borderTop: '2px solid #111315',
          position: 'sticky',
          top: 80,
        }}>
          <nav>
            {NAV.map(item => {
              const active = item.href === '/v3/mon-compte'
                ? pathname === '/v3/mon-compte'
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '14px 16px',
                    fontWeight: active ? 800 : 500,
                    fontSize: 15,
                    color: '#111315',
                    background: active ? '#F3F3F1' : 'transparent',
                    borderBottom: '1px solid #D6D7D9',
                    borderLeft: active ? '3px solid #FFD400' : '3px solid transparent',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}

            <div style={{ height: 1, background: '#D6D7D9', margin: '8px 0' }} />

            <button
              onClick={() => logout('/v3')}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '14px 16px',
                fontFamily: 'var(--font-overpass-mono), monospace',
                fontSize: 13, color: '#565B61',
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}
            >
              SE DÉCONNECTER
            </button>
          </nav>
        </aside>

        <main style={{ minWidth: 0 }}>{children}</main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .v3-account-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  )
}
