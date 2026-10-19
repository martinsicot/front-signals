import Link from 'next/link'
import type { Category } from '@/lib/api/server'

const CATEGORY_COLORS: Record<string, string> = {
  danger:              '#fff3e0',
  obligation:          '#e3f2fd',
  prescription:        '#e8eaf6',
  direction:           '#e8f5e9',
  localisation:        '#fce4ec',
  divers:              '#f3e5f5',
  'grands-axes':       '#e0f2f1',
  signalisation:       '#e8f5e9',
  'mobilier-urbain':   '#fff8e1',
  'securite-balisage': '#fbe9e7',
}

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

type Props = {
  categories: Category[]
  activeSlug?: string
  baseHref?: string
}

export default function CategoryTilesV2({ categories, activeSlug, baseHref = '/v2/catalogue' }: Props) {
  if (categories.length === 0) return null

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: 8,
      marginBottom: 28,
    }} className="v2-cat-tiles">
      {categories.map(cat => {
        const isActive = cat.slug === activeSlug
        const bg = CATEGORY_COLORS[cat.slug] ?? 'var(--surface-alt)'
        const icon = CATEGORY_ICONS[cat.slug] ?? '🪧'

        return (
          <Link
            key={cat.slug}
            href={`${baseHref}/${cat.slug}`}
            className="v2-cat-tile"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '16px 10px',
              background: isActive ? 'var(--verde-light)' : bg,
              border: `1px solid ${isActive ? 'var(--verde)' : 'transparent'}`,
              borderRadius: 8,
              textDecoration: 'none',
              color: isActive ? 'var(--verde)' : 'var(--ink)',
              textAlign: 'center',
              transition: 'box-shadow .15s, transform .15s',
            }}
          >
            <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, lineHeight: 1.3,
              letterSpacing: '0.01em',
            }}>{cat.name}</span>
          </Link>
        )
      })}

      <style>{`
        .v2-cat-tile:hover {
          box-shadow: var(--shadow-sm);
          transform: translateY(-2px);
        }
        @media (max-width: 480px) {
          .v2-cat-tiles { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
