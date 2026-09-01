export default function CtaDevisSection() {
  return (
    <section id="cta-devis" style={{
      padding: '72px 0',
      background: 'var(--verde-light)',
      borderTop: '1px solid var(--verde-mid)',
      borderBottom: '1px solid var(--verde-mid)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 40, flexWrap: 'wrap',
        }}>
          <div>
            <h2 style={{ fontSize: 28, letterSpacing: '-0.02em', marginBottom: 10, maxWidth: 480 }}>
              Vous équipez une commune, un chantier ou un site privé ?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', maxWidth: 460 }}>
              Envoyez-nous votre liste de besoins — quantités, références ou simple description. Nous vous répondons avec un devis détaillé sous 24 heures.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
            <a href="mailto:devis@strada-signal.fr" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '12px 24px', background: 'var(--verde)', color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15, fontWeight: 600, borderRadius: 'var(--r)',
            }}>
              Demander un devis gratuit
              <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </a>

            <a href="tel:+33XXXXXXXXX" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '12px 20px',
              border: '1px solid var(--border-strong)',
              background: 'var(--surface)',
              color: 'var(--ink)', fontSize: 15, fontWeight: 500,
              borderRadius: 'var(--r)',
            }}>
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 10.3l-2.7-2.7a.9.9 0 00-1.3 0l-1.1 1.1a8.7 8.7 0 01-3.6-3.6L5.4 4a.9.9 0 000-1.3L2.7 1A.9.9 0 001.4 1L1 1.4C-.3 2.7 1 6 4.5 9.5S11.3 14.3 12.6 13l.4-.4a.9.9 0 000-1.3z" />
              </svg>
              Appeler
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
