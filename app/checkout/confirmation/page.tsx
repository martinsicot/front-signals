import { Suspense } from 'react'
import type { Metadata } from 'next'
import ConfirmationClient from './ConfirmationClient'

export const metadata: Metadata = {
  title: 'Commande confirmée — Le Panneau',
  description: 'Merci pour votre commande. Retrouvez le récapitulatif et le délai de livraison estimé.',
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationClient />
    </Suspense>
  )
}
