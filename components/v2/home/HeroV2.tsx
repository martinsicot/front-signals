import Link from 'next/link'

export default function HeroV2() {
  return (
    <section style={{
      background: 'var(--ink)',
      color: 'white',
      padding: '64px 24px 56px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px 4px 8px',
          background: 'rgba(255,255,255,.08)',
          borderRadius: 20,
          marginBottom: 20,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--verde)' }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,.7)' }}>
            Fabrication européenne · Expédition 3 jours ouvrés
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 5vw, 46px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.12,
          marginBottom: 16,
          color: 'white',
        }}>
          Signalisation & mobilier urbain<br />
          <span style={{ color: 'var(--verde)' }}>pour professionnels</span>
        </h1>

        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,.6)',
          lineHeight: 1.6, marginBottom: 32,
          maxWidth: 480, margin: '0 auto 32px',
        }}>
          Panneaux NF, mobilier urbain, équipements de sécurité — directement du fabricant à votre chantier.
        </p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/v2/catalogue" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '13px 28px',
            background: 'var(--verde)',
            color: 'white',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15, fontWeight: 600,
            borderRadius: 6,
            textDecoration: 'none',
            transition: 'background .15s',
          }}>
            Voir le catalogue
            <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={13} height={13}>
              <path d="M3 8h10M8 3l5 5-5 5" />
            </svg>
          </Link>

          <Link href="/devis" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '13px 24px',
            border: '1px solid rgba(255,255,255,.2)',
            color: 'rgba(255,255,255,.85)',
            fontSize: 15, fontWeight: 500,
            borderRadius: 6,
            textDecoration: 'none',
          }}>
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  )
}
