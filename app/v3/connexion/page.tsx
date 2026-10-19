import { Suspense } from 'react'
import type { Metadata } from 'next'
import LoginForm from '@/app/connexion/LoginForm'

export const metadata: Metadata = {
  title: 'Connexion — Le Panneau',
  description: 'Connectez-vous à votre espace client Le Panneau.',
}

export default function ConnexionV3Page() {
  return (
    <div style={{ padding: '48px 24px' }}>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
