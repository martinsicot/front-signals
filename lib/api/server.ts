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
  products: (params?: { category?: string; q?: string }) => {
    const qs = new URLSearchParams()
    if (params?.category) qs.set('category', params.category)
    if (params?.q) qs.set('q', params.q)
    const query = qs.toString() ? `?${qs}` : ''
    return apiFetch<ProductListItem[]>(`/products/${query}`)
  },
  product: (slug: string) => apiFetch<ProductDetail>(`/products/${slug}/`),
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  meta_title: string
  meta_description: string
}

export interface ProductListItem {
  id: number
  name: string
  slug: string
  category_name: string
  price: string
  image: string | null
  dimensions: string
  material: string
}

export interface ProductDetail {
  id: number
  name: string
  slug: string
  category: Category
  description: string
  price: string
  weight_kg: string | null
  dimensions: string
  material: string
  image: string | null
  meta_title: string
  meta_description: string
  created_at: string
}
