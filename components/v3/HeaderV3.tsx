import Link from 'next/link'

const NAV_ITEMS = [
  { num: '01', label: 'Panneaux de police', href: '/v3/catalogue' },
  { num: '02', label: 'Chantier', href: '/v3/catalogue' },
  { num: '03', label: 'Poteaux & fixations', href: '/v3/catalogue' },
  { num: '04', label: 'Balisage', href: '/v3/catalogue' },
  { num: '05', label: 'Plaques de rue', href: '/v3/catalogue' },
  { num: '06', label: 'Sur mesure', href: '/v3/catalogue' },
]

export default function HeaderV3() {
  return (
    <header>
      {/* Top bar — black */}
      <div style={{ background: '#111315', color: '#FFFFFF' }}>
        <div style={{
          maxWidth: 1360, margin: '0 auto', padding: '14px 24px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px',
        }}>
          {/* Logo */}
          <Link href="/v3" aria-label="Strada, accueil" style={{
            display: 'flex', alignItems: 'center', gap: 12,
            textDecoration: 'none', color: '#FFFFFF',
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
              <rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)" fill="#FFFFFF" />
              <rect x="11.5" y="11.5" width="17" height="17" transform="rotate(45 20 20)" fill="#FFD400" />
            </svg>
            <span style={{ fontWeight: 900, fontSize: 26, letterSpacing: 2 }}>STRADA</span>
          </Link>

          {/* Search */}
          <form role="search" action="/v3/catalogue" method="get" style={{
            flex: '1 1 380px', display: 'flex', alignItems: 'stretch',
            height: 48, background: '#FFFFFF', borderRadius: 2,
          }}>
            <label htmlFor="q-v3-h" style={{
              position: 'absolute', width: 1, height: 1, padding: 0,
              margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)',
              whiteSpace: 'nowrap', border: 0,
            }}>Rechercher par code ou mot-clé</label>
            <input
              id="q-v3-h"
              type="search"
              name="q"
              placeholder="Code ou mot-clé — ex. B14, panneau danger, poteau"
              style={{
                flex: 1, minWidth: 0, border: 0, outline: 0,
                padding: '0 16px',
                fontFamily: 'var(--font-overpass-mono), monospace',
                fontSize: 15, background: 'transparent', color: '#111315',
              }}
            />
            <button type="submit" style={{
              border: 0, background: '#FFD400', color: '#111315',
              fontFamily: 'inherit', fontWeight: 800, fontSize: 15,
              padding: '0 20px', cursor: 'pointer', letterSpacing: '.5px',
              borderRadius: '0 2px 2px 0',
            }}>CHERCHER</button>
          </form>

          {/* Account nav */}
          <nav aria-label="Mon espace" style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontWeight: 700, fontSize: 15,
          }}>
            <Link href="/connexion" className="v3-ul" style={{ color: '#FFFFFF', padding: '12px 10px' }}>Espace pro</Link>
            <Link href="/panier" className="v3-ul" style={{ color: '#FFFFFF', padding: '12px 10px' }}>
              Devis <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', color: '#FFD400' }}>(0)</span>
            </Link>
            <Link href="/panier" className="v3-ul" style={{ color: '#FFFFFF', padding: '12px 10px' }}>
              Panier <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', color: '#FFD400' }}>(0)</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Category nav */}
      <nav aria-label="Catalogue" style={{ borderBottom: '2px solid #111315', background: '#FFFFFF' }}>
        <ul style={{
          maxWidth: 1360, margin: '0 auto', padding: '0 24px',
          listStyle: 'none', display: 'flex', flexWrap: 'wrap',
          fontWeight: 700, fontSize: 15,
        }}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.num}>
              <Link href={item.href} className="v3-ul" style={{
                display: 'flex', gap: 8, alignItems: 'baseline',
                padding: '16px 18px',
                borderRight: i < NAV_ITEMS.length - 1 ? '1px solid #D6D7D9' : 'none',
                textDecoration: 'none', color: '#111315',
              }}>
                <span style={{
                  fontFamily: 'var(--font-overpass-mono), monospace',
                  fontSize: 12, color: '#565B61',
                }}>{item.num}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
