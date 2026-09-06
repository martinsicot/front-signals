'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/lib/cart'

/** Format a HT amount as "1 234,50 €", or "Sur devis" when not priced. */
function formatPrice(value: number): string {
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
      gridTemplateColumns: '72px 1fr auto',
      gap: 16, alignItems: 'center',
      padding: '16px 0', borderBottom: '1px solid var(--border)',
    }} className="cart-line">
      {/* Image */}
      <div style={{
        width: 72, height: 72, borderRadius: 8, overflow: 'hidden',
        background: 'var(--bg)', border: '1px solid var(--border)',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {item.productImage ? (
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            style={{ objectFit: 'contain', padding: 8 }}
            sizes="72px"
          />
        ) : (
          <svg viewBox="0 0 120 120" width={40} height={40} aria-hidden="true">
            <rect x={15} y={15} width={90} height={90} rx={8} fill="var(--surface-alt)" />
            <path d="M45 60h30M60 45v30" stroke="var(--border-strong)" strokeWidth={3} strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Info */}
      <div style={{ minWidth: 0 }}>
        <Link href={`/produits/${item.productSlug}`} style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          fontSize: 15, color: 'var(--ink)', display: 'block', marginBottom: 2,
        }}>{item.productName}</Link>
        {variantLabel(item) && (
          <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 2 }}>
            {variantLabel(item)}
          </p>
        )}
        <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
          Réf. {item.sku} · {formatPrice(unit)} HT / unité
        </p>
      </div>

      {/* Qty + total + remove */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden',
        }}>
          <button
            type="button"
            aria-label="Diminuer la quantité"
            onClick={() => updateQty(item.variantId, item.quantity - 1)}
            style={{ width: 32, height: 38, background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink)' }}
          >−</button>
          <span style={{ width: 36, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{item.quantity}</span>
          <button
            type="button"
            aria-label="Augmenter la quantité"
            onClick={() => updateQty(item.variantId, item.quantity + 1)}
            style={{ width: 32, height: 38, background: 'var(--surface)', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink)' }}
          >+</button>
        </div>

        <span style={{
          minWidth: 96, textAlign: 'right',
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--ink)',
        }}>{formatPrice(lineTotal)}</span>

        <button
          type="button"
          aria-label={`Retirer ${item.productName}`}
          onClick={() => removeItem(item.variantId)}
          style={{
            width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--r)', color: 'var(--ink-muted)',
            border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer',
          }}
        >
          <svg width={15} height={15} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 4h10M6.5 4V2.5h3V4M4.5 4l.7 9h5.6l.7-9" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '64px 24px' }}>
      <svg width={72} height={72} viewBox="0 0 16 16" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 20px' }} aria-hidden="true">
        <path d="M1 1h2.5l1.7 8h7.3l1.5-5H4.5" />
        <circle cx={7} cy={14} r={1} />
        <circle cx={12} cy={14} r={1} />
      </svg>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, marginBottom: 8, color: 'var(--ink)',
      }}>Votre panier est vide</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 24 }}>
        Parcourez notre catalogue pour ajouter des produits.
      </p>
      <Link href="/catalogue" style={{
        display: 'inline-block', padding: '12px 24px',
        background: 'var(--verde)', color: 'white',
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
        borderRadius: 'var(--r)', textDecoration: 'none',
      }}>
        Voir le catalogue
      </Link>
    </div>
  )
}

export default function CartPage() {
  const { items, totalItems, totalHT, clearCart } = useCart()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 28,
          letterSpacing: '-0.02em', color: 'var(--ink)',
        }}>
          Mon panier
          {totalItems > 0 && (
            <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--ink-muted)', marginLeft: 10 }}>
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </span>
          )}
        </h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            style={{
              fontSize: 13, color: 'var(--ink-muted)', background: 'transparent',
              border: 'none', cursor: 'pointer', textDecoration: 'underline',
            }}
          >
            Vider le panier
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div>
            {items.map(item => (
              <LineItem key={item.variantId} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div style={{
            marginTop: 24, padding: '20px 0', display: 'flex',
            flexDirection: 'column', alignItems: 'flex-end', gap: 16,
          }}>
            <div style={{ fontSize: 15, color: 'var(--ink-muted)' }}>
              Total HT{' '}
              <strong style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700,
                color: 'var(--ink)', marginLeft: 10,
              }}>{formatPrice(totalHT)}</strong>
            </div>
            <Link href="/devis" style={{
              padding: '14px 28px', background: 'var(--verde)', color: 'white',
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
              borderRadius: 'var(--r)', textDecoration: 'none',
            }}>
              Demander un devis
            </Link>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 640px) {
          .cart-line { grid-template-columns: 56px 1fr !important; }
          .cart-line > div:last-child {
            grid-column: 1 / -1;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </div>
  )
}
