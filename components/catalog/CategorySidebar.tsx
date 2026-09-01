import Link from 'next/link'
import type { Category } from '@/lib/api/server'

export default function CategorySidebar({
  categories,
  activeSlug,
}: {
  categories: Category[]
  activeSlug?: string
}) {
  return (
    <aside style={{ minWidth: 200 }}>
      <p style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.09em',
        textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12,
      }}>Catégories</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <li>
          <Link href="/catalogue" style={{
            display: 'block', padding: '8px 12px',
            fontSize: 14, fontWeight: 500, borderRadius: 6,
            color: !activeSlug ? 'var(--verde)' : 'var(--ink-muted)',
            background: !activeSlug ? 'var(--verde-light)' : 'transparent',
            transition: 'background .15s, color .15s',
          }}>
            Tous les produits
          </Link>
        </li>
        {categories.map(cat => (
          <li key={cat.slug}>
            <Link href={`/catalogue/${cat.slug}`} style={{
              display: 'block', padding: '8px 12px',
              fontSize: 14, fontWeight: 500, borderRadius: 6,
              color: activeSlug === cat.slug ? 'var(--verde)' : 'var(--ink-muted)',
              background: activeSlug === cat.slug ? 'var(--verde-light)' : 'transparent',
              transition: 'background .15s, color .15s',
            }}>
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
