export const revalidate = 300

import { api } from '@/lib/api/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ProductConfigurator from '@/components/catalog/ProductConfigurator'

const BASE = 'https://www.le-panneau.fr'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await api.product(slug)
    return {
      title: product.meta_title || `${product.name} — Le Panneau`,
      description: product.meta_description || product.description || undefined,
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

  const minVariant = product.variants
    .filter(v => v.is_active && v.price_ht)
    .sort((a, b) => parseFloat(a.price_ht) - parseFloat(b.price_ht))[0]

  const productUrl = `${BASE}/produits/${product.slug}`
  const imageUrl = product.image
    ? product.image.startsWith('http') ? product.image : `${BASE}${product.image}`
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Catalogue', item: `${BASE}/catalogue` },
          ...(product.categories[0] ? [{
            '@type': 'ListItem',
            position: 2,
            name: product.categories[0].name,
            item: `${BASE}/catalogue/${product.categories[0].slug}`,
          }] : []),
          { '@type': 'ListItem', position: product.categories[0] ? 3 : 2, name: product.name, item: productUrl },
        ],
      },
      {
        '@type': 'Product',
        name: product.name,
        description: product.description || undefined,
        image: imageUrl ?? undefined,
        sku: product.base_code,
        brand: { '@type': 'Brand', name: 'Le Panneau' },
        offers: minVariant ? {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: parseFloat(minVariant.price_ht).toFixed(2),
          availability: 'https://schema.org/InStock',
          url: productUrl,
          priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        } : undefined,
      },
    ],
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
