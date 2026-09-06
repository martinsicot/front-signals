export const revalidate = 3600

import { api } from '@/lib/api/server'
import CategorySidebar from '@/components/catalog/CategorySidebar'
import InfiniteProductGrid from '@/components/catalog/InfiniteProductGrid'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ categorie: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params
  const categories = await api.categories()
  const cat = categories.find(c => c.slug === categorie)
  if (!cat) return {}
  return {
    title: `${cat.name} — Strada`,
    description: cat.meta_description || cat.description,
  }
}

export default async function CategoriePageComponent({ params }: Props) {
  const { categorie } = await params
  const [productsPage, categories] = await Promise.all([
    api.products({ category: categorie }),
    api.categories(),
  ])

  const cat = categories.find(c => c.slug === categorie)
  if (!cat) notFound()

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 6 }}>
          <a href="/catalogue" style={{ color: 'var(--ink-muted)' }}>Catalogue</a>
          {' › '}
          <span style={{ color: 'var(--ink)' }}>{cat.name}</span>
        </p>
        <h1 style={{ fontSize: 32, letterSpacing: '-0.02em' }}>{cat.name}</h1>
        {cat.description && (
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginTop: 8, maxWidth: 600 }}>
            {cat.description}
          </p>
        )}
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginTop: 8 }}>
          {productsPage.count} référence{productsPage.count > 1 ? 's' : ''}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div className="catalog-sidebar">
          <CategorySidebar categories={categories} activeSlug={categorie} />
        </div>

        <div style={{ flex: 1 }}>
          <InfiniteProductGrid
            initialProducts={productsPage.results}
            initialHasMore={productsPage.next !== null}
            category={categorie}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .catalog-sidebar { display: none; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
