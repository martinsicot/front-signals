import type { MetadataRoute } from 'next'
import { api } from '@/lib/api/server'

const BASE = 'https://www.le-panneau.fr'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/catalogue`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/conformite`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/livraison`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]

  try {
    const [categories, firstPage] = await Promise.all([
      api.categories(),
      api.products({ page: 1 }),
    ])

    const categoryUrls: MetadataRoute.Sitemap = categories.map(cat => ({
      url: `${BASE}/catalogue/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }))

    // Fetch all product pages
    const totalPages = Math.ceil(firstPage.count / 24)
    const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)

    const extraPages = await Promise.all(
      pageNumbers.map(p => api.products({ page: p }))
    )

    const allProducts = [
      ...firstPage.results,
      ...extraPages.flatMap(p => p.results),
    ]

    const productUrls: MetadataRoute.Sitemap = allProducts
      .filter(p => p.is_active)
      .map(p => ({
        url: `${BASE}/produits/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

    return [...staticPages, ...categoryUrls, ...productUrls]
  } catch {
    return staticPages
  }
}
