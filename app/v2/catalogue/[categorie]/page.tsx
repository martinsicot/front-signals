export const revalidate = 3600

import { api } from '@/lib/api/server'
import CategoryTilesV2 from '@/components/v2/catalog/CategoryTilesV2'
import ProductGridV2 from '@/components/v2/catalog/ProductGridV2'
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

export default async function CategorieV2Page({ params }: Props) {
  const { categorie } = await params
  const [productsPage, categories] = await Promise.all([
    api.products({ category: categorie }),
    api.categories(),
  ])

  const cat = categories.find(c => c.slug === categorie)
  if (!cat) notFound()

  return (
    <>
      {/* Category hero banner */}
      <div style={{
        background: 'var(--ink)',
        color: 'white',
        paddingTop: 40,
        paddingBottom: 40,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <nav style={{ fontSize: 12, opacity: 0.5, marginBottom: 10 }}>
            <a href="/v2" style={{ color: 'inherit' }}>Accueil</a>
            {' › '}
            <a href="/v2/catalogue" style={{ color: 'inherit' }}>Catalogue</a>
            {' › '}
            <span>{cat.name}</span>
          </nav>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 6,
          }}>{cat.name}</h1>
          {cat.description && (
            <p style={{ fontSize: 14, opacity: 0.65, maxWidth: 560 }}>
              {cat.description}
            </p>
          )}
          <p style={{ fontSize: 13, opacity: 0.4, marginTop: 8 }}>
            {productsPage.count} référence{productsPage.count > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px' }}>

        {/* Search + tiles */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ maxWidth: 440, marginBottom: 20 }}>
            <CatalogSearchBar />
          </div>
          <CategoryTilesV2 categories={categories} activeSlug={categorie} />
        </div>

        {/* Full-width grid */}
        <ProductGridV2
          initialProducts={productsPage.results}
          initialHasMore={productsPage.next !== null}
          category={categorie}
        />
      </div>
    </>
  )
}
