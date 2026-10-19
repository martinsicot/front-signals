export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { api } from '@/lib/api/server'
import HeroV3 from '@/components/v3/home/HeroV3'
import ShapesV3 from '@/components/v3/home/ShapesV3'
import CatalogSectionsV3 from '@/components/v3/home/CatalogSectionsV3'
import ProCtaV3 from '@/components/v3/home/ProCtaV3'

export const metadata: Metadata = {
  title: 'Le Panneau — Panneaux de signalisation routière',
  description: 'Panneaux homologués NF, poteaux et fixations configurés au millimètre — gamme, classe, poteau — livrés prêts à poser.',
}

export default async function HomeV3() {
  const categories = await api.categories()

  return (
    <>
      <HeroV3 />
      <ShapesV3 />
      <CatalogSectionsV3 categories={categories} />
      <ProCtaV3 />
    </>
  )
}
