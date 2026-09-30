import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Créer un compte — Strada',
  description: 'Créez votre espace client Strada pour suivre vos commandes et vos devis.',
}

export default function InscriptionPage() {
  return <RegisterForm />
}
