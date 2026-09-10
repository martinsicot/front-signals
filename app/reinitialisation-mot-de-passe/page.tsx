import { Suspense } from 'react'
import type { Metadata } from 'next'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe — Strada',
  description: 'Définissez un nouveau mot de passe pour votre espace client Strada.',
}

export default function ReinitialisationMotDePassePage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
