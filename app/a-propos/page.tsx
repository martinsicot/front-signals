import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'À propos — Strada',
}

export default function AProposPage() {
  return (
    <LegalPage title="À propos de Strada" category="Notre entreprise">

      <Section title="Qui sommes-nous ?">
        <p>
          Strada est un distributeur spécialisé en signalisation routière, mobilier urbain
          et équipements de sécurité. Fondée par des professionnels du secteur, notre mission
          est de fournir des produits conformes aux normes françaises et européennes, à des
          prix compétitifs, avec un service adapté aux exigences des marchés publics et privés.
        </p>
        <p>
          Nous nous adressons aux collectivités territoriales, aux entreprises du BTP,
          aux gestionnaires de voirie et aux particuliers souhaitant équiper leurs espaces
          avec des produits de qualité homologués.
        </p>
      </Section>

      <Section title="Notre histoire">
        <p>
          <Placeholder label="À compléter — exemple : fondée en XXXX, présence dans X régions…" />
        </p>
      </Section>

      <Section title="Nos valeurs">
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong>Conformité :</strong> tous nos produits respectent les normes NF EN 12899-1 et les directives européennes CE en vigueur.</li>
          <li><strong>Réactivité :</strong> réponse sous 24 heures ouvrées pour les demandes de devis et les questions techniques.</li>
          <li><strong>Transparence :</strong> prix clairs, fiches techniques détaillées, aucun frais caché.</li>
          <li><strong>Proximité :</strong> une équipe disponible pour accompagner les projets, des appels d'offres aux commandes ponctuelles.</li>
        </ul>
      </Section>

      <Section title="Marchés servis">
        <p>Strada intervient sur l'ensemble des segments liés à l'aménagement et à la sécurisation de l'espace public :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>Collectivités locales (mairies, communautés de communes, départements)</li>
          <li>Entreprises du BTP et de travaux publics</li>
          <li>Gestionnaires de parkings et de zones industrielles</li>
          <li>Sociétés d'autoroutes et concessionnaires</li>
          <li>Particuliers et syndics de copropriété</li>
        </ul>
      </Section>

      <Section title="Zone géographique">
        <p>
          Strada livre sur l'ensemble de la <strong>France métropolitaine</strong>.
          Les expéditions vers les DOM-TOM et l'Europe font l'objet d'un devis personnalisé.
          Contactez-nous à{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>
            devis@strada-signal.fr
          </a>{' '}
          pour toute demande spécifique.
        </p>
      </Section>

      <Section title="Contact">
        <p><strong>Email :</strong>{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>
        </p>
        <p><strong>Téléphone :</strong> <Placeholder label="+33 X XX XX XX XX" /></p>
        <p><strong>Adresse :</strong> <Placeholder label="ADRESSE COMPLÈTE" /></p>
      </Section>

    </LegalPage>
  )
}
