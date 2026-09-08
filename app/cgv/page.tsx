import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Strada',
}

export default function CGVPage() {
  return (
    <LegalPage title="Conditions Générales de Vente">

      <Section title="1. Objet">
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre{' '}
          <strong><Placeholder label="RAISON SOCIALE" /></strong>, société <Placeholder label="SAS / SARL / EURL" />{' '}
          au capital de <Placeholder label="MONTANT" /> €, immatriculée au RCS de{' '}
          <Placeholder label="VILLE" /> sous le numéro <Placeholder label="XXX XXX XXX" />,{' '}
          dont le siège social est situé <Placeholder label="ADRESSE COMPLÈTE" /> (ci-après « la Société »),
          et tout acheteur professionnel ou particulier (ci-après « le Client ») passant commande
          sur le site strada-signal.fr.
        </p>
        <p>
          Toute commande implique l'acceptation sans réserve des présentes CGV.
          La Société se réserve le droit de modifier ses CGV à tout moment ; les CGV applicables
          sont celles en vigueur à la date de la commande.
        </p>
      </Section>

      <Section title="2. Produits et prix">
        <p>
          Les produits proposés sont conformes à la législation française en vigueur et aux normes
          applicables (NF EN 12899-1, directive CE, etc.). Les photographies et descriptions sont
          données à titre indicatif et ne sont pas contractuelles.
        </p>
        <p>
          Les prix sont indiqués en euros hors taxes (HT). La TVA applicable est de <strong>20 %</strong>{' '}
          pour la signalisation routière et le mobilier urbain destinés à la vente en France
          métropolitaine. Le montant TTC est affiché lors de la validation du panier.
        </p>
        <p>
          La Société se réserve le droit de modifier ses prix à tout moment.
          Les prix facturés sont ceux en vigueur au moment de la validation définitive de la commande.
        </p>
      </Section>

      <Section title="3. Commandes">
        <p>
          Toute commande passée sur le site vaut acceptation des prix et des descriptions des produits.
          La Société accusera réception de la commande par email dans un délai de <strong>24 heures ouvrées</strong>.
        </p>
        <p>
          La Société se réserve le droit d'annuler toute commande pour laquelle il existerait un litige
          relatif au paiement d'une commande antérieure ou en cas de rupture de stock.
          Le Client en sera informé dans les meilleurs délais.
        </p>
        <p>
          Pour les commandes faisant l'objet d'une demande de devis (commandes supérieures à 400 € HT
          ou commandes sur-mesure), le contrat est conclu à la date d'acceptation du devis par le Client.
        </p>
      </Section>

      <Section title="4. Paiement">
        <p>
          Le paiement est exigible à la commande. Les moyens de paiement acceptés sont :
          carte bancaire (Visa, Mastercard, American Express) via notre prestataire sécurisé Stripe.
        </p>
        <p>
          En cas de paiement par virement bancaire (sur devis uniquement), la commande est traitée
          à réception du virement. Les coordonnées bancaires sont communiquées sur le devis.
        </p>
      </Section>

      <Section title="5. Livraison">
        <p>
          Les livraisons sont effectuées à l'adresse indiquée par le Client lors de la commande,
          en France métropolitaine uniquement sauf accord préalable.
        </p>
        <p>
          Les délais de livraison sont donnés à titre indicatif : <strong><Placeholder label="X à Y jours ouvrés" /></strong>{' '}
          à compter de la confirmation du paiement. En cas de retard, la Société en informera le Client
          sans que ce retard puisse donner lieu à une indemnité ou à l'annulation de la commande,
          sauf dépassement de 30 jours.
        </p>
        <p>
          Les frais de livraison sont indiqués lors de la validation du panier.
          Le transport est assuré par <Placeholder label="NOM DU TRANSPORTEUR" />.
          À la livraison, le Client est tenu de vérifier l'état du colis en présence du transporteur
          et d'émettre toute réserve nécessaire.
        </p>
      </Section>

      <Section title="6. Droit de rétractation">
        <p>
          Conformément à l'article L221-18 du Code de la consommation, le Client particulier dispose
          d'un délai de <strong>14 jours</strong> à compter de la réception des produits pour exercer
          son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
        </p>
        <p>
          Ce droit ne s'applique pas aux professionnels, ni aux produits fabriqués sur mesure
          ou personnalisés selon les spécifications du Client (article L221-28 du Code de la consommation).
        </p>
        <p>
          Pour exercer ce droit, le Client doit notifier sa décision par email à{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>{' '}
          avant l'expiration du délai. Les frais de retour sont à la charge du Client.
        </p>
      </Section>

      <Section title="7. Garanties">
        <p>
          Les produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants
          du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et
          suivants du Code civil).
        </p>
        <p>
          En cas de défaut de conformité constaté dans les <strong>2 ans</strong> suivant la livraison,
          le Client peut demander le remplacement ou la réparation du produit.
        </p>
      </Section>

      <Section title="8. Responsabilité">
        <p>
          La Société ne saurait être tenue responsable des dommages résultant d'une mauvaise
          utilisation des produits, d'une installation non conforme aux normes en vigueur,
          ou du non-respect des réglementations locales relatives à la signalisation.
        </p>
        <p>
          La responsabilité de la Société est limitée au montant de la commande concernée.
        </p>
      </Section>

      <Section title="9. Données personnelles">
        <p>
          Les données collectées lors de la commande sont utilisées pour le traitement et le suivi
          des commandes ainsi que pour la relation commerciale. Elles ne sont pas cédées à des tiers.
          Pour plus d'informations, consultez notre{' '}
          <a href="/confidentialite" style={{ color: 'var(--verde)' }}>Politique de confidentialité</a>.
        </p>
      </Section>

      <Section title="10. Litiges">
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable
          sera recherchée en priorité. À défaut, le litige sera soumis aux tribunaux compétents
          du ressort du siège social de la Société.
        </p>
        <p>
          Conformément à l'article L612-1 du Code de la consommation, le Client particulier peut
          recourir gratuitement au médiateur de la consommation : <Placeholder label="NOM DU MÉDIATEUR — URL" />.
        </p>
      </Section>

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>
        Dernière mise à jour : <Placeholder label="JJ/MM/AAAA" />
      </p>

    </LegalPage>
  )
}
