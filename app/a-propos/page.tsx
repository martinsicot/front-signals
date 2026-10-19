import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'À propos — Strada',
  description: 'Découvrez Strada, spécialiste de la signalisation routière pour les particuliers, artisans et collectivités.',
}

export default function AProposPage() {
  return (
    <LegalPage title="À propos de Strada">

      <Section title="Notre histoire">
        <p>
          <Placeholder label="TEXTE DE PRÉSENTATION — qui sommes-nous, d'où vient le projet" />
        </p>
      </Section>

      <Section title="Notre mission">
        <p>
          Strada simplifie l'accès à la signalisation routière conforme aux normes françaises et européennes,
          pour les <strong>particuliers</strong>, les <strong>artisans du bâtiment</strong> et les <strong>collectivités</strong>.
        </p>
        <p>
          <Placeholder label="COMPLÉTER — promesse différenciante, positionnement vs concurrence" />
        </p>
      </Section>

      <Section title="Nos produits">
        <p>
          Nous proposons une gamme complète de panneaux de signalisation, de mobilier urbain et d'équipements
          de sécurité et balisage, fabriqués conformément aux normes <strong>NF EN 12899</strong> et <strong>CE</strong>.
        </p>
        <p>
          Tous nos produits sont sourcés auprès de <Placeholder label="NOM FABRICANT" />,
          fabricant certifié basé en <Placeholder label="PAYS" />.
        </p>
      </Section>

      <Section title="Contact">
        <p><strong>Email :</strong> contact@strada-signal.fr</p>
        <p><strong>Téléphone :</strong> <Placeholder label="NUMÉRO DE TÉLÉPHONE" /></p>
        <p><strong>Adresse :</strong> <Placeholder label="ADRESSE COMPLÈTE" /></p>
      </Section>

    </LegalPage>
  )
}
