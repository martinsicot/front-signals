'use client'

import Link from 'next/link'

const catalogLinks = [
  ['Panneaux de signalisation', '/catalogue/signalisation'],
  ['Mobilier urbain', '/catalogue/mobilier-urbain'],
  ['Sécurité & balisage', '/catalogue/securite-balisage'],
  ['Nouveautés', '/catalogue?sort=new'],
  ['Promotions', '/catalogue?sort=promo'],
]

const infoLinks = [
  ['Qui sommes-nous', '/a-propos'],
  ['Conformité & normes', '/conformite'],
  ['Livraison & délais', '/livraison'],
  ['Devis collectivités', '/devis'],
  ['FAQ', '/faq'],
]

const accountLinks = [
  ['Mon compte', '/mon-compte'],
  ['Mes commandes', '/mon-compte/commandes'],
  ['Mes devis', '/mon-compte/devis'],
  ['CGV', '/cgv'],
  ['Mentions légales', '/mentions-legales'],
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '48px 0 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 40,
          marginBottom: 40,
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18, letterSpacing: '-0.02em',
              marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 22, height: 22, background: 'var(--verde)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 4, flexShrink: 0,
              }}>
                <svg viewBox="0 0 14 14" width={11} height={11} fill="white">
                  <polygon points="5,0 9,0 14,5 14,9 9,14 5,14 0,9 0,5" />
                </svg>
              </span>
              Strada
            </h3>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: 16 }}>
              Signalétique et mobilier urbain conformes, livrés directement du fabricant européen. Pour les collectivités, les professionnels du BTP et les gestionnaires de sites privés.
            </p>
            <div style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span><strong style={{ color: 'var(--ink)' }}>Email :</strong> contact@strada-signal.fr</span>
              <span><strong style={{ color: 'var(--ink)' }}>Tél. :</strong> +33 (0)X XX XX XX XX</span>
              <span><strong style={{ color: 'var(--ink)' }}>SIRET :</strong> [XXX XXX XXX XXXXX]</span>
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 14,
            }}>Catalogue</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {catalogLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: 13, color: 'var(--ink-muted)', transition: 'color .15s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--verde)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--ink-muted)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 14,
            }}>Informations</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {infoLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: 13, color: 'var(--ink-muted)', transition: 'color .15s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--verde)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--ink-muted)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h4 style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 14,
            }}>Compte</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {accountLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: 13, color: 'var(--ink-muted)', transition: 'color .15s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--verde)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--ink-muted)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 12, color: 'var(--ink-muted)', flexWrap: 'wrap', gap: 8,
        }}>
          <span>© 2025 Strada — Tous droits réservés</span>
          <span>Site conçu et développé en France · Paiement sécurisé</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }
      `}</style>
    </footer>
  )
}
