import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Créer un compte — Le Panneau',
  description: 'Créez votre espace client Le Panneau pour suivre vos commandes et vos devis.',
}

export default function InscriptionPage() {
  return <RegisterForm />
}
