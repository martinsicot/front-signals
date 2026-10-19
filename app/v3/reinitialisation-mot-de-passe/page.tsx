import { Suspense } from 'react'
import type { Metadata } from 'next'
import ResetPasswordForm from '@/app/reinitialisation-mot-de-passe/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe — Le Panneau',
  description: 'Définissez un nouveau mot de passe pour votre espace client Le Panneau.',
}

export default function ReinitialisationV3Page() {
  return (
    <div style={{ padding: '48px 24px' }}>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
