'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/lib/cart'

function fmt(value: number): string {
  if (Number.isNaN(value)) return 'Sur devis'
  return `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
}

function variantLabel(item: CartItem): string {
  return item.attributes.map(a => a.display).join(' · ')
}

function LineItem({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCart()
  const unit = parseFloat(item.price)
  const lineTotal = Number.isNaN(unit) ? NaN : unit * item.quantity

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr auto',
      gap: 20, alignItems: 'start',
      padding: '20px 0', borderBottom: '1px solid #D6D7D9',
    }}>
      {/* Thumbnail */}
      <div style={{
        width: 80, height: 80, flexShrink: 0,
        background: '#F3F3F1', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {item.productImage ? (
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            style={{ objectFit: 'contain', padding: 8 }}
            sizes="80px"
          />
        ) : (
          <svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true">
            <polygon points="50,10 92,86 8,86" fill="#FFFFFF" stroke="#D52B1E" strokeWidth="9" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Link
          href={`/v3/produits/${item.productSlug}`}
          style={{ fontWeight: 800, fontSize: 18, color: '#111315', textDecoration: 'none', lineHeight: 1.2 }}
          className="v3-ul"
        >
          {item.productName}
        </Link>
        {variantLabel(item) && (
          <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>
            {variantLabel(item)}
          </span>
        )}
        <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>
          Réf. {item.sku} · {fmt(unit)} HT / unité
        </span>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #111315', height: 44, width: 'fit-content', marginTop: 8 }}>
          <button
            type="button"
            aria-label="Diminuer"
            onClick={() => updateQty(item.variantId, item.quantity - 1)}
            style={{ width: 44, height: 41, border: 0, background: 'none', fontFamily: 'inherit', fontSize: 20, color: '#111315', cursor: 'pointer' }}
          >−</button>
          <span style={{
            width: 44, textAlign: 'center', borderLeft: '1px solid #D6D7D9', borderRight: '1px solid #D6D7D9',
            fontFamily: 'var(--font-overpass-mono), monospace', fontWeight: 600, fontSize: 16, lineHeight: '41px',
          }}>{item.quantity}</span>
          <button
            type="button"
            aria-label="Augmenter"
            onClick={() => updateQty(item.variantId, item.quantity + 1)}
            style={{ width: 44, height: 41, border: 0, background: 'none', fontFamily: 'inherit', fontSize: 20, color: '#111315', cursor: 'pointer' }}
          >+</button>
        </div>
      </div>

      {/* Total + remove */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, paddingTop: 4 }}>
        <span style={{
          fontFamily: 'var(--font-overpass-mono), monospace',
          fontWeight: 600, fontSize: 18, color: '#111315',
        }}>{fmt(lineTotal)}</span>
        <button
          type="button"
          aria-label={`Retirer ${item.productName}`}
          onClick={() => removeItem(item.variantId)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: 0, background: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M3 4h10M6.5 4V2.5h3V4M4.5 4l.7 9h5.6l.7-9" />
          </svg>
          Retirer
        </button>
      </div>
    </div>
  )
}

function EmptyCart() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px', borderTop: '2px solid #111315' }}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#D6D7D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 24px' }} aria-hidden="true">
        <path d="M6 6h8l5.5 26h23l5-18H14" />
        <circle cx="24" cy="54" r="3" />
        <circle cx="42" cy="54" r="3" />
      </svg>
      <h2 style={{ margin: '0 0 8px', fontWeight: 900, fontSize: 28 }}>Votre panier est vide</h2>
      <p style={{ margin: '0 0 28px', color: '#565B61', fontSize: 17 }}>
        Parcourez le catalogue pour ajouter des produits.
      </p>
      <Link href="/v3/catalogue" style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        minHeight: 52, padding: '0 28px',
        background: '#111315', color: '#FFFFFF',
        fontWeight: 800, fontSize: 16,
        textDecoration: 'none', borderRadius: 2,
      }}>
        Parcourir le catalogue
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
          <line x1="4" y1="12" x2="19" y2="12" /><polyline points="13,6 19,12 13,18" />
        </svg>
      </Link>
    </div>
  )
}

export default function PanierV3Page() {
  const { items, totalItems, totalHT, clearCart } = useCart()

  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 80px', boxSizing: 'border-box' }}>

      {/* Heading */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 16, paddingBottom: 20, borderBottom: '2px solid #111315',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1 }}>Panier</h1>
          {totalItems > 0 && (
            <span style={{
              fontFamily: 'var(--font-overpass-mono), monospace',
              fontSize: 16, color: '#565B61',
            }}>
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            style={{
              border: 0, background: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61',
              textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            Vider le panier
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Line items */}
          <div>
            {items.map(item => (
              <LineItem key={item.variantId} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div style={{
            marginTop: 32, paddingTop: 24, borderTop: '2px solid #111315',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16,
          }}>

            {/* Devis block */}
            {totalHT > 400 && (
              <div style={{
                width: '100%', padding: '16px 20px',
                background: '#F3F3F1',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 16, flexWrap: 'wrap',
              }}>
                <p style={{ margin: 0, fontSize: 14, color: '#3A3E43', maxWidth: 400 }}>
                  Votre commande dépasse 400 € HT — vous pouvez demander un devis personnalisé pour un accompagnement sur-mesure.
                </p>
                <Link href="/v3/devis?from=panier" style={{
                  display: 'inline-flex', alignItems: 'center',
                  minHeight: 44, padding: '0 20px',
                  border: '1.5px solid #111315', borderRadius: 2,
                  color: '#111315', fontWeight: 700, fontSize: 14,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}>
                  Demander un devis
                </Link>
              </div>
            )}

            {/* Total */}
            <div style={{ fontSize: 16, color: '#565B61' }}>
              Total HT{' '}
              <span style={{
                fontFamily: 'var(--font-overpass-mono), monospace',
                fontWeight: 700, fontSize: 32, color: '#111315', marginLeft: 12,
              }}>
                {fmt(totalHT)}
              </span>
            </div>

            <Link href="/v3/checkout" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              minHeight: 56, padding: '0 32px',
              background: '#FFD400', color: '#111315',
              fontWeight: 800, fontSize: 17,
              textDecoration: 'none', borderRadius: 2,
            }}>
              Procéder au paiement
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
                <line x1="4" y1="12" x2="19" y2="12" /><polyline points="13,6 19,12 13,18" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
