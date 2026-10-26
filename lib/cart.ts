export interface CartItem {
  productId: number
  productName: string
  productSlug: string
  productImage: string | null
  variantId: number
  sku: string
  price: string // HT
  price_ttc: string // TTC, captured at add-to-cart time
  attributes: { name: string; display: string }[] // human-readable variant label
  quantity: number
}
