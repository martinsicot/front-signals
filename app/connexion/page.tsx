import { Suspense } from 'react'
import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Connexion — Le Panneau',
  description: 'Connectez-vous à votre espace client Le Panneau.',
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
