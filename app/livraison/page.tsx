import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Livraison — Le Panneau',
  description: 'Informations sur les délais et frais de livraison de vos commandes Le Panneau.',
}

export default function LivraisonPage() {
  return (
    <LegalPage title="Livraison">

      <Section title="Délais de traitement">
        <p>
          Les commandes sont préparées et expédiées sous <strong>3 jours ouvrés</strong> après confirmation
          du paiement.
        </p>
        <p>
          <Placeholder label="PRÉCISER — délais spécifiques pour produits configurables ou sur devis" />
        </p>
      </Section>

      <Section title="Modes de livraison">
        <p><strong>Transporteur :</strong> <Placeholder label="NOM TRANSPORTEUR (ex. Chronopost, DHL, GLS)" /></p>
        <p><strong>Délai de livraison :</strong> <Placeholder label="ex. 24–48h après expédition" /></p>
        <p>Un email de suivi avec numéro de tracking vous est envoyé dès l'expédition.</p>
      </Section>

      <Section title="Frais de livraison">
        <p>
          Les frais de livraison sont calculés au moment de la commande en fonction du poids et de la
          destination.
        </p>
        <p><Placeholder label="TABLEAU DE FRAIS — ex. gratuit > X€, sinon X€ forfait" /></p>
      </Section>

      <Section title="Zone de livraison">
        <p>Nous livrons en <strong>France métropolitaine</strong>.</p>
        <p>
          Pour la Corse, les DOM-TOM ou l'étranger, contactez-nous à{' '}
          <a href="mailto:contact@le-panneau.fr" style={{ color: 'var(--verde)' }}>
            contact@le-panneau.fr
          </a>.
        </p>
      </Section>

      <Section title="Livraison endommagée ou manquante">
        <p>
          En cas de colis endommagé ou de livraison incomplète, signalez-le sous <strong>48h</strong> à{' '}
          <a href="mailto:contact@le-panneau.fr" style={{ color: 'var(--verde)' }}>
            contact@le-panneau.fr
          </a>{' '}
          avec photos à l'appui.
        </p>
      </Section>

    </LegalPage>
  )
}
