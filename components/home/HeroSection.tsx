import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{ padding: '72px 0 60px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: 48,
          alignItems: 'center',
        }} className="hero-inner">

          <div>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px 4px 6px',
              background: 'var(--verde-light)', borderRadius: 20, marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--verde)' }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--verde)' }}>
                Fabrication européenne · Délai 3 jours
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 58px)',
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              marginBottom: 18,
              maxWidth: 560,
            }}>
              La signalétique<br />professionnelle,<br />
              livrée <em style={{ fontStyle: 'normal', color: 'var(--verde)' }}>vite et bien.</em>
            </h1>

            <p style={{
              fontSize: 17, color: 'var(--ink-muted)',
              maxWidth: 440, marginBottom: 32, lineHeight: 1.65,
            }}>
              Panneaux conformes NF EN 12899-1, mobilier urbain et équipements de sécurité — directement du fabricant à votre chantier ou collectivité.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/catalogue" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '12px 24px', background: 'var(--verde)', color: 'white',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 15, fontWeight: 600, borderRadius: 'var(--r)',
                transition: 'background .15s',
              }}>
                Voir le catalogue
                <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </Link>

              <Link href="#cta-devis" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '12px 20px',
                border: '1px solid var(--border-strong)',
                color: 'var(--ink)', fontSize: 15, fontWeight: 500,
                borderRadius: 'var(--r)', transition: 'border-color .15s, color .15s',
              }}>
                Demander un devis groupé
              </Link>
            </div>
          </div>

          {/* Sign art SVG */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} aria-hidden="true" className="hero-art">
            <svg viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', maxWidth: 380, height: 'auto', filter: 'drop-shadow(0 12px 40px rgba(31,138,110,.15))' }}>
              <defs>
                <linearGradient id="gBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--verde-light)" />
                  <stop offset="100%" stopColor="var(--bg)" />
                </linearGradient>
              </defs>
              <polygon points="114,28 266,28 352,114 352,266 266,352 114,352 28,266 28,114"
                fill="url(#gBg)" stroke="var(--verde-mid)" strokeWidth={2} />
              <polygon points="126,52 254,52 328,126 328,254 254,328 126,328 52,254 52,126"
                fill="none" stroke="var(--verde)" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.4} />
              <text x={190} y={175} textAnchor="middle" dominantBaseline="central"
                fontFamily="'Space Grotesk', sans-serif" fontWeight={700} fontSize={72}
                letterSpacing={-3} fill="var(--verde)" opacity={0.9}>STOP</text>
              <text x={190} y={232} textAnchor="middle" dominantBaseline="central"
                fontFamily="'IBM Plex Sans', sans-serif" fontWeight={500} fontSize={12}
                letterSpacing={3.5} fill="var(--ink-muted)" opacity={0.6}>B6 · NF EN 12899-1</text>
              <circle cx={60} cy={60} r={4} fill="var(--verde)" opacity={0.3} />
              <circle cx={320} cy={60} r={4} fill="var(--verde)" opacity={0.3} />
              <circle cx={60} cy={320} r={4} fill="var(--verde)" opacity={0.3} />
              <circle cx={320} cy={320} r={4} fill="var(--verde)" opacity={0.3} />
              <g transform="translate(268 240) scale(.55)">
                <polygon points="60,10 110,95 10,95" fill="var(--surface)" stroke="var(--amber)" strokeWidth={5} strokeLinejoin="round" />
                <text x={60} y={82} textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
                  fontWeight={700} fontSize={38} fill="var(--amber)">!</text>
              </g>
              <g transform="translate(42 235) scale(.5)">
                <circle cx={60} cy={60} r={52} fill="var(--surface)" stroke="#d0291a" strokeWidth={9} />
                <circle cx={60} cy={60} r={41} fill="none" stroke="#d0291a" strokeWidth={3.5} />
                <text x={60} y={77} textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
                  fontWeight={700} fontSize={42} fill="var(--ink)">30</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner { grid-template-columns: 1fr !important; }
          .hero-art { display: none !important; }
        }
      `}</style>
    </section>
  )
}
