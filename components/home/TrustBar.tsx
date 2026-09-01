const items = [
  {
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="var(--verde)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x={1} y={3} width={14} height={11} rx={1.5} /><path d="M1 7h14M5 3V1M11 3V1" />
      </svg>
    ),
    text: <span><strong>Livraison en 3 jours</strong> ouvrés</span>,
  },
  {
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="var(--verde)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 1l1.8 3.7L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1L2 5.4l4.2-.7L8 1z" />
      </svg>
    ),
    text: <span><strong>Conformes NF EN 12899-1</strong> · Classe 2</span>,
  },
  {
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="var(--verde)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z" /><path d="M5 8l2 2 4-4" />
      </svg>
    ),
    text: <span><strong>Fabrication européenne</strong> · UE</span>,
  },
  {
    icon: (
      <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="var(--verde)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 8a6 6 0 01-6 6M2 8a6 6 0 016-6M8 14v1M8 1v1" /><path d="M5 11H3a1 1 0 01-1-1V8" /><path d="M11 5h2a1 1 0 011 1v2" />
      </svg>
    ),
    text: <span>Devis <strong>gratuit sous 24h</strong></span>,
  },
]

export default function TrustBar() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '14px 0',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap',
      }} className="trust-inner">
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 28px', fontSize: 13, fontWeight: 500,
            color: 'var(--ink-muted)',
            borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
          }} className="trust-item">
            {item.icon}
            {item.text}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .trust-inner { flex-direction: column !important; }
          .trust-item { border-left: none !important; border-top: 1px solid var(--border); width: 100%; justify-content: center; padding: 6px 16px !important; }
          .trust-item:first-child { border-top: none; }
        }
      `}</style>
    </div>
  )
}
