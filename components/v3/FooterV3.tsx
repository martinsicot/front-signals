import Link from 'next/link'

export default function FooterV3() {
  return (
    <footer style={{ borderTop: '6px solid #111315', background: '#FFFFFF' }}>
      <div style={{
        maxWidth: 1360, margin: '0 auto', padding: '48px 24px 24px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 32,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontWeight: 900, fontSize: 24, letterSpacing: 2 }}>LE PANNEAU</span>
          <span style={{ fontSize: 15, lineHeight: 1.5, color: '#3A3E43' }}>
            Panneaux, poteaux et fixations de signalisation routière.
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
          <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>CATALOGUE</span>
          <Link href="/v3/catalogue" className="v3-ul">Panneaux de police</Link>
          <Link href="/v3/catalogue" className="v3-ul">Chantier</Link>
          <Link href="/v3/catalogue" className="v3-ul">Poteaux &amp; fixations</Link>
          <Link href="/v3/catalogue" className="v3-ul">Balisage</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
          <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>AIDE</span>
          <Link href="#" className="v3-ul">Choisir sa gamme</Link>
          <Link href="#" className="v3-ul">Livraison</Link>
          <Link href="#" className="v3-ul">FAQ</Link>
          <Link href="/cgv" className="v3-ul">CGV</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
          <span style={{ fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61' }}>CONTACT</span>
          <span>+33 (0)4 XX XX XX XX</span>
          <span>contact@le-panneau.fr</span>
          <Link href="/devis" className="v3-ul">Demander un devis</Link>
        </div>
      </div>
      <div style={{
        maxWidth: 1360, margin: '0 auto', padding: '16px 24px 32px',
        fontFamily: 'var(--font-overpass-mono), monospace', fontSize: 13, color: '#565B61',
      }}>
        © LE PANNEAU · MENTIONS LÉGALES · CONFIDENTIALITÉ
      </div>
    </footer>
  )
}
