import Link from 'next/link'
import type { Category } from '@/lib/api/server'

const CATEGORY_ICONS: Record<string, string> = {
  danger:              '⚠️',
  obligation:          '🔵',
  prescription:        '⛔',
  direction:           '➡️',
  localisation:        '📍',
  divers:              '🔣',
  'grands-axes':       '🛣️',
  signalisation:       '🪧',
  'mobilier-urbain':   '🏙️',
  'securite-balisage': '🚧',
}

const CATEGORY_COLORS: Record<string, { bg: string; accent: string }> = {
  danger:              { bg: '#fff8f0', accent: '#e65100' },
  obligation:          { bg: '#f0f4ff', accent: '#1565c0' },
  prescription:        { bg: '#f3f0ff', accent: '#4527a0' },
  direction:           { bg: '#f0fff4', accent: '#1b5e20' },
  localisation:        { bg: '#fff0f3', accent: '#b71c1c' },
  divers:              { bg: '#f8f0ff', accent: '#6a1b9a' },
  'grands-axes':       { bg: '#f0fffe', accent: '#004d40' },
  signalisation:       { bg: '#f0fff4', accent: '#1b5e20' },
  'mobilier-urbain':   { bg: '#fffde7', accent: '#e65100' },
  'securite-balisage': { bg: '#fff3e0', accent: '#bf360c' },
}

type Props = { categories: Category[] }

export default function SectorRowsV2({ categories }: Props) {
  return (
    <section style={{ padding: '48px 24px 56px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
          }}>
            Parcourir par catégorie
          </h2>
          <Link href="/v2/catalogue" style={{
            fontSize: 13, fontWeight: 500, color: 'var(--verde)',
            textDecoration: 'none',
          }}>
            Tout voir →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 12,
        }} className="v2-sector-grid">
          {categories.map(cat => {
            const icon = CATEGORY_ICONS[cat.slug] ?? '🪧'
            const color = CATEGORY_COLORS[cat.slug] ?? { bg: '#f5f5f5', accent: '#333' }

            return (
              <Link
                key={cat.slug}
                href={`/v2/catalogue/${cat.slug}`}
                className="v2-sector-tile"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: '20px 16px',
                  background: color.bg,
                  borderRadius: 10,
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  border: '1px solid transparent',
                  transition: 'box-shadow .18s, transform .18s, border-color .18s',
                }}
              >
                <span style={{ fontSize: 32, lineHeight: 1 }}>{icon}</span>
                <div>
                  <p style={{
                    fontSize: 13, fontWeight: 700, lineHeight: 1.3,
                    color: color.accent,
                    marginBottom: 4,
                  }}>{cat.name}</p>
                  {cat.description && (
                    <p style={{
                      fontSize: 11, color: 'var(--ink-muted)', lineHeight: 1.4,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>{cat.description}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        .v2-sector-tile:hover {
          box-shadow: var(--shadow-md) !important;
          transform: translateY(-3px);
          border-color: var(--border) !important;
        }
        @media (max-width: 640px) {
          .v2-sector-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
