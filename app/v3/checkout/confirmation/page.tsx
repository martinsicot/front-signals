import { Suspense } from 'react'
import type { Metadata } from 'next'
import ConfirmationClient from '@/app/checkout/confirmation/ConfirmationClient'

export const metadata: Metadata = {
  title: 'Commande confirmée — Le Panneau',
  description: 'Merci pour votre commande. Retrouvez le récapitulatif et le délai de livraison estimé.',
}

export default function ConfirmationV3Page() {
  return (
    <Suspense fallback={null}>
      <ConfirmationClient />
    </Suspense>
  )
}
