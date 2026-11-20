import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Le Panneau",
}

export default function CGUPage() {
  return (
    <LegalPage title="Conditions Générales d'Utilisation">

      <Section title="Article 1 — Objet">
        <p>
          Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») définissent les conditions
          d'accès et d'utilisation du site <Placeholder label="URL_SITE" /> (ci-après « le Site »), exploité
          par <strong><Placeholder label="NOM_SOCIETE" /></strong>, <Placeholder label="FORME_JURIDIQUE" />,
          dont le siège est situé <Placeholder label="ADRESSE_SIEGE" /> (ci-après « Le Panneau »).
        </p>
        <p>
          Les CGU régissent l'utilisation du Site et de ses fonctionnalités (navigation, création de compte,
          upload de fichiers). Elles complètent les{' '}
          <a href="/cgv" style={{ color: 'var(--verde)' }}>CGV</a> qui régissent les transactions commerciales.
        </p>
        <p>
          L'accès au Site implique l'acceptation pleine et entière des présentes CGU. Elles peuvent être
          modifiées à tout moment ; les CGU applicables sont celles en vigueur lors de la navigation.
        </p>
      </Section>

      <Section title="Article 2 — Accès au site">
        <p>
          L'accès au Site est libre et gratuit. Le Panneau ne garantit pas une disponibilité permanente
          du Site et se réserve le droit d'interrompre l'accès à tout moment, notamment pour maintenance.
        </p>
        <p>
          L'utilisateur est responsable de son équipement informatique et de sa connexion Internet.
          Le Panneau ne saurait être tenu responsable des difficultés d'accès liées à l'équipement
          ou au fournisseur d'accès de l'utilisateur.
        </p>
      </Section>

      <Section title="Article 3 — Création de compte">
        <p>
          La création d'un compte client est <strong>optionnelle</strong> : il est possible de passer
          commande en tant qu'invité (guest checkout).
        </p>
        <p>Pour créer un compte, l'utilisateur doit :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>être majeur ou disposer de l'autorisation parentale ;</li>
          <li>fournir des informations exactes, complètes et à jour ;</li>
          <li>ne créer qu'un seul compte par personne.</li>
        </ul>
        <p>
          Les identifiants de connexion sont strictement personnels et confidentiels. L'utilisateur
          est seul responsable de leur conservation et de tout accès non autorisé à son compte.
          Les mots de passe sont hachés et ne sont jamais stockés en clair.
        </p>
        <p>
          L'utilisateur peut demander la suppression de son compte à tout moment à l'adresse{' '}
          <a href={`mailto:`} style={{ color: 'var(--verde)' }}><Placeholder label="EMAIL_CONTACT" /></a>.
          La suppression sera effective dans un délai de <Placeholder label="DELAI_SUPPRESSION — ex : 30 jours" />,
          sous réserve des obligations légales de conservation.
        </p>
      </Section>

      <Section title="Article 4 — Upload de fichiers de personnalisation">
        <p>
          L'utilisateur qui uploade des fichiers graphiques pour personnaliser ses produits{' '}
          <strong>garantit</strong> :
        </p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>être titulaire de tous les droits nécessaires (droits d'auteur, droit à l'image, marques) ;</li>
          <li>que les fichiers ne contiennent aucun contenu illicite (haineux, pornographique, contrefaisant) ;</li>
          <li>
            que les contenus respectent les réglementations applicables aux supports (mentions
            obligatoires sur panneaux publicitaires, réglementation affichage, etc.).
          </li>
        </ul>
        <p>
          Les fichiers uploadés sont utilisés exclusivement pour la fabrication de la commande. Ils sont
          conservés pendant <Placeholder label="DUREE_CONSERVATION_FICHIERS" /> après livraison, puis supprimés.
          Le Panneau ne dispose d'aucun droit sur ces contenus au-delà de cette finalité.
        </p>
        <p>
          Le Panneau se réserve le droit de refuser tout fichier contenant un contenu illicite, sans
          obligation de motivation. L'utilisateur en sera informé par email.
        </p>
        <p>
          L'utilisateur est seul responsable des contenus qu'il fournit et garantit Le Panneau contre
          tout recours ou réclamation de tiers découlant de leur utilisation.
        </p>
      </Section>

      <Section title="Article 5 — Comportements interdits">
        <p>Sont strictement interdits sur le Site :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>toute tentative d'accès non autorisé aux systèmes informatiques (piratage, injection) ;</li>
          <li>le scraping automatisé ou l'extraction massive de données ;</li>
          <li>l'usurpation d'identité ou l'utilisation frauduleuse d'un compte tiers ;</li>
          <li>la transmission de contenus illicites, diffamatoires ou portant atteinte aux droits de tiers ;</li>
          <li>toute utilisation du Site à des fins frauduleuses ou contraires à la réglementation.</li>
        </ul>
        <p>
          Le non-respect de ces interdictions peut entraîner la suspension ou suppression immédiate du
          compte et des poursuites judiciaires.
        </p>
      </Section>

      <Section title="Article 6 — Propriété intellectuelle">
        <p>
          Le Site, son code, ses textes, images, logos et structure sont la propriété de Le Panneau
          et protégés par le droit de la propriété intellectuelle. Toute reproduction sans accord
          préalable écrit est interdite.
        </p>
        <p>
          Les fichiers et contenus uploadés par l'utilisateur restent sa propriété exclusive.
          Le Panneau ne dispose que d'une licence limitée, non exclusive, pour la durée strictement
          nécessaire à la fabrication de la commande.
        </p>
      </Section>

      <Section title="Article 7 — Responsabilité">
        <p>
          Le Panneau ne saurait être tenu responsable des dommages indirects résultant de l'utilisation
          du Site : interruptions de service, erreurs de navigation, contenu de sites tiers liés.
        </p>
        <p>
          L'utilisateur utilise le Site sous sa propre responsabilité et reconnaît en avoir pris connaissance
          de son état, sans pouvoir rechercher la responsabilité de Le Panneau à ce titre.
        </p>
      </Section>

      <Section title="Article 8 — Modifications des CGU">
        <p>
          Le Panneau peut modifier les présentes CGU à tout moment. Les CGU applicables sont celles
          en vigueur lors de la navigation. En cas de modification substantielle, les titulaires d'un
          compte seront notifiés par email.
        </p>
        <p>
          La version en vigueur est consultable à tout moment à l'adresse{' '}
          <a href="/cgu" style={{ color: 'var(--verde)' }}><Placeholder label="URL_SITE" />/cgu</a>.
        </p>
      </Section>

      <Section title="Article 9 — Droit applicable">
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige, une résolution amiable
          sera recherchée en priorité. Le Client consommateur peut également recourir au médiateur de
          la consommation (voir{' '}
          <a href="/cgv" style={{ color: 'var(--verde)' }}>CGV article 10</a>).
        </p>
      </Section>

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>
        Dernière mise à jour : <Placeholder label="JJ/MM/AAAA" />
      </p>

    </LegalPage>
  )
}
