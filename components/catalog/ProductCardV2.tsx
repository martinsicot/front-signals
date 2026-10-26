'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { ProductListItem } from '@/lib/api/server'

export default function ProductCard({ product }: { product: ProductListItem }) {
  const price = product.min_price_ttc != null && !Number.isNaN(parseFloat(product.min_price_ttc))
    ? parseFloat(product.min_price_ttc).toFixed(2).replace('.', ',')
    : null

  return (
    <Link href={`/produits/${product.slug}`} style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'box-shadow .2s, border-color .2s, transform .2s',
      textDecoration: 'none', color: 'inherit',
    }} className="product-card">

      {/* Image — ratio 4:3, dominante */}
      <div style={{
        aspectRatio: '4/3',
        background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {product.thumbnail || product.image ? (
          <Image
            src={product.thumbnail ?? product.image!}
            alt={product.name}
            fill
            style={{ objectFit: 'contain', padding: 20 }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <svg viewBox="0 0 80 80" width={64} height={64} aria-hidden="true">
            <rect x={10} y={10} width={60} height={60} rx={6} fill="var(--surface-alt)" />
            <path d="M30 40h20M40 30v20" stroke="var(--border-strong)" strokeWidth={2} strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
          lineHeight: 1.4,
          color: 'var(--ink)',
        }}>{product.name}</h3>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          {price ? (
            <div>
              <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>dès </span>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)',
              }}>{price} €</span>
              <span style={{ fontSize: 11, color: 'var(--ink-muted)', marginLeft: 3 }}>TTC</span>
            </div>
          ) : (
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>Sur devis</span>
          )}

          <span className="card-cta" style={{
            fontSize: 12, fontWeight: 600, color: 'var(--verde)',
            opacity: 0, transition: 'opacity .2s',
            whiteSpace: 'nowrap',
          }}>Voir →</span>
        </div>
      </div>

      <style>{`
        .product-card:hover {
          box-shadow: var(--shadow-md) !important;
          border-color: var(--verde) !important;
          transform: translateY(-2px);
        }
        .product-card:hover .card-cta {
          opacity: 1 !important;
        }
      `}</style>
    </Link>
  )
}
