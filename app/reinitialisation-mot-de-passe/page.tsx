import { Suspense } from 'react'
import type { Metadata } from 'next'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe — Le Panneau',
  description: 'Définissez un nouveau mot de passe pour votre espace client Le Panneau.',
}

export default function ReinitialisationMotDePassePage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
