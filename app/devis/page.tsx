import { Suspense } from 'react'
import type { Metadata } from 'next'
import DevisForm from './DevisForm'

export const metadata: Metadata = {
  title: 'Demander un devis — Strada',
  description: 'Envoyez-nous votre besoin et recevez un devis détaillé sous 24 heures.',
}

export default function DevisPage() {
  return (
    <Suspense fallback={null}>
      <DevisForm />
    </Suspense>
  )
}
