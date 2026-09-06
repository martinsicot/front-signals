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
      title: product.meta_title || `${product.name} — Signals`,
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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: 28, fontSize: 13, color: 'var(--ink-muted)' }}>
        <Link href="/catalogue" style={{ color: 'var(--ink-muted)' }}>Catalogue</Link>
        {' › '}
        {product.categories[0] && (
          <>
            <Link href={`/catalogue/${product.categories[0].slug}`} style={{ color: 'var(--ink-muted)' }}>
              {product.categories[0].name}
            </Link>
            {' › '}
          </>
        )}
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </nav>

      <ProductConfigurator product={product} />
    </div>
  )
}
