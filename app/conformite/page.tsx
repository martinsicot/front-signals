import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Conformité & normes — Strada',
}

export default function ConformitePage() {
  return (
    <LegalPage title="Conformité & normes" category="Qualité & réglementation">

      <Section title="Notre engagement qualité">
        <p>
          Strada s'engage à ne proposer que des produits conformes aux réglementations françaises
          et européennes en vigueur. La conformité normative est une exigence non négociable,
          particulièrement dans le cadre des marchés publics et des appels d'offres.
        </p>
      </Section>

      <Section title="Norme NF EN 12899-1">
        <p>
          La norme <strong>NF EN 12899-1</strong> est la référence européenne pour les panneaux
          de signalisation routière permanente. Elle définit :
        </p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>Les exigences de performance des matériaux réfléchissants</li>
          <li>Les classes de résistance au vent (WL : Working Load)</li>
          <li>Les niveaux de durabilité et de résistance aux intempéries</li>
          <li>Les dimensions et tolérances des panneaux</li>
        </ul>
        <p>
          Tous les panneaux Strada répondent à cette norme et sont accompagnés des fiches
          techniques correspondantes.
        </p>
      </Section>

      <Section title="Marquage CE">
        <p>
          Le marquage <strong>CE</strong> atteste de la conformité des produits aux exigences
          essentielles des directives européennes applicables. Il est obligatoire pour la mise
          sur le marché de la plupart des équipements de signalisation et de sécurité routière
          au sein de l'Union européenne.
        </p>
        <p>
          Les produits marqués CE dans notre catalogue sont accompagnés de leur{' '}
          <strong>Déclaration de Performance (DoP)</strong>, disponible sur demande.
        </p>
      </Section>

      <Section title="Classes de rétroréflexion">
        <p>
          La rétroréflexion est la propriété des films réfléchissants à renvoyer la lumière
          vers sa source (phares de véhicule). Les classes définies par la norme EN 12899-1 sont :
        </p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>
            <strong>Classe RA1</strong> (film de classe 1) — usage courant en milieu urbain,
            visibilité correcte en conditions normales. Film prismatique de base ou microprismatique.
          </li>
          <li>
            <strong>Classe RA2</strong> (film de classe 2) — haute performance, recommandé
            pour les voies rapides, routes nationales et axes à forte circulation.
            Rétroréflexion jusqu'à 3 à 5 fois supérieure au RA1.
          </li>
        </ul>
        <p>
          La classe requise est précisée dans les CCTP des marchés publics. Strada propose
          les deux gammes ; la classe est indiquée sur chaque fiche produit.
        </p>
      </Section>

      <Section title="Certifications">
        <p>
          <Placeholder label="À compléter si certifications spécifiques : ISO 9001, NF, labels qualité…" />
        </p>
      </Section>

      <Section title="Acheteurs publics — appels d'offres">
        <p>
          Strada est habitué à répondre aux exigences des procédures de marchés publics.
          Sur demande, nous fournissons :
        </p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>Fiches techniques et fiches de données de sécurité (FDS)</li>
          <li>Déclarations de Performance (DoP) pour les produits marqués CE</li>
          <li>Attestations de conformité aux normes NF EN 12899-1</li>
          <li>Références et certificats de tests si disponibles</li>
        </ul>
        <p>
          Pour toute demande dans le cadre d'un appel d'offres, contactez-nous à{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>.
        </p>
      </Section>

      <Section title="Questions sur la conformité">
        <p>
          Notre équipe technique est disponible pour vous accompagner dans le choix
          des produits adaptés à vos exigences réglementaires.
          N'hésitez pas à nous contacter pour toute question sur la conformité d'un produit.
        </p>
      </Section>

    </LegalPage>
  )
}
