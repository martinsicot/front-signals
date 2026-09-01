'use client'

import { useRouter } from 'next/navigation'

const categories = [
  {
    filter: 'signalisation',
    href: '/catalogue/signalisation',
    label: 'Panneaux de signalisation',
    description: "Obligation, interdiction, danger, indication — toutes les catégories réglementaires selon l'IISR français.",
    count: '+120 références',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="var(--verde)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="8.5,2 15.5,2 22,8.5 22,15.5 15.5,22 8.5,22 2,15.5 2,8.5" />
      </svg>
    ),
  },
  {
    filter: 'mobilier',
    href: '/catalogue/mobilier-urbain',
    label: 'Mobilier urbain',
    description: "Bancs, corbeilles, appuis-vélos, bornes et potelets — conçus pour durer en espace public.",
    count: '+80 références',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="var(--verde)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18v-8a2 2 0 012-2h12a2 2 0 012 2v8" /><path d="M2 18h20M7 10V8a1 1 0 011-1h8a1 1 0 011 1v2" />
      </svg>
    ),
  },
  {
    filter: 'securite',
    href: '/catalogue/securite-balisage',
    label: 'Sécurité & balisage',
    description: "Délinéateurs, glissières, barrières de chantier, cônes et dispositifs de balisage temporaire.",
    count: '+60 références',
    icon: (
      <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="var(--verde)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7L12 2z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

export default function CategoriesSection() {
  const router = useRouter()

  return (
    <section style={{ padding: '72px 0 56px' }} id="categories">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: 32,
        }}>
          <div>
            <p className="label" style={{ marginBottom: 6 }}>Nos gammes</p>
            <h2 style={{ fontSize: 28, letterSpacing: '-0.02em' }}>Tout l&apos;équipement de la voie publique</h2>
          </div>
          <a href="/catalogue" style={{ fontSize: 13, fontWeight: 500, color: 'var(--verde)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Voir tous les produits →
          </a>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
        }} className="cat-grid">
          {categories.map((cat, i) => (
            <div
              key={cat.filter}
              role="button"
              tabIndex={0}
              aria-label={`Voir ${cat.label}`}
              onClick={() => router.push(cat.href)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && router.push(cat.href)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 28,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 16,
                position: 'relative', overflow: 'hidden',
                transition: 'border-color .2s, box-shadow .2s, transform .2s',
              }}
              className="cat-card"
            >
              <div style={{
                width: 48, height: 48,
                background: 'var(--verde-light)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {cat.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 18, letterSpacing: '-0.02em', marginBottom: 4 }}>{cat.label}</h3>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.55 }}>{cat.description}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--verde)' }}>{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cat-card:hover {
          border-color: var(--verde-mid) !important;
          box-shadow: var(--shadow-md) !important;
          transform: translateY(-2px) !important;
        }
        @media (max-width: 768px) {
          .cat-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .cat-card { flex-direction: row !important; padding: 20px !important; }
        }
      `}</style>
    </section>
  )
}
