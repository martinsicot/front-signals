import type { Metadata } from 'next'
import './globals.css'
import ConditionalShell from '@/components/layout/ConditionalShell'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Le Panneau — Signalétique professionnelle',
  description: 'Panneaux de signalisation conformes NF EN 12899-1, mobilier urbain et équipements de sécurité. Livraison en 3 jours.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <ConditionalShell>{children}</ConditionalShell>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
