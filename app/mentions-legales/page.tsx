import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Mentions légales — Le Panneau',
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">

      <Section title="1. Éditeur du site">
        <p><strong>Dénomination sociale :</strong> <Placeholder label="NOM_SOCIETE" /></p>
        <p><strong>Forme juridique :</strong> <Placeholder label="FORME_JURIDIQUE" /></p>
        <p><strong>Capital social :</strong> <Placeholder label="MONTANT_CAPITAL" /> €</p>
        <p><strong>Siège social :</strong> <Placeholder label="ADRESSE_SIEGE" /></p>
        <p><strong>SIRET :</strong> <Placeholder label="SIRET" /></p>
        <p><strong>N° TVA intracommunautaire :</strong> <Placeholder label="NUMERO_TVA_INTRA" /></p>
        <p><strong>Directeur de la publication :</strong> <Placeholder label="NOM_DIRECTEUR_PUBLICATION" /></p>
        <p>
          <strong>Email :</strong>{' '}
          <a href={`mailto:`} style={{ color: 'var(--verde)' }}><Placeholder label="EMAIL_CONTACT" /></a>
        </p>
        <p><strong>Téléphone :</strong> <Placeholder label="TELEPHONE" /></p>
      </Section>

      <Section title="2. Hébergement">
        <p>
          Le site <Placeholder label="URL_SITE" /> est hébergé par <strong>Vercel Inc.</strong>,
          440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          Site :{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            vercel.com
          </a>
        </p>
        <p>
          Le serveur API est hébergé par <strong>Hetzner Online GmbH</strong>,
          Industriestr. 25, 91710 Gunzenhausen, Allemagne.
          Site :{' '}
          <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            www.hetzner.com
          </a>
        </p>
      </Section>

      <Section title="3. Propriété intellectuelle">
        <p>
          L'ensemble du contenu de ce site (textes, images, logos, structure, code) est la propriété exclusive
          de <Placeholder label="NOM_SOCIETE" /> ou de ses fournisseurs et est protégé par le droit français
          et international de la propriété intellectuelle. Toute reproduction, même partielle, est interdite
          sans autorisation préalable écrite.
        </p>
        <p>
          Les visuels et fichiers graphiques fournis par les clients pour la personnalisation des produits
          restent la propriété exclusive de ces derniers. Le Panneau ne dispose d'aucun droit sur ces contenus
          au-delà de la fabrication de la commande.
        </p>
      </Section>

      <Section title="4. Paiement en ligne">
        <p>
          Les paiements sont traités par <strong>Stripe Payments Europe, Ltd.</strong> (1 Grand Canal Street Lower,
          Grand Canal Dock, Dublin, D02 H210, Irlande), certifiée PCI-DSS niveau 1. Les coordonnées bancaires
          ne sont pas stockées sur les serveurs du Panneau.
        </p>
        <p>
          Pour plus d'informations sur les pratiques de Stripe :{' '}
          <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            stripe.com/fr/privacy
          </a>.
        </p>
      </Section>

      <Section title="5. Données personnelles et cookies">
        <p>
          Conformément au RGPD (UE 2016/679) et à la loi Informatique et Libertés,{' '}
          <Placeholder label="NOM_SOCIETE" /> est responsable du traitement des données personnelles
          collectées sur ce site.
        </p>
        <p>
          Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité
          et d'opposition. Pour les exercer : <Placeholder label="EMAIL_RGPD" />.
          Réclamation possible auprès de la{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>CNIL</a>.
        </p>
        <p>
          Pour le détail des traitements, consulter notre{' '}
          <a href="/confidentialite" style={{ color: 'var(--verde)' }}>Politique de confidentialité</a>.
        </p>
        <p>
          Ce site utilise uniquement des cookies techniques strictement nécessaires (session, panier, CSRF).
          Aucun cookie publicitaire ou de tracking n'est déposé sans consentement.
        </p>
      </Section>

      <Section title="6. Liens hypertextes">
        <p>
          Ce site peut contenir des liens vers des sites tiers. Le Panneau n'exerce aucun contrôle sur ces
          sites et décline toute responsabilité quant à leur contenu ou leurs pratiques.
        </p>
        <p>
          Toute création de lien vers le site est soumise à accord préalable écrit de l'éditeur.
        </p>
      </Section>

      <Section title="7. Médiation de la consommation">
        <p>
          Conformément aux articles L. 616-1 et R. 616-1 du Code de la consommation, le consommateur peut
          recourir gratuitement au service de médiation suivant :{' '}
          <strong><Placeholder label="NOM_MEDIATEUR" /></strong> —{' '}
          <Placeholder label="URL_MEDIATEUR" />.
        </p>
        <p>
          Plateforme européenne de règlement en ligne des litiges :{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            ec.europa.eu/consumers/odr
          </a>.
        </p>
      </Section>

      <Section title="8. Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit français. Tout litige relève de la
          compétence des tribunaux français.
        </p>
      </Section>

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>
        Dernière mise à jour : <Placeholder label="JJ/MM/AAAA" />
      </p>

    </LegalPage>
  )
}
