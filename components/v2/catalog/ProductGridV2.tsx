"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import ProductCardV3 from './ProductCardV3'
import type { PaginatedResponse, ProductListItem } from '@/lib/api/server'

type SortKey = 'default' | 'price-asc' | 'price-desc'

type Props = {
  initialProducts: ProductListItem[]
  initialHasMore: boolean
  category?: string
  q?: string
}

function sortProducts(products: ProductListItem[], sort: SortKey): ProductListItem[] {
  if (sort === 'default') return products
  return [...products].sort((a, b) => {
    const pa = parseFloat(a.min_price ?? '999999')
    const pb = parseFloat(b.min_price ?? '999999')
    return sort === 'price-asc' ? pa - pb : pb - pa
  })
}

export default function ProductGridV2({ initialProducts, initialHasMore, category, q }: Props) {
  const [products, setProducts] = useState<ProductListItem[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [error, setError] = useState(false)
  const [sort, setSort] = useState<SortKey>('default')

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setError(false)

    const nextPage = page + 1
    const qs = new URLSearchParams({ page: String(nextPage) })
    if (category) qs.set('category', category)
    if (q) qs.set('q', q)

    try {
      const res = await fetch(`/api/products?${qs}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as PaginatedResponse<ProductListItem>

      setProducts(prev => {
        const seen = new Set(prev.map(p => p.id))
        return [...prev, ...data.results.filter(p => !seen.has(p.id))]
      })
      setPage(nextPage)
      setHasMore(data.next !== null)
    } catch {
      setError(true)
    } finally {
      loadingRef.current = false
    }
  }, [page, hasMore, category, q])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore() },
      { rootMargin: '400px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, hasMore])

  const sorted = sortProducts(products, sort)

  return (
    <>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20, gap: 12,
      }}>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
          {products.length} produit{products.length > 1 ? 's' : ''} chargé{products.length > 1 ? 's' : ''}
        </p>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortKey)}
          style={{
            padding: '7px 12px',
            border: '1px solid var(--border)',
            borderRadius: 6,
            background: 'var(--surface)',
            color: 'var(--ink)',
            fontSize: 13,
            cursor: 'pointer',
            outline: 'none',
          }}
          aria-label="Trier les produits"
        >
          <option value="default">Pertinence</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Aucun produit disponible.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}
          className="v2-catalog-grid"
        >
          {sorted.map(p => (
            <ProductCardV3 key={p.id} product={p} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />

      <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 13, color: 'var(--ink-muted)' }}>
        {error ? (
          <button
            type="button"
            onClick={loadMore}
            style={{
              background: 'none', border: '1px solid var(--border-strong)',
              borderRadius: 'var(--r)', padding: '8px 16px', cursor: 'pointer',
              color: 'var(--ink)', fontSize: 13,
            }}
          >
            Échec du chargement — réessayer
          </button>
        ) : hasMore ? (
          <span>Chargement…</span>
        ) : sorted.length > 0 ? (
          <span>Tous les produits sont affichés.</span>
        ) : null}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .v2-catalog-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .v2-catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .v2-catalog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
        }
      `}</style>
    </>
  )
}
