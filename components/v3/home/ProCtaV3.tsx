import Link from 'next/link'

export default function ProCtaV3() {
  return (
    <section style={{ maxWidth: 1360, margin: '0 auto', padding: '56px 24px 72px', boxSizing: 'border-box' }}>
      <div style={{ background: '#FFD400', padding: 48, display: 'flex', flexWrap: 'wrap', gap: '32px 56px', alignItems: 'center' }}>
        <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 14, fontWeight: 600 }}>
            05 — COLLECTIVITÉS &amp; PROFESSIONNELS
          </span>
          <h2 style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1.05 }}>
            Un compte pro pour commander comme vous travaillez.
          </h2>
        </div>
        <ul style={{ flex: '1 1 340px', listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 17, fontWeight: 600 }}>
          {[
            'Paiement par mandat administratif',
            'Devis PDF téléchargeable',
            'Tarifs dégressifs par quantité',
          ].map(item => (
            <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111315" strokeWidth="3" strokeLinecap="square" aria-hidden="true">
                <polyline points="4,12 10,18 20,6" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <Link href="/inscription" style={{
          display: 'inline-flex', alignItems: 'center',
          minHeight: 56, padding: '0 28px',
          background: '#111315', color: '#FFFFFF',
          fontWeight: 800, fontSize: 17,
          textDecoration: 'none', borderRadius: 2,
        }}>
          Ouvrir un compte pro
        </Link>
      </div>
    </section>
  )
}
