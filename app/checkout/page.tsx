import type { Metadata } from 'next'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Commande — Le Panneau',
  description: 'Renseignez votre adresse de livraison et réglez votre commande en toute sécurité.',
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
