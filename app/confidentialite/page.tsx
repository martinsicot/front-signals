import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Strada',
}

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité">

      <Section title="Responsable du traitement">
        <p>
          <strong><Placeholder label="RAISON SOCIALE" /></strong><br />
          <Placeholder label="ADRESSE COMPLÈTE" /><br />
          Email : <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>
        </p>
      </Section>

      <Section title="Données collectées et finalités">
        <p>Nous collectons uniquement les données nécessaires à la bonne exécution de nos services :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>
            <strong>Demande de devis :</strong> nom, société, email, téléphone, message.
            Finalité : traitement et réponse à la demande. Base légale : exécution d'un contrat (pré-contractuel).
          </li>
          <li>
            <strong>Commande :</strong> nom, adresse de livraison, email, articles commandés.
            Finalité : exécution de la commande et facturation. Base légale : exécution du contrat.
          </li>
          <li>
            <strong>Navigation :</strong> cookies techniques (panier, thème).
            Finalité : bon fonctionnement du site. Base légale : intérêt légitime.
          </li>
        </ul>
      </Section>

      <Section title="Durée de conservation">
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>Données de contact (devis non converti) : 3 ans à compter du dernier contact</li>
          <li>Données client (commande) : 3 ans à compter de la fin de la relation commerciale</li>
          <li>Données de facturation : 10 ans (obligation comptable légale)</li>
          <li>Cookies techniques : durée de la session ou jusqu'à suppression manuelle</li>
        </ul>
      </Section>

      <Section title="Destinataires des données">
        <p>Vos données sont traitées par nos prestataires techniques dans le cadre strict de leurs missions :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li><strong>Vercel Inc.</strong> — hébergement du site (États-Unis, Privacy Shield)</li>
          <li><strong>Stripe Inc.</strong> — traitement des paiements</li>
          <li><strong>Resend Inc.</strong> — envoi d'emails transactionnels</li>
        </ul>
        <p>Aucune donnée n'est vendue ou cédée à des tiers à des fins commerciales.</p>
      </Section>

      <Section title="Transferts hors UE">
        <p>
          Certains de nos prestataires (Vercel, Stripe, Resend) sont basés aux États-Unis.
          Ces transferts sont encadrés par des garanties appropriées (clauses contractuelles types
          de la Commission européenne ou mécanismes équivalents).
        </p>
      </Section>

      <Section title="Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li><strong>Accès :</strong> obtenir une copie de vos données</li>
          <li><strong>Rectification :</strong> corriger des données inexactes</li>
          <li><strong>Effacement :</strong> demander la suppression de vos données (« droit à l'oubli »)</li>
          <li><strong>Limitation :</strong> restreindre temporairement le traitement</li>
          <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré</li>
          <li><strong>Opposition :</strong> vous opposer à un traitement basé sur l'intérêt légitime</li>
        </ul>
        <p>
          Pour exercer vos droits, contactez-nous à{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>.
          Nous nous engageons à répondre dans un délai d'un mois.
        </p>
        <p>
          Vous avez également le droit d'introduire une réclamation auprès de la{' '}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            CNIL
          </a>.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Ce site n'utilise que des cookies strictement nécessaires à son fonctionnement :
        </p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li><strong>strada-cart</strong> — sauvegarde le contenu du panier (localStorage)</li>
          <li><strong>strada-theme</strong> — mémorise la préférence de thème clair/sombre (localStorage)</li>
        </ul>
        <p>
          Ces données sont stockées localement dans votre navigateur et ne sont pas transmises
          à nos serveurs. Vous pouvez les supprimer à tout moment via les paramètres de votre navigateur.
        </p>
      </Section>

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>
        Dernière mise à jour : <Placeholder label="JJ/MM/AAAA" />
      </p>

    </LegalPage>
  )
}
