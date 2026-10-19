import Link from 'next/link'
import type { Category } from '@/lib/api/server'

const CATEGORY_ICONS: Record<string, string> = {
  danger:         '⚠️',
  obligation:     '🔵',
  prescription:   '🟦',
  direction:      '➡️',
  localisation:   '📍',
  divers:         '🔣',
  'grands-axes':  '🛣️',
  signalisation:  '🪧',
  'mobilier-urbain': '🏙️',
  'securite-balisage': '🚧',
}

export default function CategoryTiles({ categories, activeSlug }: { categories: Category[]; activeSlug?: string }) {
  if (categories.length === 0) return null

  return (
    <section style={{ marginBottom: 40 }}>
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.09em',
        textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 14,
      }}>Parcourir par catégorie</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 10,
      }} className="category-tiles-grid">
        {categories.map(cat => {
          const isActive = cat.slug === activeSlug
          const icon = CATEGORY_ICONS[cat.slug] ?? '🪧'

          return (
            <Link key={cat.slug} href={`/catalogue/${cat.slug}`} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px',
              background: isActive ? 'var(--verde-light)' : 'var(--surface)',
              border: `1px solid ${isActive ? 'var(--verde)' : 'var(--border)'}`,
              borderRadius: 10,
              textDecoration: 'none', color: 'var(--ink)',
              transition: 'border-color .15s, background .15s, box-shadow .15s',
            }} className="cat-tile">
              <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
              <span style={{
                fontSize: 13, fontWeight: 600, lineHeight: 1.3,
                color: isActive ? 'var(--verde)' : 'var(--ink)',
              }}>{cat.name}</span>
            </Link>
          )
        })}
      </div>

      <style>{`
        .cat-tile:hover {
          border-color: var(--verde) !important;
          background: var(--verde-light) !important;
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 480px) {
          .category-tiles-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
