import Link from 'next/link'

const features = [
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="var(--verde)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l1.8 3.7 4.2.6-3 2.9.7 4.1L10 11.4l-3.7 2 .7-4.1L4 6.3l4.2-.6L10 2z" />
      </svg>
    ),
    title: 'Fabrication directe',
    desc: 'Aucun intermédiaire. Le fabricant livre directement, avec un contrôle qualité rigoureux à chaque lot.',
  },
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="var(--verde)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x={2} y={4} width={16} height={14} rx={2} /><path d="M2 9h16M7 4V2M13 4V2" />
      </svg>
    ),
    title: '3 jours ouvrés',
    desc: 'De la validation de commande à l\'expédition : 3 jours. Sans minimum de commande pour les pièces en stock.',
  },
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="var(--verde)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" /><path d="M7 10l2 2 4-4" />
      </svg>
    ),
    title: 'Conformité garantie',
    desc: 'Tous les panneaux sont conformes NF EN 12899-1 et à l\'Instruction Interministérielle sur la Signalisation Routière.',
  },
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="var(--verde)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h5" /><path d="M14 14h4M16 12v4" />
      </svg>
    ),
    title: 'Devis groupés collectivités',
    desc: 'Tarifs dégressifs à partir de 10 unités. Facturation collectivité, BPU et bons de commande acceptés.',
  },
]

export default function WhyUsSection() {
  return (
    <section style={{ background: 'var(--ink)', padding: '72px 0', color: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start',
        }} className="why-inner">

          <div>
            <h2 style={{ fontSize: 32, letterSpacing: '-0.03em', color: 'var(--bg)', marginBottom: 16 }}>
              Pourquoi choisir Strada ?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(245,243,239,.55)', lineHeight: 1.65, marginBottom: 28 }}>
              Nous ne sommes pas un catalogue en ligne. Nous sommes le lien direct entre un fabricant européen de référence et ceux qui équipent la voie publique.
            </p>
            <Link href="#cta-devis" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '11px 20px', background: 'var(--bg)', color: 'var(--ink)',
              fontSize: 14, fontWeight: 600, borderRadius: 'var(--r)',
            }}>
              Nous contacter →
            </Link>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
          }} className="why-features">
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'rgba(245,243,239,.08)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {f.icon}
                </div>
                <h4 style={{ fontSize: 16, letterSpacing: '-0.01em', color: 'var(--bg)' }}>{f.title}</h4>
                <p style={{ fontSize: 13, color: 'rgba(245,243,239,.5)', lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-inner { grid-template-columns: 1fr !important; gap: 36px !important; }
          .why-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
