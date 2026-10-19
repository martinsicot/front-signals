export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api/server'
import ProductDetailV3 from '@/components/v3/product/ProductDetailV3'

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

export default async function ProduitV3Page({ params }: Props) {
  const { slug } = await params
  let product
  try {
    product = await api.product(slug)
  } catch {
    notFound()
  }

  const cat = product.categories[0] ?? null

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '20px 24px 0', boxSizing: 'border-box' }}>
        <nav aria-label="Fil d'Ariane" style={{
          fontFamily: 'var(--font-overpass-mono), monospace',
          fontSize: 13, color: '#565B61',
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        }}>
          <Link href="/v3" style={{ color: '#565B61' }}>LE PANNEAU</Link>
          <span aria-hidden="true">/</span>
          <Link href="/v3/catalogue" style={{ color: '#565B61' }}>CATALOGUE</Link>
          {cat && (
            <>
              <span aria-hidden="true">/</span>
              <Link href={`/v3/catalogue/${cat.slug}`} style={{ color: '#565B61' }}>{cat.name.toUpperCase()}</Link>
            </>
          )}
          <span aria-hidden="true">/</span>
          <span style={{ color: '#111315', fontWeight: 600 }}>{product.name.toUpperCase()}</span>
        </nav>
      </div>

      <ProductDetailV3 product={product} />
    </>
  )
}
