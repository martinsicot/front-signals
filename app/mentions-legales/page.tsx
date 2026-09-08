import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Mentions légales — Strada',
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">

      <Section title="Éditeur du site">
        <p><strong>Raison sociale :</strong> <Placeholder label="RAISON SOCIALE" /></p>
        <p><strong>Forme juridique :</strong> <Placeholder label="SAS / SARL / EURL" /></p>
        <p><strong>Capital social :</strong> <Placeholder label="MONTANT" /> €</p>
        <p><strong>Siège social :</strong> <Placeholder label="ADRESSE COMPLÈTE" /></p>
        <p><strong>SIRET :</strong> <Placeholder label="XXX XXX XXX XXXXX" /></p>
        <p><strong>RCS :</strong> <Placeholder label="VILLE RCS — NUMÉRO" /></p>
        <p>
          <strong>Email :</strong>{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>
            devis@strada-signal.fr
          </a>
        </p>
        <p><strong>Téléphone :</strong> <Placeholder label="+33 X XX XX XX XX" /></p>
      </Section>

      <Section title="Responsable de publication">
        <p><Placeholder label="NOM PRÉNOM" />, <Placeholder label="TITRE / FONCTION" /></p>
      </Section>

      <Section title="Hébergement">
        <p>
          Ce site est hébergé par <strong>Vercel Inc.</strong>,
          440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        </p>
        <p>
          Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>vercel.com</a>
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L'ensemble du contenu de ce site (textes, images, logos, visuels produits) est la propriété
          exclusive de <Placeholder label="RAISON SOCIALE" /> ou de ses fournisseurs et est protégé
          par le droit français et international de la propriété intellectuelle.
          Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
        </p>
      </Section>

      <Section title="Données personnelles (RGPD)">
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)
          et à la loi Informatique et Libertés du 6 janvier 1978 modifiée,{' '}
          <Placeholder label="RAISON SOCIALE" /> est responsable du traitement des données
          personnelles collectées sur ce site.
        </p>
        <p><strong>Données collectées :</strong></p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>Données de contact (nom, email, téléphone) — lors d'une demande de devis</li>
          <li>Données de commande (adresse, articles commandés) — lors d'un achat</li>
          <li>Données de navigation (cookies techniques) — pour le bon fonctionnement du site</li>
        </ul>
        <p><strong>Finalité :</strong> traitement des commandes et devis, relation commerciale, amélioration du service.</p>
        <p><strong>Durée de conservation :</strong> 3 ans à compter du dernier contact pour les données commerciales, 10 ans pour les données de facturation (obligation légale).</p>
        <p><strong>Destinataires :</strong> les données ne sont pas cédées à des tiers à des fins commerciales. Elles peuvent être transmises à nos prestataires techniques (Vercel, Stripe, Resend) dans le cadre strict de l'exécution des services.</p>
        <p>
          <strong>Vos droits :</strong> vous disposez d'un droit d'accès, de rectification,
          d'effacement, de limitation et de portabilité de vos données, ainsi que d'un droit
          d'opposition. Pour les exercer, contactez-nous à{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>.
          Vous pouvez également introduire une réclamation auprès de la{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>CNIL</a>.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement
          (panier, préférence de thème). Aucun cookie publicitaire ou de tracking tiers n'est déposé.
        </p>
      </Section>

      <Section title="Liens hypertextes">
        <p>
          Ce site peut contenir des liens vers des sites tiers. La Société n'exerce aucun contrôle
          sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </Section>

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>
        Dernière mise à jour : <Placeholder label="JJ/MM/AAAA" />
      </p>

    </LegalPage>
  )
}
