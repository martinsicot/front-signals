const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

export const api = {
  categories: () => apiFetch<Category[]>('/categories/'),
  products: (params?: { category?: string; q?: string; page?: number }) => {
    const qs = new URLSearchParams()
    if (params?.category) qs.set('category', params.category)
    if (params?.q) qs.set('q', params.q)
    if (params?.page) qs.set('page', String(params.page))
    const query = qs.toString() ? `?${qs}` : ''
    return apiFetch<PaginatedResponse<ProductListItem>>(`/products/${query}`)
  },
  product: (slug: string) => apiFetch<ProductDetail>(`/products/${slug}/`),
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  meta_title: string
  meta_description: string
}

export interface CategoryRef {
  id: number
  name: string
  slug: string
}

export interface ProductListItem {
  id: number
  name: string
  slug: string
  base_code: string
  type: string
  categories: CategoryRef[]
  image: string | null
  thumbnail: string | null
  min_price: string
  is_active: boolean
}

export interface VariantAttribute {
  id: number
  attribute_slug: string
  attribute_name: string
  value: string
  display: string
}

export interface Variant {
  id: number
  sku: string
  price: string
  weight_kg: string | null
  is_active: boolean
  attributes: VariantAttribute[]
}

export interface ProductDetail {
  id: number
  name: string
  slug: string
  base_code: string
  type: string
  categories: Category[]
  description: string
  image: string | null
  is_active: boolean
  meta_title: string
  meta_description: string
  variants: Variant[]
}
