import { api } from '@/lib/api/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await api.product(slug)
    return {
      title: product.meta_title || `${product.name} — Strada`,
      description: product.meta_description || product.description,
    }
  } catch {
    return {}
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  let product
  try {
    product = await api.product(slug)
  } catch {
    notFound()
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <p className="label" style={{ marginBottom: 24 }}>
        <a href="/catalogue" style={{ color: 'var(--ink-muted)' }}>Catalogue</a>
        {' › '}
        <a href={`/catalogue/${product.category.slug}`} style={{ color: 'var(--ink-muted)' }}>
          {product.category.name}
        </a>
        {' › '}
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start',
      }} className="product-detail-grid">

        {/* Image */}
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 12, aspectRatio: '1', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain', padding: 32 }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <svg viewBox="0 0 120 120" width={120} height={120} aria-hidden="true">
              <rect x={15} y={15} width={90} height={90} rx={8} fill="var(--surface-alt)" />
              <path d="M45 60h30M60 45v30" stroke="var(--border-strong)" strokeWidth={3} strokeLinecap="round" />
            </svg>
          )}
        </div>

        {/* Info */}
        <div>
          <p style={{
            fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--verde)', marginBottom: 8,
          }}>{product.category.name}</p>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 32, letterSpacing: '-0.02em', marginBottom: 12,
          }}>{product.name}</h1>

          <div style={{
            fontSize: 36, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em', marginBottom: 24, color: 'var(--ink)',
          }}>
            {parseFloat(product.price).toFixed(2).replace('.', ',')} €
            <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--ink-muted)', marginLeft: 8 }}>HT / unité</span>
          </div>

          {/* Description */}
          {product.description && (
            <p style={{
              fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: 24,
            }}>{product.description}</p>
          )}

          {/* Specs */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '16px 20px', marginBottom: 24,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {product.dimensions && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--ink-muted)' }}>Dimensions</span>
                <span style={{ fontWeight: 500 }}>{product.dimensions}</span>
              </div>
            )}
            {product.material && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--ink-muted)' }}>Matériau</span>
                <span style={{ fontWeight: 500 }}>{product.material}</span>
              </div>
            )}
            {product.weight_kg && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--ink-muted)' }}>Poids</span>
                <span style={{ fontWeight: 500 }}>{product.weight_kg} kg</span>
              </div>
            )}
          </div>

          {/* Delivery info */}
          <div style={{
            background: 'var(--verde-light)', border: '1px solid var(--verde-mid)',
            borderRadius: 8, padding: '12px 16px', marginBottom: 24,
            fontSize: 13, color: 'var(--verde)', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x={1} y={3} width={14} height={11} rx={1.5} /><path d="M1 7h14M5 3V1M11 3V1" />
            </svg>
            Livraison en <strong style={{ marginLeft: 4 }}>3 jours ouvrés</strong>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{
              flex: 1, padding: '14px 24px',
              background: 'var(--verde)', color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15, fontWeight: 600, borderRadius: 'var(--r)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              Ajouter au panier
            </button>
            <a href="#cta-devis" style={{
              padding: '14px 20px',
              border: '1px solid var(--border-strong)',
              color: 'var(--ink)', fontSize: 15, fontWeight: 500,
              borderRadius: 'var(--r)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Devis groupé
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  )
}
