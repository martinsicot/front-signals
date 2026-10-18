import Link from 'next/link'

export default function HeroV3() {
  return (
    <section style={{
      maxWidth: 1360, margin: '0 auto', padding: '0 24px',
      display: 'flex', flexWrap: 'wrap',
      borderBottom: '2px solid #111315', boxSizing: 'border-box',
    }}>
      {/* Left — text */}
      <div style={{
        flex: '999 1 560px', minWidth: 0,
        padding: '72px 48px 64px 0',
        display: 'flex', flexDirection: 'column', gap: 28,
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: 'var(--font-overpass-mono), monospace',
          fontSize: 14, fontWeight: 600, letterSpacing: 1,
        }}>PANNEAUX · POTEAUX · FIXATIONS</span>

        <h1 style={{
          margin: 0, fontWeight: 900, fontSize: 84,
          lineHeight: .95, letterSpacing: -2,
        }}>
          Le bon panneau,<br />du premier coup.
        </h1>

        <p style={{
          margin: 0, fontSize: 20, lineHeight: 1.5, color: '#3A3E43', maxWidth: 560,
        }}>
          Panneaux homologués configurés au millimètre — gamme, classe, poteau et fixations — et livrés prêts à poser.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/v3/catalogue" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            minHeight: 56, padding: '0 28px',
            background: '#111315', color: '#FFFFFF',
            fontWeight: 800, fontSize: 17,
            textDecoration: 'none', borderRadius: 2,
          }}>
            Parcourir le catalogue
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
              <line x1="4" y1="12" x2="19" y2="12" />
              <polyline points="13,6 19,12 13,18" />
            </svg>
          </Link>
          <Link href="/devis" style={{
            display: 'inline-flex', alignItems: 'center',
            minHeight: 56, padding: '0 28px',
            border: '2px solid #111315', color: '#111315',
            fontWeight: 800, fontSize: 17,
            textDecoration: 'none', borderRadius: 2, boxSizing: 'border-box',
          }}>
            Envoyer ma liste pour devis
          </Link>
        </div>
      </div>

      {/* Right — technical drawing on yellow */}
      <div style={{
        flex: '1 1 420px', minWidth: 0,
        background: '#FFD400',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 40, boxSizing: 'border-box', minHeight: 480,
      }} aria-hidden="true">
        <svg width="380" height="400" viewBox="0 0 190 200" role="img" aria-label="Plan coté d'un panneau de danger sur poteau">
          <g fill="none" stroke="#111315" strokeWidth="1" strokeDasharray="3 3">
            <line x1="20" y1="10" x2="20" y2="190" />
            <line x1="170" y1="10" x2="170" y2="190" />
          </g>
          <rect x="90" y="96" width="10" height="94" fill="#111315" />
          <polygon points="95,14 160,124 30,124" fill="#FFFFFF" stroke="#D52B1E" strokeWidth="10" strokeLinejoin="round" />
          <rect x="90" y="52" width="10" height="40" fill="#111315" />
          <rect x="90" y="100" width="10" height="10" fill="#111315" />
          <g stroke="#111315" strokeWidth="1.5">
            <line x1="30" y1="140" x2="160" y2="140" />
            <line x1="30" y1="134" x2="30" y2="146" />
            <line x1="160" y1="134" x2="160" y2="146" />
            <line x1="176" y1="124" x2="176" y2="190" />
            <line x1="171" y1="124" x2="181" y2="124" />
            <line x1="171" y1="190" x2="181" y2="190" />
          </g>
          <rect x="74" y="133" width="42" height="14" fill="#FFD400" />
          <text x="95" y="144" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="600" fill="#111315">1000</text>
          <text x="186" y="160" fontFamily="monospace" fontSize="9" fontWeight="600" fill="#111315" transform="rotate(-90 186 160)">2300</text>
        </svg>
      </div>
    </section>
  )
}
