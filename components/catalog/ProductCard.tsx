import Link from 'next/link'
import Image from 'next/image'
import type { ProductListItem } from '@/lib/api/server'

export default function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link href={`/produits/${product.slug}`} style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'box-shadow .2s, border-color .2s',
      textDecoration: 'none', color: 'inherit',
    }} className="product-card">

      {/* Image */}
      <div style={{
        aspectRatio: '1', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid var(--border)', position: 'relative',
      }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain', padding: 16 }}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <svg viewBox="0 0 80 80" width={72} height={72} aria-hidden="true">
            <rect x={10} y={10} width={60} height={60} rx={6} fill="var(--surface-alt)" />
            <path d="M30 40h20M40 30v20" stroke="var(--border-strong)" strokeWidth={2} strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4,
        }}>{product.category_name}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14, fontWeight: 600, marginBottom: 4, letterSpacing: '-0.01em',
        }}>{product.name}</h3>
        <p style={{
          fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.5,
          flex: 1, marginBottom: 14,
        }}>{product.dimensions} · {product.material}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em',
          }}>
            {parseFloat(product.price).toFixed(2).replace('.', ',')} €{' '}
            <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--ink-muted)' }}>HT</span>
          </div>
          <span style={{
            width: 32, height: 32,
            background: 'var(--verde-light)', color: 'var(--verde)',
            borderRadius: 'var(--r)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 300,
          }}>+</span>
        </div>
      </div>

      <style>{`.product-card:hover { box-shadow: var(--shadow-md) !important; border-color: var(--border-strong) !important; }`}</style>
    </Link>
  )
}
