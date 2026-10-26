'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import type { ProductDetail, Variant } from '@/lib/api/server'
import { useCart } from '@/context/CartContext'

interface Props { product: ProductDetail }

type AttrOption = { value: string; display: string }
type AttrGroup = { slug: string; name: string; options: AttrOption[] }

function attrValue(v: Variant, slug: string) {
  return v.attributes.find(a => a.attribute_slug === slug)?.value
}
function toSelection(v: Variant): Record<string, string> {
  const s: Record<string, string> = {}
  for (const a of v.attributes) s[a.attribute_slug] = a.value
  return s
}

export default function ProductDetailV3({ product }: Props) {
  const variants = useMemo(() => product.variants.filter(v => v.is_active), [product.variants])
  const hasVariants = variants.length > 0

  const groups = useMemo<AttrGroup[]>(() => {
    const order: string[] = []
    const byslug = new Map<string, { name: string; options: Map<string, string> }>()
    for (const v of variants) {
      for (const a of v.attributes) {
        if (!byslug.has(a.attribute_slug)) { byslug.set(a.attribute_slug, { name: a.attribute_name, options: new Map() }); order.push(a.attribute_slug) }
        byslug.get(a.attribute_slug)!.options.set(a.value, a.display)
      }
    }
    return order.map(slug => {
      const g = byslug.get(slug)!
      const options = [...g.options.entries()].map(([value, display]) => ({ value, display }))
      if (options.every(o => !Number.isNaN(Number(o.value)))) options.sort((a, b) => Number(a.value) - Number(b.value))
      return { slug, name: g.name, options }
    })
  }, [variants])

  const defaultVariant = useMemo(() => {
    const priced = variants.filter(v => !Number.isNaN(parseFloat(v.price)))
    const pool = priced.length ? priced : variants
    return pool.reduce<Variant | null>((best, v) => !best || parseFloat(v.price) < parseFloat(best.price) ? v : best, null)
  }, [variants])

  const [selected, setSelected] = useState<Record<string, string>>(() => defaultVariant ? toSelection(defaultVariant) : {})
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const matchingVariant = useMemo(() => {
    if (!hasVariants) return null
    return variants.find(v => groups.every(g => attrValue(v, g.slug) === selected[g.slug])) ?? null
  }, [variants, hasVariants, groups, selected])

  function isAvailable(slug: string, value: string) {
    return variants.some(v => attrValue(v, slug) === value && groups.every(g => g.slug === slug || attrValue(v, g.slug) === selected[g.slug]))
  }

  function choose(slug: string, value: string) {
    const exact = variants.find(v => attrValue(v, slug) === value && groups.every(g => g.slug === slug || attrValue(v, g.slug) === selected[g.slug]))
    if (exact) { setSelected(toSelection(exact)); return }
    const candidates = variants.filter(v => attrValue(v, slug) === value)
    if (!candidates.length) return
    let best = candidates[0]; let bestScore = -1
    for (const v of candidates) {
      const score = groups.reduce((n, g) => n + (attrValue(v, g.slug) === selected[g.slug] ? 1 : 0), 0)
      if (score > bestScore) { bestScore = score; best = v }
    }
    setSelected(toSelection(best))
  }

  function handleAdd() {
    if (!matchingVariant) return
    addItem({ productId: product.id, productName: product.name, productSlug: product.slug, productImage: product.image, variantId: matchingVariant.id, sku: matchingVariant.sku, price: matchingVariant.price_ht ?? matchingVariant.price ?? '', price_ttc: matchingVariant.price_ttc ?? '', attributes: matchingVariant.attributes.map(a => ({ name: a.attribute_name, display: a.display })) }, qty)
    setAdded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setAdded(false), 1500)
  }

  const priceTTC = matchingVariant && !Number.isNaN(parseFloat(matchingVariant.price_ttc ?? ''))
    ? parseFloat(matchingVariant.price_ttc).toFixed(2).replace('.', ',')
    : null
  const priceHT = matchingVariant && !Number.isNaN(parseFloat(matchingVariant.price_ht ?? ''))
    ? parseFloat(matchingVariant.price_ht).toFixed(2).replace('.', ',')
    : null

  const tierOf = qty >= 25 ? 4 : qty >= 10 ? 3 : qty >= 5 ? 2 : 1
  const tierBg = (n: number) => n === tierOf ? '#FFD400' : 'transparent'

  const recap = [
    { k: 'Produit', v: product.name },
    ...groups.map(g => ({ k: g.name, v: selected[g.slug] ?? '—' })),
    { k: 'Quantité', v: String(qty) },
  ]

  const stepStyle: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '12px 24px',
    padding: '20px 0', borderTop: '1px solid #D6D7D9',
  }
  const stepLabelStyle: React.CSSProperties = {
    flex: '0 0 140px', display: 'flex', flexDirection: 'column', gap: 2,
  }

  return (
    <section style={{ maxWidth: 1360, margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #111315' }}>

        {/* Left — image */}
        <div style={{
          flex: '1 1 520px', minWidth: 0,
          borderRight: '1px solid #D6D7D9',
          padding: '32px 32px 32px 0',
          display: 'flex', flexDirection: 'column', gap: 16,
          boxSizing: 'border-box',
        }}>
          <div style={{
            background: '#F3F3F1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, position: 'relative', aspectRatio: '4/3',
          }}>
            <span style={{
              position: 'absolute', top: 14, left: 16,
              fontFamily: 'var(--font-overpass-mono), monospace',
              fontSize: 12, color: '#565B61',
            }}>
              {product.base_code ? `REF. ${product.base_code}` : 'PHOTO PRODUIT'}
            </span>
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
              <svg width="200" height="200" viewBox="0 0 100 100" aria-hidden="true">
                <polygon points="50,10 92,86 8,86" fill="#FFFFFF" stroke="#D52B1E" strokeWidth="8" strokeLinejoin="round" />
                <text x="50" y="72" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="40" fill="#111315">!</text>
              </svg>
            )}
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 800, border: '1.5px solid #1F5BB5', color: '#1F5BB5', padding: '4px 10px', borderRadius: 2 }}>NF</span>
            <span style={{ fontSize: 13, fontWeight: 800, border: '1.5px solid #111315', padding: '4px 10px', borderRadius: 2 }}>CE</span>
            <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, fontWeight: 600, border: '1.5px solid #111315', padding: '4px 10px', borderRadius: 2 }}>NF EN 12899-1</span>
          </div>
        </div>

        {/* Right — configurator */}
        <div style={{
          flex: '1 1 480px', minWidth: 0,
          padding: '32px 0 32px 32px',
          display: 'flex', flexDirection: 'column',
          boxSizing: 'border-box',
        }}>
          {product.description && (
            <p style={{ margin: '0 0 24px', fontSize: 17, lineHeight: 1.55, color: '#3A3E43' }}>
              {product.description}
            </p>
          )}

          {/* Variant groups */}
          {groups.map((group, gi) => (
            <div key={group.slug} style={stepStyle}>
              <div style={stepLabelStyle}>
                <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <span style={{ fontWeight: 800, fontSize: 17 }}>{group.name}</span>
              </div>
              <div role="group" aria-label={group.name} style={{
                flex: '1 1 260px',
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(group.options.length, 4)}, minmax(0, 1fr))`,
                border: '1.5px solid #111315',
              }}>
                {group.options.map((opt, oi) => {
                  const active = selected[group.slug] === opt.value
                  const available = isAvailable(group.slug, opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => choose(group.slug, opt.value)}
                      aria-pressed={active}
                      style={{
                        minHeight: 60, border: 0,
                        borderRight: oi < group.options.length - 1 ? '1px solid #D6D7D9' : 0,
                        background: active ? '#111315' : '#FFFFFF',
                        color: active ? '#FFFFFF' : available ? '#111315' : '#9AA1A9',
                        fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
                        cursor: available || active ? 'pointer' : 'not-allowed',
                        opacity: available || active ? 1 : 0.5,
                      }}
                    >
                      {opt.display}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div style={stepStyle}>
            <div style={stepLabelStyle}>
              <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>
                {String(groups.length + 1).padStart(2, '0')}
              </span>
              <span style={{ fontWeight: 800, fontSize: 17 }}>Quantité</span>
            </div>
            <div style={{ flex: '1 1 260px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #111315', height: 52 }}>
                <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Diminuer" style={{ width: 52, height: 49, border: 0, background: 'none', fontFamily: 'inherit', fontSize: 22, color: '#111315', cursor: 'pointer' }}>−</button>
                <input readOnly value={qty} style={{ width: 52, height: 49, border: 0, borderLeft: '1px solid #D6D7D9', borderRight: '1px solid #D6D7D9', textAlign: 'center', fontFamily: 'var(--font-overpass-mono), monospace', fontWeight: 600, fontSize: 18, color: '#111315', background: 'transparent' }} />
                <button type="button" onClick={() => setQty(q => q + 1)} aria-label="Augmenter" style={{ width: 52, height: 49, border: 0, background: 'none', fontFamily: 'inherit', fontSize: 22, color: '#111315', cursor: 'pointer' }}>+</button>
              </div>
              <span style={{ fontSize: 14, color: '#565B61' }}>Tarif dégressif appliqué automatiquement.</span>
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: '#111315', color: '#FFFFFF', padding: 28, display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
            <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#BFC3C8' }}>RÉCAPITULATIF</span>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 14 }}>
              {recap.map(r => (
                <li key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px dashed #3A3E43', paddingBottom: 6 }}>
                  <span style={{ color: '#BFC3C8' }}>{r.k}</span>
                  <span>{r.v}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontWeight: 900, fontSize: 44, lineHeight: 1, color: '#FFD400' }}>
                  {priceTTC ? `${priceTTC} €` : 'Sur devis'} <span style={{ fontSize: 18 }}>TTC</span>
                </span>
                {priceHT && (
                  <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#BFC3C8' }}>
                    {priceHT} € HT
                  </span>
                )}
                {priceTTC && <span style={{ fontSize: 14, color: '#BFC3C8' }}>Expédition sous 3 jours ouvrés</span>}
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button
                type="button"
                onClick={handleAdd}
                disabled={hasVariants && !matchingVariant}
                aria-live="polite"
                style={{
                  flex: '2 1 200px', minHeight: 56, border: 0, borderRadius: 2,
                  background: added ? '#3A3E43' : '#FFD400',
                  color: '#111315', fontFamily: 'inherit',
                  fontWeight: 800, fontSize: 17, cursor: 'pointer',
                }}
              >
                {added ? 'Ajouté ✓' : 'Ajouter au panier'}
              </button>
              <button type="button" style={{
                flex: '1 1 160px', minHeight: 56,
                border: '1.5px solid #FFFFFF', borderRadius: 2,
                background: 'transparent', color: '#FFFFFF',
                fontFamily: 'inherit', fontWeight: 800, fontSize: 16, cursor: 'pointer',
              }}>
                Ajouter au devis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tech specs + tier pricing */}
      <div style={{ padding: '48px 0 0', display: 'flex', flexWrap: 'wrap', gap: 48 }}>
        {/* Specs */}
        <div style={{ flex: '3 1 520px', minWidth: 0 }}>
          <h2 style={{ margin: '0 0 16px', fontWeight: 800, fontSize: 28 }}>Fiche technique</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, borderTop: '2px solid #111315' }}>
            <tbody>
              {[
                { k: 'Catégorie', v: product.categories[0]?.name ?? '—' },
                { k: 'Type', v: product.type || '—' },
                { k: 'Référence', v: product.base_code || '—' },
              ].map(row => (
                <tr key={row.k} style={{ borderBottom: '1px solid #D6D7D9' }}>
                  <th scope="row" style={{ textAlign: 'left', padding: '12px 16px 12px 0', width: '40%', fontWeight: 600 }}>{row.k}</th>
                  <td style={{ padding: '12px 0', fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 15 }}>{row.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tier pricing */}
        <div style={{ flex: '2 1 340px', minWidth: 0 }}>
          <h2 style={{ margin: '0 0 16px', fontWeight: 800, fontSize: 28 }}>Tarif dégressif</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, borderTop: '2px solid #111315' }}>
            <thead>
              <tr style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61', textAlign: 'left' }}>
                <th scope="col" style={{ padding: '12px 0', fontWeight: 500 }}>QUANTITÉ</th>
                <th scope="col" style={{ padding: '12px 0', fontWeight: 500, textAlign: 'right' }}>PRIX UNITAIRE TTC</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 15 }}>
              {[
                { range: '1 – 4', tier: 1 },
                { range: '5 – 9', tier: 2 },
                { range: '10 – 24', tier: 3 },
                { range: '25 +', tier: 4 },
              ].map(row => (
                <tr key={row.tier} style={{ borderTop: '1px solid #D6D7D9', background: tierBg(row.tier) }}>
                  <td style={{ padding: '12px 8px' }}>{row.range}</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                    {row.tier === 4 ? 'Sur devis' : priceTTC ? `${priceTTC} €` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
