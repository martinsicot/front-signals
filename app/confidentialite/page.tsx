import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Le Panneau',
}

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité">

      <Section title="1. Responsable du traitement">
        <p>
          <strong><Placeholder label="NOM_SOCIETE" /></strong><br />
          <Placeholder label="ADRESSE_SIEGE" /><br />
          Email : <a href={`mailto:`} style={{ color: 'var(--verde)' }}><Placeholder label="EMAIL_RGPD" /></a>
        </p>
      </Section>

      <Section title="2. Données collectées et finalités">
        <p>Nous collectons uniquement les données nécessaires à l'exécution de nos services :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>
            <strong>Traitement d'une commande :</strong> nom, prénom, email, adresse de livraison et de
            facturation, téléphone (optionnel). Base légale : exécution du contrat (art. 6.1.b RGPD).
          </li>
          <li>
            <strong>Compte client :</strong> idem + mot de passe (haché, jamais stocké en clair), historique
            des commandes. Base légale : exécution du contrat.
          </li>
          <li>
            <strong>Emails transactionnels</strong> (confirmation commande, expédition) : email.
            Base légale : exécution du contrat.
          </li>
          <li>
            <strong>Fichiers de personnalisation</strong> (visuels uploadés) : utilisés exclusivement pour la
            fabrication. Base légale : exécution du contrat.
          </li>
          <li>
            <strong>Lutte contre la fraude :</strong> données de transaction. Base légale : intérêt légitime (art. 6.1.f).
          </li>
          <li>
            <strong>Obligations comptables et fiscales :</strong> données de facturation. Base légale : obligation
            légale (art. 6.1.c).
          </li>
          <li>
            <strong>Cookies techniques</strong> (session, panier, CSRF) : fonctionnement du site.
            Base légale : intérêt légitime.
          </li>
        </ul>
        <p>
          Les données bancaires ne transitent pas par nos serveurs et ne sont jamais stockées. Elles sont
          transmises directement à Stripe lors du paiement.
        </p>
      </Section>

      <Section title="3. Durées de conservation">
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>Données client et commande : <strong>3 ans</strong> à compter de la fin de la relation commerciale</li>
          <li>Données de facturation : <strong>10 ans</strong> (obligation comptable légale)</li>
          <li>Compte client inactif : <strong>3 ans</strong> après la dernière activité</li>
          <li>Fichiers de personnalisation uploadés : <strong><Placeholder label="DUREE_CONSERVATION_FICHIERS" /></strong> après livraison</li>
          <li>Cookies techniques : durée de la session ou <Placeholder label="DUREE_COOKIES — ex : 12 mois" /> maximum</li>
        </ul>
      </Section>

      <Section title="4. Sous-traitants et destinataires">
        <p>Vos données sont traitées par nos prestataires dans le cadre strict de leurs missions :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>
            <strong>Vercel Inc.</strong> (hébergement frontend) — États-Unis. Encadré par CCT
            Commission européenne. <strong>Hetzner Online GmbH</strong> (hébergement API) — Allemagne, UE.
          </li>
          <li>
            <strong>Stripe Payments Europe, Ltd.</strong> (paiement) — Irlande/États-Unis.
            Encadré par clauses contractuelles types (CCT) Commission européenne, Décision 2021/914.
            Certifié PCI-DSS niveau 1.
          </li>
          <li>
            <strong><Placeholder label="NOM_TRANSPORTEUR" /></strong> (livraison) —{' '}
            <Placeholder label="LOCALISATION_TRANSPORTEUR" />.
            Transmission limitée à : nom, adresse de livraison, téléphone.
          </li>
          <li>
            <strong><Placeholder label="NOM_SERVICE_EMAIL" /></strong> (emails transactionnels) —{' '}
            <Placeholder label="LOCALISATION_SERVICE_EMAIL" />.
            Encadrement : <Placeholder label="ENCADREMENT_JURIDIQUE_SERVICE_EMAIL" />.
          </li>
        </ul>
        <p>Aucune donnée n'est vendue ou cédée à des tiers à des fins commerciales.</p>
      </Section>

      <Section title="5. Transferts hors UE">
        <p>
          <strong>Hetzner</strong> (serveur API) est hébergé en Allemagne (UE) : aucun transfert hors UE.
        </p>
        <p>
          <strong>Vercel</strong> (hébergement frontend) et <strong>Stripe</strong> (paiement) sont
          susceptibles de traiter des données aux États-Unis. Ces transferts sont encadrés par les clauses
          contractuelles types de la Commission européenne (Décision 2021/914), conformément à l'article 46 du RGPD.
        </p>
      </Section>

      <Section title="6. Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li><strong>Accès :</strong> obtenir une copie de vos données</li>
          <li><strong>Rectification :</strong> corriger des données inexactes ou incomplètes</li>
          <li><strong>Effacement :</strong> demander la suppression (« droit à l'oubli »)</li>
          <li><strong>Limitation :</strong> restreindre temporairement le traitement</li>
          <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré</li>
          <li><strong>Opposition :</strong> vous opposer à un traitement basé sur l'intérêt légitime</li>
        </ul>
        <p>
          Pour exercer vos droits, contactez-nous :{' '}
          <a href={`mailto:`} style={{ color: 'var(--verde)' }}><Placeholder label="EMAIL_RGPD" /></a>.
          Réponse sous 30 jours. Vous pouvez également introduire une réclamation auprès de la{' '}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            CNIL
          </a>{' '}(3 place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07).
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li><strong>Session utilisateur</strong> — maintien de la connexion au compte client</li>
          <li><strong>Panier</strong> — sauvegarde du contenu du panier entre les pages</li>
          <li><strong>CSRF</strong> — protection contre les attaques de type cross-site request forgery</li>
        </ul>
        <p>
          Aucun cookie analytique, publicitaire ou de tracking tiers n'est déposé sans votre consentement explicite.
        </p>
      </Section>

      <Section title="8. Sécurité">
        <p>
          Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos
          données : chiffrement HTTPS/TLS sur toutes les pages, données bancaires traitées exclusivement par
          Stripe (PCI-DSS niveau 1), hébergement sur serveur dédié certifié ISO 27001 (Hetzner), accès aux
          données restreint au personnel autorisé.
        </p>
        <p>
          En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés,
          nous nous engageons à notifier la CNIL dans les 72 heures conformément à l'article 33 du RGPD.
        </p>
      </Section>

      <Section title="9. Modifications de la politique">
        <p>
          Nous pouvons modifier la présente politique à tout moment. En cas de modification substantielle,
          les titulaires d'un compte seront notifiés par email. La date de mise à jour est indiquée ci-dessous.
        </p>
      </Section>

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>
        Dernière mise à jour : <Placeholder label="JJ/MM/AAAA" />
      </p>

    </LegalPage>
  )
}
