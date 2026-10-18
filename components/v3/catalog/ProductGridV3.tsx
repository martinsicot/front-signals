"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { PaginatedResponse, ProductListItem } from '@/lib/api/server'

type View = 'grid' | 'table'
type SortKey = 'code' | 'price-asc' | 'price-desc'

type Props = {
  initialProducts: ProductListItem[]
  initialHasMore: boolean
  category?: string
  q?: string
  typeFilter?: string
}

function sortProducts(products: ProductListItem[], sort: SortKey): ProductListItem[] {
  return [...products].sort((a, b) => {
    if (sort === 'price-asc') return parseFloat(a.min_price ?? '999999') - parseFloat(b.min_price ?? '999999')
    if (sort === 'price-desc') return parseFloat(b.min_price ?? '999999') - parseFloat(a.min_price ?? '999999')
    return a.name.localeCompare(b.name, 'fr')
  })
}

export default function ProductGridV3({ initialProducts, initialHasMore, category, q, typeFilter }: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [error, setError] = useState(false)
  const [view, setView] = useState<View>('grid')
  const [sort, setSort] = useState<SortKey>('code')
  const [filters, setFilters] = useState<Record<string, boolean>>({})
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const FILTER_CHIPS = [
    { id: 'nf', label: 'NF' },
    { id: 'c1', label: 'Classe 1' },
    { id: 'c2', label: 'Classe 2' },
    { id: 'avec-poteau', label: 'Avec poteau' },
  ]

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
      if (!res.ok) throw new Error()
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
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) loadMore() }, { rootMargin: '400px' })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, hasMore])

  const sorted = sortProducts(
    typeFilter ? products.filter(p => p.type === typeFilter) : products,
    sort,
  )

  const btnStyle = (active: boolean): React.CSSProperties => ({
    minHeight: 40, padding: '0 14px',
    border: active ? '1.5px solid #111315' : '1.5px solid #111315',
    background: active ? '#111315' : '#FFFFFF',
    color: active ? '#FFFFFF' : '#111315',
    fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
    cursor: 'pointer', borderRadius: 0,
  })

  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '28px 24px 0', maxWidth: 1360, margin: '0 auto', boxSizing: 'border-box' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: 16,
          paddingBottom: 16, borderBottom: '2px solid #111315',
        }}>
          {/* Filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61', marginRight: 4 }}>FILTRER</span>
            {FILTER_CHIPS.map(chip => {
              const on = !!filters[chip.id]
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilters(f => ({ ...f, [chip.id]: !on }))}
                  aria-pressed={on}
                  style={btnStyle(on)}
                >
                  {chip.label}
                </button>
              )
            })}
          </div>

          {/* View toggle + sort */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <div role="group" aria-label="Affichage" style={{ display: 'flex', border: '1.5px solid #111315', borderRadius: 2 }}>
              <button
                type="button"
                onClick={() => setView('grid')}
                aria-pressed={view === 'grid'}
                style={{ ...btnStyle(view === 'grid'), display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="1" width="6" height="6" /><rect x="9" y="1" width="6" height="6" />
                  <rect x="1" y="9" width="6" height="6" /><rect x="9" y="9" width="6" height="6" />
                </svg>
                Grille
              </button>
              <button
                type="button"
                onClick={() => setView('table')}
                aria-pressed={view === 'table'}
                style={{ ...btnStyle(view === 'table'), display: 'flex', alignItems: 'center', gap: 8, borderLeft: '1.5px solid #111315' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="2" width="14" height="2" /><rect x="1" y="7" width="14" height="2" /><rect x="1" y="12" width="14" height="2" />
                </svg>
                Tableau
              </button>
            </div>

            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              style={{
                minHeight: 43, border: '1.5px solid #111315', borderRadius: 2,
                background: '#FFFFFF', fontFamily: 'inherit', fontWeight: 700,
                fontSize: 14, color: '#111315', padding: '0 12px', cursor: 'pointer',
              }}
            >
              <option value="code">Trier : code (A → Z)</option>
              <option value="price-asc">Trier : prix croissant</option>
              <option value="price-desc">Trier : prix décroissant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <section style={{ maxWidth: 1360, margin: '0 auto', padding: '0 24px 48px', boxSizing: 'border-box' }}>
        {view === 'grid' ? (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            borderLeft: '1px solid #D6D7D9',
          }}>
            {sorted.map(p => {
              const price = p.min_price != null && !Number.isNaN(parseFloat(p.min_price))
                ? parseFloat(p.min_price).toFixed(2).replace('.', ',')
                : null
              return (
                <article key={p.id} className="v3-tile" style={{
                  display: 'flex', flexDirection: 'column', gap: 10,
                  padding: 20, borderRight: '1px solid #D6D7D9', borderBottom: '1px solid #D6D7D9',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 14, fontWeight: 600, color: '#565B61' }}>
                      {p.base_code || p.categories[0]?.name || '—'}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 800, border: '1.5px solid #1F5BB5', color: '#1F5BB5', padding: '2px 6px', borderRadius: 2 }}>NF</span>
                  </div>
                  <Link href={`/v3/produits/${p.slug}`} aria-label={p.name} style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.thumbnail || p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.thumbnail ?? p.image!} alt={p.name} style={{ maxHeight: 160, maxWidth: '100%', objectFit: 'contain' }} />
                    ) : (
                      <svg width="120" height="120" viewBox="0 0 100 100" aria-hidden="true">
                        <polygon points="50,10 92,86 8,86" fill="#FFFFFF" stroke="#D52B1E" strokeWidth="8" strokeLinejoin="round" />
                        <text x="50" y="74" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#111315">!</text>
                      </svg>
                    )}
                  </Link>
                  <Link href={`/v3/produits/${p.slug}`} className="v3-ul" style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.25 }}>
                    {p.name}
                  </Link>
                  <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>
                    {p.type || 'Signalisation routière'}
                  </span>
                  <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 14, color: '#565B61' }}>
                      dès <strong style={{ fontFamily: 'var(--font-overpass-mono), monospace', color: '#111315', fontSize: 17 }}>
                        {price ? `${price} € HT` : 'Sur devis'}
                      </strong>
                    </span>
                    <button type="button" style={{
                      minHeight: 40, padding: '0 12px',
                      border: '1.5px solid #111315', borderRadius: 2,
                      background: '#FFFFFF', fontFamily: 'inherit',
                      fontWeight: 700, fontSize: 13, color: '#111315', cursor: 'pointer',
                    }}>+ Devis</button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 880, borderCollapse: 'collapse', fontSize: 16 }}>
              <thead>
                <tr style={{ textAlign: 'left', fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>
                  <th scope="col" style={{ padding: '14px 12px', fontWeight: 500, width: 72 }}><span className="sr-only">Visuel</span></th>
                  <th scope="col" style={{ padding: '14px 12px', fontWeight: 500 }}>CODE</th>
                  <th scope="col" style={{ padding: '14px 12px', fontWeight: 500 }}>DÉSIGNATION</th>
                  <th scope="col" style={{ padding: '14px 12px', fontWeight: 500 }}>CATÉGORIE</th>
                  <th scope="col" style={{ padding: '14px 12px', fontWeight: 500 }}>PRIX DÈS</th>
                  <th scope="col" style={{ padding: '14px 12px', fontWeight: 500 }}><span className="sr-only">Action</span></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(p => {
                  const price = p.min_price != null && !Number.isNaN(parseFloat(p.min_price))
                    ? `${parseFloat(p.min_price).toFixed(2).replace('.', ',')} €`
                    : 'Sur devis'
                  return (
                    <tr key={p.id} className="v3-row" style={{ borderTop: '1px solid #D6D7D9' }}>
                      <td style={{ padding: '10px 12px' }}>
                        {(p.thumbnail || p.image)
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={p.thumbnail ?? p.image!} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                          : <svg width="48" height="48" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 92,86 8,86" fill="#FFFFFF" stroke="#D52B1E" strokeWidth="9" strokeLinejoin="round" /></svg>
                        }
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-overpass-mono), monospace', fontWeight: 600, fontSize: 17 }}>
                        {p.base_code || '—'}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 700 }}>
                        <Link href={`/v3/produits/${p.slug}`} className="v3-ul">{p.name}</Link>
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 14 }}>
                        {p.categories[0]?.name ?? '—'}
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-overpass-mono), monospace', fontWeight: 600 }}>{price}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                        <Link href={`/v3/produits/${p.slug}`} style={{
                          display: 'inline-flex', alignItems: 'center',
                          minHeight: 40, padding: '0 14px',
                          background: '#111315', color: '#FFFFFF',
                          fontWeight: 700, fontSize: 14,
                          textDecoration: 'none', borderRadius: 2,
                        }}>Configurer</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingTop: 24 }}>
          <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>
            {sorted.length} SUR {products.length}+
          </span>
          {hasMore && (
            <button type="button" onClick={loadMore} style={{
              minHeight: 52, padding: '0 32px',
              border: '2px solid #111315', borderRadius: 2,
              background: '#FFFFFF', fontFamily: 'inherit',
              fontWeight: 800, fontSize: 16, color: '#111315', cursor: 'pointer',
            }}>
              {error ? 'Réessayer' : 'Afficher plus de références'}
            </button>
          )}
        </div>
      </section>

      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />
    </>
  )
}
