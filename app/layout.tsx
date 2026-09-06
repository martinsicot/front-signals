import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Strada — Signalétique professionnelle',
  description: 'Panneaux de signalisation conformes NF EN 12899-1, mobilier urbain et équipements de sécurité. Livraison en 3 jours.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
