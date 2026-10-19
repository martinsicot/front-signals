export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { api } from '@/lib/api/server'
import ProductGridV3 from '@/components/v3/catalog/ProductGridV3'

export const metadata: Metadata = {
  title: 'Catalogue — Le Panneau',
  description: 'Tous nos panneaux de signalisation routière, poteaux et fixations.',
}

export default async function CatalogueV3Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() || undefined

  const productsPage = await api.products({ q: query })

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '20px 24px 0', boxSizing: 'border-box' }}>
        <nav aria-label="Fil d'Ariane" style={{
          fontFamily: 'var(--font-overpass-mono), monospace',
          fontSize: 13, color: '#565B61',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Link href="/v3" style={{ color: '#565B61' }}>LE PANNEAU</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: '#111315', fontWeight: 600 }}>CATALOGUE</span>
        </nav>
      </div>

      {/* Section heading */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 24px 0', boxSizing: 'border-box' }}>
        <div style={{ borderTop: '2px solid #111315', paddingTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>01 —</span>
            <h1 style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1.05 }}>
              {query ? `Résultats pour « ${query} »` : 'Catalogue'}
            </h1>
          </div>
          <span style={{
            fontFamily: 'var(--font-overpass-mono), monospace',
            fontSize: 15, color: '#565B61',
          }}>
            {productsPage.count} référence{productsPage.count > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <ProductGridV3
        key={query ?? 'all'}
        initialProducts={productsPage.results}
        initialHasMore={productsPage.next !== null}
        q={query}
      />
    </>
  )
}
