'use client'

import { useState } from 'react'

type Category = 'all' | 'signalisation' | 'mobilier' | 'securite'

const products = [
  {
    category: 'signalisation' as const,
    ref: 'B6 — Ø 60 cm',
    name: 'Panneau STOP',
    desc: 'Aluminium 2 mm, film rétroréfléchissant classe 2. Conforme IISR & NF EN 12899-1.',
    price: '28,50',
    badge: { label: 'En stock', type: 'stock' as const },
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <polygon points="24,4 56,4 76,24 76,56 56,76 24,76 4,56 4,24" fill="#d0291a" />
        <polygon points="27,8 53,8 72,27 72,53 53,72 27,72 8,53 8,27" fill="none" stroke="white" strokeWidth={2.5} />
        <text x={40} y={46} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={17} fill="white">STOP</text>
      </svg>
    ),
  },
  {
    category: 'signalisation' as const,
    ref: 'AB3a — h. 90 cm',
    name: 'Cédez le passage',
    desc: 'Triangle inversé, face blanche avec liseré rouge. Pied galvanisé inclus en option.',
    price: '22,00',
    badge: null,
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <polygon points="40,72 72,18 8,18" fill="white" stroke="#d0291a" strokeWidth={5} strokeLinejoin="round" />
        <polygon points="40,62 64,24 16,24" fill="none" stroke="#d0291a" strokeWidth={3} strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    category: 'signalisation' as const,
    ref: 'B14 — Ø 60 cm',
    name: 'Limitation de vitesse 30',
    desc: 'Zone 30, aluminium recyclé, film microprismatique haute visibilité.',
    price: '24,90',
    badge: { label: 'Nouveau', type: 'new' as const },
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <circle cx={40} cy={40} r={34} fill="white" stroke="#d0291a" strokeWidth={6} />
        <circle cx={40} cy={40} r={27} fill="none" stroke="#d0291a" strokeWidth={3} />
        <text x={40} y={50} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={26} fill="var(--ink)">30</text>
      </svg>
    ),
  },
  {
    category: 'signalisation' as const,
    ref: 'B1 — Ø 60 cm',
    name: 'Sens interdit',
    desc: 'Fond rouge, barre blanche. Aluminium 2 mm. Livré sans mât.',
    price: '19,90',
    badge: null,
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <circle cx={40} cy={40} r={34} fill="#d0291a" />
        <rect x={14} y={33} width={52} height={14} rx={2} fill="white" />
      </svg>
    ),
  },
  {
    category: 'signalisation' as const,
    ref: 'EB10 — 400×600 mm',
    name: 'Panneau de localisation de ville',
    desc: 'Nom personnalisable. Texte en film adhésif haute durabilité. Délai 5 jours.',
    price: '54,00',
    badge: null,
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <rect x={8} y={22} width={64} height={36} rx={2} fill="white" stroke="var(--border-strong)" strokeWidth={2} />
        <rect x={8} y={22} width={64} height={10} rx={2} fill="#1a4b8a" />
        <rect x={8} y={32} width={64} height={2} fill="#d0291a" />
        <text x={40} y={52} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={11} fill="var(--ink)">MONTROUGE</text>
      </svg>
    ),
  },
  {
    category: 'mobilier' as const,
    ref: 'MU-B120 — L. 1200 mm',
    name: 'Banc public collectivité',
    desc: 'Structure acier galvanisé, assise bois traité autoclave cl. 4. Fixation au sol incluse.',
    price: '295,00',
    badge: null,
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <rect x={10} y={44} width={60} height={8} rx={3} fill="var(--ink-muted)" />
        <rect x={14} y={52} width={6} height={20} rx={2} fill="var(--ink-muted)" />
        <rect x={60} y={52} width={6} height={20} rx={2} fill="var(--ink-muted)" />
        <rect x={12} y={30} width={10} height={14} rx={2} fill="var(--ink-muted)" />
        <rect x={58} y={30} width={10} height={14} rx={2} fill="var(--ink-muted)" />
        <rect x={15} y={36} width={50} height={8} rx={2} fill="var(--border-strong)" />
      </svg>
    ),
  },
  {
    category: 'mobilier' as const,
    ref: 'MU-C50 — 50 L',
    name: 'Corbeille de rue acier',
    desc: 'Capacité 50 L, acier thermolaqué RAL au choix, sac intérieur amovible.',
    price: '138,00',
    badge: null,
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <path d="M25 28 L28 65 L52 65 L55 28 Z" fill="var(--ink-muted)" />
        <rect x={20} y={22} width={40} height={6} rx={3} fill="var(--border-strong)" />
        <line x1={40} y1={28} x2={40} y2={65} stroke="var(--border)" strokeWidth={1.5} />
        <rect x={36} y={14} width={8} height={8} rx={2} fill="var(--border-strong)" />
      </svg>
    ),
  },
  {
    category: 'securite' as const,
    ref: 'SEC-D100 — H. 1000 mm',
    name: 'Délinéateur souple',
    desc: 'Polyuréthane flexible, bandes rétroréfléchissantes type 1. Résiste aux chocs et à l\'enneigement.',
    price: '18,50',
    badge: null,
    svg: (
      <svg viewBox="0 0 80 80" width={72} height={72}>
        <rect x={35} y={14} width={10} height={52} rx={5} fill="#f8b830" />
        <rect x={30} y={18} width={20} height={5} rx={2} fill="white" opacity={0.7} />
        <rect x={30} y={30} width={20} height={5} rx={2} fill="white" opacity={0.7} />
        <rect x={25} y={64} width={30} height={6} rx={3} fill="var(--border-strong)" />
      </svg>
    ),
  },
]

const filters: { label: string; value: Category }[] = [
  { label: 'Tous', value: 'all' },
  { label: 'Signalisation', value: 'signalisation' },
  { label: 'Mobilier urbain', value: 'mobilier' },
  { label: 'Sécurité & balisage', value: 'securite' },
]

export default function ProductsSection() {
  const [active, setActive] = useState<Category>('all')

  const visible = products.filter(p => active === 'all' || p.category === active)

  return (
    <section style={{ padding: '16px 0 72px' }} id="products">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p className="label" style={{ marginBottom: 6 }}>Catalogue</p>
            <h2 style={{ fontSize: 28, letterSpacing: '-0.02em' }}>Produits populaires</h2>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              style={{
                padding: '7px 14px',
                border: `1px solid ${active === f.value ? 'var(--ink)' : 'var(--border)'}`,
                borderRadius: 20,
                fontSize: 13, fontWeight: 500,
                color: active === f.value ? 'var(--bg)' : 'var(--ink-muted)',
                background: active === f.value ? 'var(--ink)' : 'transparent',
                transition: 'all .15s',
                cursor: 'pointer',
              }}
            >{f.label}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        }} className="product-grid">
          {visible.map((product, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              transition: 'box-shadow .2s, border-color .2s',
            }} className="product-card">

              {/* Image */}
              <div style={{
                aspectRatio: '1', background: 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid var(--border)',
                position: 'relative',
              }}>
                {product.svg}
                {product.badge && (
                  <span style={{
                    position: 'absolute', top: 10, left: 10,
                    padding: '3px 7px', borderRadius: 4,
                    fontSize: 10, fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    background: product.badge.type === 'new' ? 'var(--verde)' : 'var(--surface)',
                    color: product.badge.type === 'new' ? 'white' : 'var(--verde)',
                    border: product.badge.type === 'stock' ? '1px solid var(--verde-mid)' : 'none',
                  }}>{product.badge.label}</span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{
                  fontSize: 10, fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4,
                }}>{product.ref}</p>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14, fontWeight: 600, marginBottom: 4, letterSpacing: '-0.01em',
                }}>{product.name}</h3>
                <p style={{
                  fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.5, flex: 1, marginBottom: 14,
                }}>{product.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em',
                  }}>
                    {product.price} € <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--ink-muted)' }}>HT / unité</span>
                  </div>
                  <button aria-label="Ajouter au panier" style={{
                    width: 32, height: 32,
                    background: 'var(--verde-light)', color: 'var(--verde)',
                    borderRadius: 'var(--r)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 300, lineHeight: 1,
                    transition: 'background .15s, color .15s',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--verde)'
                      ;(e.currentTarget as HTMLElement).style.color = 'white'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--verde-light)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--verde)'
                    }}
                  >+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .product-card:hover { box-shadow: var(--shadow-md) !important; border-color: var(--border-strong) !important; }
        @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
