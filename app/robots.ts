import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.le-panneau.fr'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/panier',
          '/connexion',
          '/inscription',
          '/mon-compte',
          '/devis',
          '/commande',
          '/api/',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
