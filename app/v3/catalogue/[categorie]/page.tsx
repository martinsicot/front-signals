export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api/server'
import ProductGridV3 from '@/components/v3/catalog/ProductGridV3'

type Props = { params: Promise<{ categorie: string }>; searchParams: Promise<{ type?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params
  const categories = await api.categories()
  const cat = categories.find(c => c.slug === categorie)
  if (!cat) return {}
  return {
    title: `${cat.name} — Le Panneau`,
    description: cat.meta_description || cat.description || `Panneaux ${cat.name} — configurez votre gamme, classe et poteau.`,
  }
}

export default async function CategorieV3Page({ params, searchParams }: Props) {
  const { categorie } = await params
  const { type: typeFilter } = await searchParams

  const [productsPage, categories] = await Promise.all([
    api.products({ category: categorie }),
    api.categories(),
  ])

  const cat = categories.find(c => c.slug === categorie)
  if (!cat) notFound()

  // Extraire les types uniques présents dans cette catégorie
  const typeSet = new Set<string>()
  for (const p of productsPage.results) {
    if (p.type) typeSet.add(p.type)
  }
  const availableTypes = [...typeSet].sort()

  const activeType = typeFilter && availableTypes.includes(typeFilter) ? typeFilter : undefined

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '20px 24px 0', boxSizing: 'border-box' }}>
        <nav aria-label="Fil d'Ariane" style={{
          fontFamily: 'var(--font-overpass-mono), monospace',
          fontSize: 13, color: '#565B61',
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        }}>
          <Link href="/v3" style={{ color: '#565B61' }}>STRADA</Link>
          <span aria-hidden="true">/</span>
          <Link href="/v3/catalogue" style={{ color: '#565B61' }}>CATALOGUE</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: '#111315', fontWeight: 600 }}>{cat.name.toUpperCase()}</span>
        </nav>
      </div>

      {/* Section heading */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 24px 0', boxSizing: 'border-box' }}>
        <div style={{ borderTop: '2px solid #111315', paddingTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <h1 style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1.05 }}>{cat.name}</h1>
          <span style={{
            fontFamily: 'var(--font-overpass-mono), monospace',
            fontSize: 15, color: '#565B61',
          }}>
            {productsPage.count} référence{productsPage.count > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Type tabs */}
      {availableTypes.length > 1 && (
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '20px 24px 0', boxSizing: 'border-box' }}>
          <nav aria-label="Filtrer par type" style={{ display: 'flex', flexWrap: 'wrap', gap: 0, borderBottom: '2px solid #111315' }}>
            <Link
              href={`/v3/catalogue/${categorie}`}
              aria-current={!activeType ? 'page' : undefined}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '12px 20px',
                fontFamily: 'var(--font-overpass-mono), monospace',
                fontWeight: 600, fontSize: 14,
                textDecoration: 'none',
                background: !activeType ? '#111315' : '#FFFFFF',
                color: !activeType ? '#FFFFFF' : '#111315',
                borderRight: '1px solid #D6D7D9',
              }}
            >
              Tous
            </Link>
            {availableTypes.map(t => (
              <Link
                key={t}
                href={`/v3/catalogue/${categorie}?type=${encodeURIComponent(t)}`}
                aria-current={activeType === t ? 'page' : undefined}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '12px 20px',
                  fontFamily: 'var(--font-overpass-mono), monospace',
                  fontWeight: 600, fontSize: 14,
                  textDecoration: 'none',
                  background: activeType === t ? '#111315' : '#FFFFFF',
                  color: activeType === t ? '#FFFFFF' : '#111315',
                  borderRight: '1px solid #D6D7D9',
                }}
              >
                {t}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <ProductGridV3
        initialProducts={productsPage.results}
        initialHasMore={productsPage.next !== null}
        category={categorie}
        typeFilter={activeType}
      />
    </>
  )
}
