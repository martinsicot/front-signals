'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { label: 'Mon compte', href: '/mon-compte' },
  { label: 'Mes commandes', href: '/mon-compte/commandes' },
  { label: 'Mes devis', href: '/mon-compte/devis' },
]

export default function MonCompteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '40px 24px 80px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: 40,
        alignItems: 'start',
      }} className="account-grid">

        {/* Sidebar */}
        <aside style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '8px 0',
          position: 'sticky',
          top: 'calc(var(--nav-h) + 24px)',
        }}>
          <nav>
            {navItems.map(item => {
              const active = item.href === '/mon-compte'
                ? pathname === '/mon-compte'
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '10px 18px',
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? 'var(--ink)' : 'var(--ink-muted)',
                    background: active ? 'var(--surface-alt)' : 'transparent',
                    borderLeft: active ? '2px solid var(--verde)' : '2px solid transparent',
                    transition: 'all .15s',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}

            <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

            <button
              onClick={() => logout('/')}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 18px',
                fontSize: 14,
                color: 'var(--ink-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-muted)')}
            >
              Se déconnecter
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main>{children}</main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .account-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  )
}
