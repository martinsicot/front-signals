import type { Metadata } from 'next'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Mot de passe oublié — Strada',
  description: 'Réinitialisez le mot de passe de votre espace client Strada.',
}

export default function MotDePasseOubliePage() {
  return <ForgotPasswordForm />
}
