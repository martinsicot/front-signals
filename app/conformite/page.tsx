import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Conformité & normes — Le Panneau',
  description: 'Informations sur la conformité réglementaire et les normes applicables aux produits Le Panneau.',
}

export default function ConformitePage() {
  return (
    <LegalPage title="Conformité & normes">

      <Section title="Réglementation française">
        <p>
          La signalisation routière en France est régie par l'<strong>Instruction Interministérielle sur
          la Signalisation Routière (IISR)</strong> et ses arrêtés d'application.
        </p>
        <p>
          Tous nos panneaux sont conformes aux prescriptions de l'IISR en vigueur au moment de leur
          commercialisation.
        </p>
      </Section>

      <Section title="Normes européennes">
        <p>
          Nos produits sont fabriqués conformément à la norme <strong>NF EN 12899-1</strong> (panneaux
          de signalisation verticale permanente) et marqués <strong>CE</strong>.
        </p>
        <p>
          <Placeholder label="COMPLÉTER — autres normes applicables selon gamme (ex. NF EN 13422 pour cônes, NF P 98-520 pour barrières)" />
        </p>
      </Section>

      <Section title="Classes de rétroréflexion">
        <p>
          Sauf mention contraire, nos panneaux sont équipés de films rétroréfléchissants de
          classe <strong><Placeholder label="RA1 / RA2 / RA3" /></strong>.
        </p>
        <p>
          <Placeholder label="PRÉCISER — quelles gammes sont en RA1 vs RA2, et usage recommandé" />
        </p>
      </Section>

      <Section title="Responsabilité de pose">
        <p>
          La conformité de la signalisation sur la voie publique relève de la responsabilité du
          gestionnaire de voirie (commune, département, État). Le Panneau fournit des produits conformes
          aux normes en vigueur, mais ne peut se substituer à l'autorisation préalable de pose délivrée
          par l'autorité compétente.
        </p>
      </Section>

      <Section title="Documents disponibles">
        <p>
          Les déclarations de performance (DoP) et fiches techniques sont disponibles sur demande à{' '}
          <a href="mailto:contact@le-panneau.fr" style={{ color: 'var(--verde)' }}>
            contact@le-panneau.fr
          </a>.
        </p>
      </Section>

    </LegalPage>
  )
}
