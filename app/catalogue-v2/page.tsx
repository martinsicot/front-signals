export const dynamic = 'force-dynamic'

import { api } from '@/lib/api/server'
import CategorySidebar from '@/components/catalog/CategorySidebar'
import CategoryTiles from '@/components/catalog/CategoryTiles'
import InfiniteProductGridV2 from '@/components/catalog/InfiniteProductGridV2'
import CatalogSearchBar from '@/components/search/CatalogSearchBar'

export const metadata = {
  title: 'Catalogue v2 — Le Panneau',
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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 6 }}>Catalogue</p>
        <h1 style={{ fontSize: 32, letterSpacing: '-0.02em' }}>
          {query ? `Résultats pour « ${query} »` : 'Tous les produits'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginTop: 8 }}>
          {productsPage.count} référence{productsPage.count > 1 ? 's' : ''}
        </p>
        <CatalogSearchBar />
      </div>

      {/* Category tiles — mobile-first navigation */}
      <div className="cat-tiles-wrapper">
        <CategoryTiles categories={categories} />
      </div>

      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <div className="catalog-sidebar">
          <CategorySidebar categories={categories} />
        </div>

        {/* Grid */}
        <div style={{ flex: 1 }}>
          <InfiniteProductGridV2
            key={query ?? 'all'}
            initialProducts={productsPage.results}
            initialHasMore={productsPage.next !== null}
            q={query}
          />
        </div>
      </div>

      <style>{`
        .cat-tiles-wrapper { display: none; margin-bottom: 24px; }
        @media (max-width: 768px) {
          .catalog-sidebar { display: none; }
          .cat-tiles-wrapper { display: block; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
