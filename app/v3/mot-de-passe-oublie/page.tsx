import type { Metadata } from 'next'
import ForgotPasswordForm from '@/app/mot-de-passe-oublie/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Mot de passe oublié — Strada',
  description: 'Réinitialisez le mot de passe de votre espace client Strada.',
}

export default function MotDePasseOublieV3Page() {
  return (
    <div style={{ padding: '48px 24px' }}>
      <ForgotPasswordForm />
    </div>
  )
}
