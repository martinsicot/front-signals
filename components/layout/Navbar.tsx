'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'

export default function Navbar() {
  const { toggle, theme } = useTheme()
  const [cartCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale"
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        height: 'var(--nav-h)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', display: 'flex', alignItems: 'center',
      }}>
        {/* Logo */}
        <Link href="/" aria-label="Strada — accueil" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 20, letterSpacing: '-0.03em', color: 'var(--ink)',
          marginRight: 40, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            width: 26, height: 26, background: 'var(--verde)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 4,
          }}>
            <svg viewBox="0 0 14 14" width={14} height={14} fill="white" aria-hidden="true">
              <polygon points="5,0 9,0 14,5 14,9 9,14 5,14 0,9 0,5" />
            </svg>
          </span>
          Strada
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: 4,
          flex: 1, listStyle: 'none',
        }} className="nav-links-desktop">
          {[
            ['Signalisation', '/catalogue/signalisation'],
            ['Mobilier urbain', '/catalogue/mobilier-urbain'],
            ['Sécurité & balisage', '/catalogue/securite-balisage'],
            ['Nouveautés', '/catalogue?sort=new'],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} style={{
                padding: '6px 10px', fontSize: 14, fontWeight: 500,
                color: 'var(--ink-muted)', borderRadius: 4,
                transition: 'color .15s, background .15s',
                display: 'block',
              }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = 'var(--ink)'
                  ;(e.target as HTMLElement).style.background = 'var(--surface-alt)'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = 'var(--ink-muted)'
                  ;(e.target as HTMLElement).style.background = 'transparent'
                }}
              >{label}</Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          {/* Search */}
          <button aria-label="Rechercher" style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--r)', color: 'var(--ink-muted)', background: 'transparent',
          }}>
            <svg width={17} height={17} viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx={7} cy={7} r={5.5} />
              <path d="m11 11 3.5 3.5" />
            </svg>
          </button>

          {/* Cart */}
          <button aria-label="Panier" style={{
            position: 'relative', display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 'var(--r)',
            fontSize: 13, fontWeight: 500, color: 'var(--ink)',
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1h2.5l1.7 8h7.3l1.5-5H4.5" />
              <circle cx={7} cy={14} r={1} />
              <circle cx={12} cy={14} r={1} />
            </svg>
            Panier
            <span style={{
              background: 'var(--verde)', color: 'white', fontSize: 10, fontWeight: 700,
              minWidth: 18, height: 18, borderRadius: 9,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
            }}>{cartCount}</span>
          </button>

          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Basculer le thème" style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--r)', color: 'var(--ink-muted)',
            border: '1px solid var(--border)', background: 'transparent',
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <circle cx={8} cy={8} r={3} />
              <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.1 3.1l1 1M11.9 11.9l1 1M11.9 3.1l-1 1M3.1 11.9l1-1" />
            </svg>
          </button>

          {/* Devis CTA */}
          <Link href="#cta-devis" style={{
            padding: '8px 16px', background: 'var(--ink)', color: 'var(--bg)',
            fontSize: 13, fontWeight: 600, borderRadius: 'var(--r)',
            transition: 'opacity .15s',
          }}>
            Demander un devis
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(o => !o)}
            className="nav-mobile-toggle"
            style={{
              display: 'none', width: 36, height: 36,
              alignItems: 'center', justifyContent: 'center',
              borderRadius: 'var(--r)', color: 'var(--ink)', marginLeft: 8,
            }}
          >
            <svg width={18} height={18} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 5h14M2 9h14M2 13h14" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
