export const dynamic = 'force-dynamic'

import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import CategoriesSection from '@/components/home/CategoriesSection'
import ProductsSection from '@/components/home/ProductsSection'
import WhyUsSection from '@/components/home/WhyUsSection'
import CtaDevisSection from '@/components/home/CtaDevisSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <ProductsSection />
      <WhyUsSection />
      <CtaDevisSection />
    </>
  )
}
