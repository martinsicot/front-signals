import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Livraison — Strada',
}

export default function LivraisonPage() {
  return (
    <LegalPage title="Livraison" category="Informations pratiques">

      <Section title="Zones de livraison">
        <p>
          Strada livre en <strong>France métropolitaine</strong> pour l'ensemble des commandes passées
          sur le site. Les livraisons vers les <strong>DOM-TOM</strong> et les pays de{' '}
          <strong>l'Union européenne</strong> sont possibles sur devis — contactez-nous à{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>.
        </p>
      </Section>

      <Section title="Délais de livraison">
        <p>
          Les délais sont donnés à titre indicatif à compter de la confirmation du paiement
          ou de l'acceptation du devis :
        </p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong>Produits en stock :</strong> <Placeholder label="2 à 5 jours ouvrés" /></li>
          <li><strong>Produits sur commande :</strong> <Placeholder label="7 à 15 jours ouvrés" /></li>
          <li><strong>Produits sur mesure / personnalisés :</strong> <Placeholder label="15 à 30 jours ouvrés selon spécifications" /></li>
        </ul>
        <p>
          En cas de retard, vous serez informé par email dans les meilleurs délais.
          Un retard ne peut donner lieu à une pénalité ou à l'annulation de commande
          sauf dépassement de 30 jours (conformément aux CGV).
        </p>
      </Section>

      <Section title="Transporteurs partenaires">
        <p>
          Selon le volume, le poids et la nature des produits, les expéditions sont confiées à :
        </p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li><strong><Placeholder label="NOM TRANSPORTEUR 1" /></strong> — colis standard (panneaux, accessoires)</li>
          <li><strong><Placeholder label="NOM TRANSPORTEUR 2" /></strong> — palettes et envois volumineux (mobilier urbain, barrières)</li>
        </ul>
        <p>
          Un numéro de suivi vous est communiqué par email dès l'expédition de votre commande.
        </p>
      </Section>

      <Section title="Produits volumineux et mobilier urbain">
        <p>
          Les panneaux de grande dimension, le mobilier urbain et les barrières de sécurité
          nécessitent une livraison en <strong>envoi palettisé</strong> avec hayon élévateur.
          Il est impératif que le lieu de livraison soit accessible aux poids lourds (hauteur
          minimale, largeur de voirie, possibilité de stationnement).
        </p>
        <p>
          À réception, le destinataire est tenu de <strong>vérifier l'état de la marchandise</strong>{' '}
          en présence du chauffeur et d'émettre toute réserve sur le bon de livraison avant signature.
          Aucune réclamation pour dommage apparent ne sera acceptée après départ du transporteur.
        </p>
      </Section>

      <Section title="Frais de port">
        <p>
          Les frais de livraison sont calculés en fonction du poids, du volume et de la destination,
          et sont indiqués lors de la validation du panier avant tout paiement.
        </p>
        <p>
          <strong>Franco de port</strong> à partir de{' '}
          <Placeholder label="MONTANT" /> € HT pour les commandes en France métropolitaine
          (hors produits encombrants nécessitant livraison palettisée).
        </p>
      </Section>

      <Section title="Réception et réserves">
        <p>
          En cas de colis endommagé, de manque ou d'anomalie constatée à la livraison,
          vous disposez de <strong>3 jours ouvrés</strong> pour nous le signaler par email
          à{' '}
          <a href="mailto:devis@strada-signal.fr" style={{ color: 'var(--verde)' }}>devis@strada-signal.fr</a>,
          accompagné de photos et du bon de livraison annoté.
        </p>
      </Section>

    </LegalPage>
  )
}
