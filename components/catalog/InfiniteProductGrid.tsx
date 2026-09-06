"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import ProductCard from '@/components/catalog/ProductCard'
import type { PaginatedResponse, ProductListItem } from '@/lib/api/server'

type Props = {
  initialProducts: ProductListItem[]
  initialHasMore: boolean
  category?: string
}

export default function InfiniteProductGrid({ initialProducts, initialHasMore, category }: Props) {
  const [products, setProducts] = useState<ProductListItem[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [error, setError] = useState(false)

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  // Guards against concurrent/duplicate fetches (IntersectionObserver can fire
  // repeatedly, and React Strict Mode double-invokes effects in dev).
  const loadingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setError(false)

    const nextPage = page + 1
    const qs = new URLSearchParams({ page: String(nextPage) })
    if (category) qs.set('category', category)

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
  }, [page, hasMore, category])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '400px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, hasMore])

  return (
    <>
      {products.length === 0 ? (
        <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Aucun produit disponible.</p>
      ) : (
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="catalog-grid"
        >
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Sentinel — observed to trigger the next page load */}
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
        ) : products.length > 0 ? (
          <span>Tous les produits sont affichés.</span>
        ) : null}
      </div>
    </>
  )
}
