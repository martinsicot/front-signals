import Link from 'next/link'
import Image from 'next/image'
import type { ProductListItem } from '@/lib/api/server'

export default function ProductCardV3({ product }: { product: ProductListItem }) {
  const price = product.min_price_ttc != null && !Number.isNaN(parseFloat(product.min_price_ttc))
    ? parseFloat(product.min_price_ttc).toFixed(2).replace('.', ',')
    : null

  return (
    <Link href={`/v2/produits/${product.slug}`} className="pcv3" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'box-shadow .18s, transform .18s',
    }}>

      {/* Image — ratio 3:2 */}
      <div style={{
        aspectRatio: '3/2',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        {product.thumbnail || product.image ? (
          <Image
            src={product.thumbnail ?? product.image!}
            alt={product.name}
            fill
            style={{ objectFit: 'contain', padding: 16 }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 60 60" width={48} height={48} aria-hidden="true">
              <rect x={6} y={6} width={48} height={48} rx={5} fill="var(--surface-alt)" />
              <path d="M22 30h16M30 22v16" stroke="var(--border-strong)" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{
          fontSize: 12,
          color: 'var(--ink)',
          lineHeight: 1.4,
          fontWeight: 500,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>{product.name}</p>

        <div style={{ marginTop: 'auto', paddingTop: 6 }}>
          {price ? (
            <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 1 }}>dès</p>
          ) : null}
          {price ? (
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em',
              color: 'var(--verde)',
            }}>
              {price} € <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--ink-muted)' }}>TTC</span>
            </p>
          ) : (
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>Sur devis</p>
          )}
        </div>
      </div>

      <style>{`
        .pcv3:hover {
          box-shadow: var(--shadow-md) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </Link>
  )
}
