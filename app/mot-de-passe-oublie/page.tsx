import type { Metadata } from 'next'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Mot de passe oublié — Le Panneau',
  description: 'Réinitialisez le mot de passe de votre espace client Le Panneau.',
}

export default function MotDePasseOubliePage() {
  return <ForgotPasswordForm />
}
