'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import type { ProductDetail, Variant } from '@/lib/api/server'
import { useCart } from '@/context/CartContext'

interface Props {
  product: ProductDetail
}

type AttrOption = { value: string; display: string }
type AttrGroup = { slug: string; name: string; options: AttrOption[] }

/** Read the value of a given attribute slug on a variant (or undefined). */
function attrValue(variant: Variant, slug: string): string | undefined {
  return variant.attributes.find(a => a.attribute_slug === slug)?.value
}

/** Turn a variant's attributes into a { slug: value } map. */
function toSelection(variant: Variant): Record<string, string> {
  const sel: Record<string, string> = {}
  for (const a of variant.attributes) sel[a.attribute_slug] = a.value
  return sel
}

function OptionGroup({
  group,
  selected,
  isAvailable,
  onSelect,
}: {
  group: AttrGroup
  selected: string
  isAvailable: (value: string) => boolean
  onSelect: (value: string) => void
}) {
  if (group.options.length === 0) return null
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{
        fontSize: 13, fontWeight: 600, marginBottom: 10,
        color: 'var(--ink)', letterSpacing: '0.01em',
      }}>{group.name}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {group.options.map(opt => {
          const active = selected === opt.value
          const available = isAvailable(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              aria-pressed={active}
              title={!available && !active ? 'Indisponible avec la sélection actuelle' : undefined}
              style={{
                padding: '7px 14px',
                borderRadius: 6,
                border: active ? '2px solid var(--verde)' : '1px solid var(--border)',
                background: active ? 'var(--verde-light)' : 'var(--surface)',
                color: active ? 'var(--verde)' : available ? 'var(--ink)' : 'var(--ink-muted)',
                opacity: available || active ? 1 : 0.45,
                textDecoration: available || active ? 'none' : 'line-through',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13, fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {opt.display}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ProductConfigurator({ product }: Props) {
  // Only sellable variants participate in selection.
  const variants = useMemo(
    () => product.variants.filter(v => v.is_active),
    [product.variants],
  )
  const hasVariants = variants.length > 0

  // Build ordered attribute groups from the order attributes first appear in.
  const groups = useMemo<AttrGroup[]>(() => {
    const order: string[] = []
    const byslug = new Map<string, { name: string; options: Map<string, string> }>()
    for (const v of variants) {
      for (const a of v.attributes) {
        if (!byslug.has(a.attribute_slug)) {
          byslug.set(a.attribute_slug, { name: a.attribute_name, options: new Map() })
          order.push(a.attribute_slug)
        }
        byslug.get(a.attribute_slug)!.options.set(a.value, a.display)
      }
    }
    return order.map(slug => {
      const g = byslug.get(slug)!
      const options = [...g.options.entries()].map(([value, display]) => ({ value, display }))
      // Sort numerically when every value is a number, otherwise keep first-seen order.
      if (options.every(o => o.value.trim() !== '' && !Number.isNaN(Number(o.value)))) {
        options.sort((a, b) => Number(a.value) - Number(b.value))
      }
      return { slug, name: g.name, options }
    })
  }, [variants])

  // Default to the cheapest active variant (prefer variants that have a price).
  const defaultVariant = useMemo(() => {
    const priced = variants.filter(v => v.price != null && !Number.isNaN(parseFloat(v.price)))
    const pool = priced.length > 0 ? priced : variants
    return pool.reduce<Variant | null>((cheapest, v) => {
      if (!cheapest) return v
      return parseFloat(v.price) < parseFloat(cheapest.price) ? v : cheapest
    }, null)
  }, [variants])

  const [selected, setSelected] = useState<Record<string, string>>(
    () => (defaultVariant ? toSelection(defaultVariant) : {}),
  )
  const [qty, setQty] = useState(1)

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current)
  }, [])

  const matchingVariant = useMemo(() => {
    if (!hasVariants) return null
    return variants.find(v =>
      groups.every(g => attrValue(v, g.slug) === selected[g.slug]),
    ) ?? null
  }, [variants, hasVariants, groups, selected])

  // Is `value` for `slug` reachable given the current selection of the OTHER attributes?
  function isAvailable(slug: string, value: string): boolean {
    return variants.some(v =>
      attrValue(v, slug) === value &&
      groups.every(g => g.slug === slug || attrValue(v, g.slug) === selected[g.slug]),
    )
  }

  /**
   * Pick an option. If the resulting combination is invalid, adopt the whole
   * attribute set of the closest matching variant (auto-correct).
   */
  function choose(slug: string, value: string) {
    const exact = variants.find(v =>
      attrValue(v, slug) === value &&
      groups.every(g => g.slug === slug || attrValue(v, g.slug) === selected[g.slug]),
    )
    if (exact) {
      setSelected(toSelection(exact))
      return
    }
    const candidates = variants.filter(v => attrValue(v, slug) === value)
    if (candidates.length === 0) return
    let best = candidates[0]
    let bestScore = -1
    for (const v of candidates) {
      const score = groups.reduce(
        (n, g) => n + (attrValue(v, g.slug) === selected[g.slug] ? 1 : 0),
        0,
      )
      if (score > bestScore) {
        bestScore = score
        best = v
      }
    }
    setSelected(toSelection(best))
  }

  function handleAdd() {
    if (!matchingVariant) return
    addItem(
      {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.image,
        variantId: matchingVariant.id,
        sku: matchingVariant.sku,
        price: matchingVariant.price ?? '',
        attributes: matchingVariant.attributes.map(a => ({
          name: a.attribute_name,
          display: a.display,
        })),
      },
      qty,
    )
    setAdded(true)
    if (addedTimer.current) clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="product-detail-grid">

      {/* Image */}
      <div style={{
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: 12, aspectRatio: '1', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain', padding: 32 }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <svg viewBox="0 0 120 120" width={120} height={120} aria-hidden="true">
            <rect x={15} y={15} width={90} height={90} rx={8} fill="var(--surface-alt)" />
            <path d="M45 60h30M60 45v30" stroke="var(--border-strong)" strokeWidth={3} strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Right column */}
      <div>
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--verde)', marginBottom: 6,
        }}>{product.category.name}</p>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 28, letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1.15,
        }}>{product.name}</h1>

        {product.base_code && (
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 16 }}>
            Réf. {product.base_code}
          </p>
        )}

        {/* Price */}
        <div style={{
          fontSize: 34, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '-0.02em', marginBottom: 24, color: 'var(--ink)',
        }}>
          {matchingVariant && matchingVariant.price != null && !Number.isNaN(parseFloat(matchingVariant.price))
            ? `${parseFloat(matchingVariant.price).toFixed(2).replace('.', ',')} €`
            : 'Sur devis'}
          <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--ink-muted)', marginLeft: 8 }}>HT / unité</span>
        </div>

        {/* Options */}
        {hasVariants ? (
          <>
            {groups.map(group => (
              <OptionGroup
                key={group.slug}
                group={group}
                selected={selected[group.slug] ?? ''}
                isAvailable={value => isAvailable(group.slug, value)}
                onSelect={value => choose(group.slug, value)}
              />
            ))}

            {!matchingVariant && (
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16 }}>
                Cette combinaison n&apos;est pas disponible.
              </p>
            )}
          </>
        ) : (
          product.description && (
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: 24 }}>
              {product.description}
            </p>
          )
        )}

        {/* Specs row (selected variant) */}
        {matchingVariant && (
          <div style={{
            display: 'flex', gap: 16, flexWrap: 'wrap',
            borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            padding: '12px 0', marginBottom: 20,
          }}>
            <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
              <strong style={{ color: 'var(--ink)' }}>Référence :</strong> {matchingVariant.sku}
            </span>
            {matchingVariant.weight_kg && (
              <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                <strong style={{ color: 'var(--ink)' }}>Poids :</strong>{' '}
                {parseFloat(matchingVariant.weight_kg).toString().replace('.', ',')} kg
              </span>
            )}
          </div>
        )}

        {/* Delivery */}
        <div style={{
          background: 'var(--verde-light)', border: '1px solid var(--verde-mid)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 20,
          fontSize: 13, color: 'var(--verde)', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width={15} height={15} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 3h10v8H1zM11 6h3l2 2v3h-5V6z" /><circle cx="4" cy="12" r="1.2" /><circle cx="13" cy="12" r="1.2" />
          </svg>
          Livraison en <strong style={{ marginLeft: 4 }}>3–5 jours ouvrés</strong>
        </div>

        {/* Quantity + CTA */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden',
          }}>
            <button
              type="button"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ width: 36, height: 44, background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink)' }}
            >−</button>
            <span style={{ width: 40, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{qty}</span>
            <button
              type="button"
              onClick={() => setQty(q => q + 1)}
              style={{ width: 36, height: 44, background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink)' }}
            >+</button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={hasVariants && !matchingVariant}
            aria-live="polite"
            style={{
              flex: 1, padding: '13px 20px',
              background: hasVariants && !matchingVariant
                ? 'var(--border)'
                : added ? 'var(--ink)' : 'var(--verde)',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15, fontWeight: 600, borderRadius: 'var(--r)',
              border: 'none', cursor: hasVariants && !matchingVariant ? 'not-allowed' : 'pointer',
              transition: 'background .15s',
            }}
          >
            {added ? 'Ajouté ✓' : 'Ajouter au panier'}
          </button>
        </div>

        <a href="/devis" style={{
          display: 'block', textAlign: 'center',
          padding: '12px 20px',
          border: '1px solid var(--border-strong)',
          color: 'var(--ink)', fontSize: 14, fontWeight: 500,
          borderRadius: 'var(--r)', textDecoration: 'none',
        }}>
          Demander un devis groupé
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </div>
  )
}
