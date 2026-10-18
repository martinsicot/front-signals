import type { ReactNode } from 'react'
import { Overpass, Overpass_Mono } from 'next/font/google'
import HeaderV3 from '@/components/v3/HeaderV3'
import FooterV3 from '@/components/v3/FooterV3'

const overpass = Overpass({ subsets: ['latin'], weight: ['400','500','600','700','800','900'], variable: '--font-overpass' })
const overpassMono = Overpass_Mono({ subsets: ['latin'], weight: ['500','600'], variable: '--font-overpass-mono' })

export default function V3Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${overpass.variable} ${overpassMono.variable}`}
      style={{
        fontFamily: 'var(--font-overpass), system-ui, sans-serif',
        color: '#111315',
        background: '#FFFFFF',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .v3 a { color: #111315; }
        .v3 a:hover { color: #000; }
        .v3-ul { text-decoration: none; }
        .v3-ul:hover { text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 2px; }
        .v3-tile { transition: background .12s ease; }
        .v3-tile:hover { background: #F3F3F1; }
        .v3-row:hover { background: #F3F3F1; }
        .v3-shape:hover { background: #26292D; }
      `}</style>
      <div className="v3">
        <HeaderV3 />
        <main>{children}</main>
        <FooterV3 />
      </div>
    </div>
  )
}
