export interface CartItem {
  productId: number
  productName: string
  productSlug: string
  productImage: string | null
  variantId: number
  sku: string
  price: string // HT, kept as string to match backend
  attributes: { name: string; display: string }[] // human-readable variant label
  quantity: number
}
