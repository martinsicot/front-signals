export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import CategoriesSection from '@/components/home/CategoriesSection'
import ProductsSection from '@/components/home/ProductsSection'
import WhyUsSection from '@/components/home/WhyUsSection'
import CtaDevisSection from '@/components/home/CtaDevisSection'

const BASE = 'https://www.le-panneau.fr'

export const metadata: Metadata = {
  title: 'Le Panneau — Panneaux de signalisation routière conformes NF EN 12899-1',
  description: 'Achetez vos panneaux de signalisation routière homologués : danger, obligation, direction, balisage. Prix publics affichés, conformité NF EN 12899-1 garantie, expédition sous 3 jours ouvrés.',
  alternates: { canonical: BASE },
  openGraph: {
    title: 'Le Panneau — Signalisation routière conforme NF EN 12899-1',
    description: 'Panneaux homologués pour collectivités et professionnels. Prix affichés sans devis, expédition 3 jours ouvrés.',
    url: BASE,
    siteName: 'Le Panneau',
    locale: 'fr_FR',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'Le Panneau',
      url: BASE,
      email: 'contact@le-panneau.fr',
      description: 'Vente en ligne de panneaux de signalisation routière conformes NF EN 12899-1 pour collectivités et professionnels.',
      areaServed: 'FR',
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'Le Panneau',
      publisher: { '@id': `${BASE}/#organization` },
      inLanguage: 'fr-FR',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/catalogue?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <ProductsSection />
      <WhyUsSection />
      <CtaDevisSection />
    </>
  )
}
