import type { Metadata } from 'next'
import RegisterForm from '@/app/inscription/RegisterForm'

export const metadata: Metadata = {
  title: 'Créer un compte — Le Panneau',
  description: 'Créez votre espace client Le Panneau pour suivre vos commandes et vos devis.',
}

export default function InscriptionV3Page() {
  return (
    <div style={{ padding: '48px 24px' }}>
      <RegisterForm />
    </div>
  )
}
