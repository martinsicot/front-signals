export const revalidate = 3600

import { api } from '@/lib/api/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ProductConfigurator from '@/components/catalog/ProductConfigurator'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await api.product(slug)
    return {
      title: product.meta_title || `${product.name} — Le Panneau`,
      description: product.meta_description || product.description,
    }
  } catch {
    return {}
  }
}

export default async function ProductV2Page({ params }: Props) {
  const { slug } = await params
  let product
  try {
    product = await api.product(slug)
  } catch {
    notFound()
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px 64px' }}>

      {/* Breadcrumb */}
      <nav style={{
        fontSize: 12, color: 'var(--ink-muted)',
        marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
      }}>
        <Link href="/v2" style={{ color: 'var(--ink-muted)' }}>Accueil</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <Link href="/v2/catalogue" style={{ color: 'var(--ink-muted)' }}>Catalogue</Link>
        {product.categories[0] && (
          <>
            <span style={{ opacity: 0.4 }}>›</span>
            <Link href={`/v2/catalogue/${product.categories[0].slug}`} style={{ color: 'var(--ink-muted)' }}>
              {product.categories[0].name}
            </Link>
          </>
        )}
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </nav>

      {/* Configurator (image + variants + cart) */}
      <ProductConfigurator product={product} />

      {/* Description */}
      {product.description && (
        <div style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: '1px solid var(--border)',
          maxWidth: 720,
        }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18, fontWeight: 600, marginBottom: 16,
            letterSpacing: '-0.01em',
          }}>Description</h2>
          <p style={{
            fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.75,
            whiteSpace: 'pre-wrap',
          }}>{product.description}</p>
        </div>
      )}

      {/* Back link */}
      <div style={{ marginTop: 40 }}>
        <Link href="/v2/catalogue" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--ink-muted)',
          textDecoration: 'none',
          padding: '8px 14px',
          border: '1px solid var(--border)',
          borderRadius: 6,
          transition: 'border-color .15s, color .15s',
        }}>
          ← Retour au catalogue
        </Link>
      </div>
    </div>
  )
}
