import Link from 'next/link'
import type { Category } from '@/lib/api/server'

const CATEGORY_SVG: Record<string, React.ReactNode> = {
  danger: (
    <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points="50,10 92,86 8,86" fill="#FFFFFF" stroke="#D52B1E" strokeWidth="11" strokeLinejoin="round" />
      <rect x="46" y="36" width="8" height="28" fill="#111315" />
      <rect x="46" y="70" width="8" height="8" fill="#111315" />
    </svg>
  ),
  obligation: (
    <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="#1F5BB5" />
      <text x="50" y="62" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="30" fill="#FFFFFF">→</text>
    </svg>
  ),
  prescription: (
    <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="#FFFFFF" stroke="#D52B1E" strokeWidth="11" />
      <text x="50" y="62" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="34" fill="#111315">50</text>
    </svg>
  ),
  signalisation: (
    <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="4" y="28" width="92" height="44" rx="4" fill="#1F5BB5" />
      <text x="50" y="56" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="14" fill="#FFFFFF">ROUTE</text>
    </svg>
  ),
  'mobilier-urbain': (
    <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="38" y="10" width="24" height="84" rx="10" fill="#FFFFFF" stroke="#9AA1A9" strokeWidth="2.5" />
      <rect x="39" y="24" width="22" height="12" fill="#D52B1E" />
    </svg>
  ),
  'securite-balisage': (
    <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points="50,10 92,86 8,86" fill="#F7C600" stroke="#D52B1E" strokeWidth="8" strokeLinejoin="round" />
      <rect x="46" y="36" width="8" height="28" fill="#111315" />
      <rect x="46" y="70" width="8" height="8" fill="#111315" />
    </svg>
  ),
}

const DEFAULT_SVG = (
  <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true">
    <rect x="4" y="30" width="92" height="40" rx="6" fill="#FFFFFF" stroke="#111315" strokeWidth="4" />
    <text x="50" y="56" textAnchor="middle" fontFamily="monospace" fontWeight="600" fontSize="13" fill="#111315">ABC…</text>
  </svg>
)

const SUBS: Record<string, string[]> = {
  danger:              ['Danger (A)', 'Intersection (AB)', 'Indication (C)'],
  obligation:          ['Obligation (B)', 'Interdiction (B)', 'Priorité (AB)'],
  prescription:        ['Vitesse (B14)', 'Stationnement (B6)', 'Accès (B3)'],
  direction:           ['Direction (D)', 'Services (CE)', 'Localisation'],
  'mobilier-urbain':   ['Bancs & tables', 'Corbeilles', 'Arceaux vélo'],
  'securite-balisage': ['Balises J11', 'Bornes & potelets', 'Barrières'],
  default:             ['Voir les références', 'Configurateur', 'Devis groupé'],
}

type Props = { categories: Category[] }

export default function CatalogSectionsV3({ categories }: Props) {
  return (
    <section style={{ maxWidth: 1360, margin: '0 auto', padding: '64px 24px 24px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 14, color: '#565B61' }}>02 — CATALOGUE</span>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 40, lineHeight: 1.05 }}>Tout le matériel de signalisation</h2>
        </div>
        <Link href="/v3/catalogue" className="v3-ul" style={{ fontWeight: 700, fontSize: 16 }}>Voir l'index complet</Link>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        borderTop: '2px solid #111315', borderLeft: '1px solid #D6D7D9',
      }}>
        {categories.map((cat, i) => {
          const num = String(i + 1).padStart(2, '0')
          const subs = SUBS[cat.slug] ?? SUBS.default
          const icon = CATEGORY_SVG[cat.slug] ?? DEFAULT_SVG

          return (
            <div key={cat.slug} className="v3-tile" style={{
              position: 'relative', display: 'flex', flexDirection: 'column', gap: 14,
              padding: 28, borderRight: '1px solid #D6D7D9', borderBottom: '1px solid #D6D7D9',
              minHeight: 260, boxSizing: 'border-box',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 14, fontWeight: 600 }}>{num}</span>
                <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>— réf.</span>
              </div>
              <Link href={`/v3/catalogue/${cat.slug}`} className="v3-ul" style={{ fontWeight: 800, fontSize: 26, lineHeight: 1.1 }}>
                {cat.name}
              </Link>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16, maxWidth: '62%' }}>
                {subs.map(sub => (
                  <li key={sub}>
                    <Link href={`/v3/catalogue/${cat.slug}`} className="v3-ul" style={{ color: '#3A3E43' }}>{sub}</Link>
                  </li>
                ))}
              </ul>
              <div style={{ position: 'absolute', right: 24, bottom: 24, width: 88, height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
