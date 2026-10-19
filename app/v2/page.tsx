export const dynamic = 'force-dynamic'

import { api } from '@/lib/api/server'
import HeroV2 from '@/components/v2/home/HeroV2'
import SectorRowsV2 from '@/components/v2/home/SectorRowsV2'
import TrustBar from '@/components/home/TrustBar'
import CtaDevisSection from '@/components/home/CtaDevisSection'

export const metadata = {
  title: 'Le Panneau — Signalisation & mobilier urbain pour professionnels',
  description: 'Panneaux NF, mobilier urbain et équipements de sécurité. Livraison sous 3 jours ouvrés.',
}

export default async function LandingV2Page() {
  const categories = await api.categories()

  return (
    <>
      <HeroV2 />
      <TrustBar />
      <SectorRowsV2 categories={categories} />
      <CtaDevisSection />
    </>
  )
}
