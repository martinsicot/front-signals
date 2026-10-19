export const revalidate = 3600

import { api } from '@/lib/api/server'
import CategorySidebar from '@/components/catalog/CategorySidebar'
import CategoryTiles from '@/components/catalog/CategoryTiles'
import InfiniteProductGridV2 from '@/components/catalog/InfiniteProductGridV2'
import CatalogSearchBar from '@/components/search/CatalogSearchBar'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ categorie: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params
  const categories = await api.categories()
  const cat = categories.find(c => c.slug === categorie)
  if (!cat) return {}
  return {
    title: `${cat.name} — Le Panneau`,
    description: cat.meta_description || cat.description,
  }
}

export default async function CategorieV2PageComponent({ params }: Props) {
  const { categorie } = await params
  const [productsPage, categories] = await Promise.all([
    api.products({ category: categorie }),
    api.categories(),
  ])

  const cat = categories.find(c => c.slug === categorie)
  if (!cat) notFound()

  return (
    <>
      {/* Dark category banner */}
      <div style={{
        background: 'var(--ink)',
        color: '#fff',
        padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            fontSize: 12, fontWeight: 500, letterSpacing: '0.09em',
            textTransform: 'uppercase', opacity: 0.5, marginBottom: 8,
          }}>
            <a href="/catalogue-v2" style={{ color: 'inherit' }}>Catalogue</a>
            {' › '}
            <span>{cat.name}</span>
          </p>
          <h1 style={{ fontSize: 36, letterSpacing: '-0.02em', fontWeight: 700, marginBottom: 8 }}>
            {cat.name}
          </h1>
          {cat.description && (
            <p style={{ fontSize: 15, opacity: 0.7, maxWidth: 600 }}>
              {cat.description}
            </p>
          )}
          <p style={{ fontSize: 13, opacity: 0.5, marginTop: 8 }}>
            {productsPage.count} référence{productsPage.count > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <CatalogSearchBar />

        {/* Category tiles — sibling categories, mobile nav */}
        <div className="cat-tiles-wrapper" style={{ marginTop: 24 }}>
          <CategoryTiles categories={categories} activeSlug={categorie} />
        </div>

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', marginTop: 32 }}>
          <div className="catalog-sidebar">
            <CategorySidebar categories={categories} activeSlug={categorie} />
          </div>

          <div style={{ flex: 1 }}>
            <InfiniteProductGridV2
              initialProducts={productsPage.results}
              initialHasMore={productsPage.next !== null}
              category={categorie}
            />
          </div>
        </div>
      </div>

      <style>{`
        .cat-tiles-wrapper { display: none; }
        @media (max-width: 768px) {
          .catalog-sidebar { display: none; }
          .cat-tiles-wrapper { display: block; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
