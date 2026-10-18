import Link from 'next/link'

const SHAPES = [
  {
    name: 'Triangle', desc: 'Danger', codes: 'A1 → A24',
    svg: <svg width="92" height="84" viewBox="0 0 100 92" aria-hidden="true"><polygon points="50,6 94,86 6,86" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" /></svg>,
  },
  {
    name: 'Triangle inversé', desc: 'Cédez le passage', codes: 'AB3a, AB3b',
    svg: <svg width="92" height="84" viewBox="0 0 100 92" aria-hidden="true"><polygon points="6,6 94,6 50,86" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" /></svg>,
  },
  {
    name: 'Rond', desc: 'Interdiction, obligation', codes: 'B1 → B56',
    svg: <svg width="88" height="88" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="#FFFFFF" strokeWidth="6" /></svg>,
  },
  {
    name: 'Octogone', desc: 'Stop', codes: 'AB4',
    svg: <svg width="88" height="88" viewBox="0 0 100 100" aria-hidden="true"><polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" /></svg>,
  },
  {
    name: 'Carré', desc: 'Indication, services', codes: 'C, CE',
    svg: <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true"><rect x="5" y="5" width="90" height="90" rx="6" fill="none" stroke="#FFFFFF" strokeWidth="6" /></svg>,
  },
  {
    name: 'Flèche', desc: 'Direction', codes: 'D21, D42',
    svg: <svg width="120" height="60" viewBox="0 0 120 60" aria-hidden="true"><polygon points="4,6 96,6 116,30 96,54 4,54" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" /></svg>,
  },
]

export default function ShapesV3() {
  return (
    <section style={{ background: '#111315', color: '#FFFFFF' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '56px 24px 64px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 14, color: '#FFD400' }}>
              01 — TROUVER PAR FORME
            </span>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: 40, lineHeight: 1.05 }}>
              Vous connaissez la forme ? On s'occupe du reste.
            </h2>
          </div>
          <Link href="#" className="v3-ul" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16 }}>
            Guide : choisir la bonne gamme
          </Link>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          borderTop: '1px solid #3A3E43', borderLeft: '1px solid #3A3E43',
        }}>
          {SHAPES.map(s => (
            <Link key={s.name} href="/v3/catalogue" className="v3-shape" style={{
              display: 'flex', flexDirection: 'column', gap: 18,
              padding: '28px 24px',
              borderRight: '1px solid #3A3E43', borderBottom: '1px solid #3A3E43',
              color: '#FFFFFF', textDecoration: 'none',
              minHeight: 220, boxSizing: 'border-box',
            }}>
              <div style={{ height: 96, display: 'flex', alignItems: 'center' }}>
                {s.svg}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontWeight: 800, fontSize: 20 }}>{s.name}</span>
                <span style={{ fontSize: 15, color: '#BFC3C8' }}>{s.desc}</span>
              </div>
              <span style={{
                marginTop: 'auto',
                fontFamily: 'var(--font-overpass-mono), monospace',
                fontSize: 13, color: '#FFD400',
              }}>{s.codes} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
