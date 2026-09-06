'use client'

import { useState } from 'react'
import ProductCard from '@/components/catalog/ProductCard'
import type { ProductListItem, Category } from '@/lib/api/server'

export default function ProductsSectionClient({
  products,
  categories,
}: {
  products: ProductListItem[]
  categories: Category[]
}) {
  const [active, setActive] = useState<string>('all')

  const visible =
    active === 'all'
      ? products
      : products.filter(p => p.categories.some(c => c.slug === active))

  const filters = [
    { label: 'Tous', value: 'all' },
    ...categories.map(c => ({ label: c.name, value: c.slug })),
  ]

  return (
    <section style={{ padding: '16px 0 72px' }} id="products">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p className="label" style={{ marginBottom: 6 }}>Catalogue</p>
            <h2 style={{ fontSize: 28, letterSpacing: '-0.02em' }}>Produits populaires</h2>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              style={{
                padding: '7px 14px',
                border: `1px solid ${active === f.value ? 'var(--ink)' : 'var(--border)'}`,
                borderRadius: 20,
                fontSize: 13, fontWeight: 500,
                color: active === f.value ? 'var(--bg)' : 'var(--ink-muted)',
                background: active === f.value ? 'var(--ink)' : 'transparent',
                transition: 'all .15s',
                cursor: 'pointer',
              }}
            >{f.label}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        }} className="product-grid">
          {visible.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
