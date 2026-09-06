'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { CartItem } from '@/lib/cart'

const STORAGE_KEY = 'strada-cart'

interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, qty: number) => void
  removeItem: (variantId: number) => void
  updateQty: (variantId: number, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalHT: number
}

const CartContext = createContext<CartContextValue | null>(null)

/** Guard against malformed persisted data. */
function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.variantId === 'number' &&
    typeof v.productId === 'number' &&
    typeof v.price === 'string' &&
    typeof v.quantity === 'number' &&
    Array.isArray(v.attributes)
  )
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  // Avoid writing back the empty initial state before hydration reads storage.
  const [hydrated, setHydrated] = useState(false)

  // Read persisted cart on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: unknown = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setItems(parsed.filter(isCartItem))
        }
      }
    } catch {
      // Ignore corrupted or unavailable storage; start empty.
    }
    setHydrated(true)
  }, [])

  // Persist on every change (after initial hydration).
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore storage write failures (quota, private mode, etc.).
    }
  }, [items, hydrated])

  function addItem(item: Omit<CartItem, 'quantity'>, qty: number) {
    if (qty <= 0) return
    setItems(prev => {
      const existing = prev.find(i => i.variantId === item.variantId)
      if (existing) {
        return prev.map(i =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + qty }
            : i,
        )
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  function removeItem(variantId: number) {
    setItems(prev => prev.filter(i => i.variantId !== variantId))
  }

  function updateQty(variantId: number, qty: number) {
    setItems(prev =>
      qty <= 0
        ? prev.filter(i => i.variantId !== variantId)
        : prev.map(i => (i.variantId === variantId ? { ...i, quantity: qty } : i)),
    )
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const totalHT = useMemo(
    () =>
      items.reduce((sum, i) => {
        const price = parseFloat(i.price)
        return sum + (Number.isNaN(price) ? 0 : price * i.quantity)
      }, 0),
    [items],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      totalItems,
      totalHT,
    }),
    [items, totalItems, totalHT],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
