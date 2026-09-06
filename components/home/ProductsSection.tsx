import { api } from '@/lib/api/server'
import ProductsSectionClient from './ProductsSectionClient'

export default async function ProductsSection() {
  const [productsPage, categories] = await Promise.all([
    api.products(),
    api.categories(),
  ])

  return (
    <ProductsSectionClient
      products={productsPage.results.slice(0, 20)}
      categories={categories}
    />
  )
}
