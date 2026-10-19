export const dynamic = 'force-dynamic'

import { api } from '@/lib/api/server'
import CategoryTilesV2 from '@/components/v2/catalog/CategoryTilesV2'
import ProductGridV2 from '@/components/v2/catalog/ProductGridV2'
import CatalogSearchBar from '@/components/search/CatalogSearchBar'

export const metadata = {
  title: 'Catalogue — Le Panneau',
  description: 'Tous nos panneaux de signalisation, mobilier urbain et équipements de sécurité.',
}

export default async function CatalogueV2Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() || undefined

  const [productsPage, categories] = await Promise.all([
    api.products({ q: query }),
    api.categories(),
  ])

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, letterSpacing: '-0.02em', marginBottom: 2 }}>
              {query ? `Résultats pour « ${query} »` : 'Catalogue'}
            </h1>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
              {productsPage.count} référence{productsPage.count > 1 ? 's' : ''}
            </p>
          </div>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <CatalogSearchBar />
          </div>
        </div>

        {/* Category tiles */}
        <CategoryTilesV2 categories={categories} />
      </div>

      {/* Full-width grid */}
      <ProductGridV2
        key={query ?? 'all'}
        initialProducts={productsPage.results}
        initialHasMore={productsPage.next !== null}
        q={query}
      />
    </div>
  )
}
