import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'FAQ — Le Panneau',
  description: 'Réponses aux questions fréquentes sur les commandes, la livraison et les produits Le Panneau.',
}

export default function FAQPage() {
  return (
    <LegalPage title="Questions fréquentes">

      <Section title="Commandes">
        <p><strong>Puis-je commander sans créer de compte ?</strong></p>
        <p>
          Oui, la commande en tant qu'invité est possible. Vous recevrez un email de confirmation avec
          le récapitulatif et le suivi de votre commande.
        </p>

        <p><strong>Comment suivre ma commande ?</strong></p>
        <p>
          Un email de suivi vous est envoyé à chaque étape : confirmation de paiement, mise en
          fabrication, expédition (avec numéro de tracking) et livraison.
        </p>

        <p><strong>Puis-je modifier ou annuler ma commande ?</strong></p>
        <p>
          <Placeholder label="PRÉCISER — délai d'annulation, conditions, contact à contacter" />
        </p>
      </Section>

      <Section title="Produits & conformité">
        <p><strong>Vos panneaux sont-ils conformes à la réglementation française ?</strong></p>
        <p>
          Oui. Tous nos produits sont conformes à l'IISR et marqués CE selon la norme NF EN 12899-1.
          Consultez notre page <a href="/conformite" style={{ color: 'var(--verde)' }}>Conformité & normes</a> pour
          plus de détails.
        </p>

        <p><strong>Proposez-vous des produits sur mesure ?</strong></p>
        <p>
          <Placeholder label="RÉPONDRE — configurateur, devis, délais sur mesure" />
        </p>

        <p><strong>Quelle est la durée de vie de vos panneaux ?</strong></p>
        <p>
          <Placeholder label="RÉPONDRE — durée de vie films rétroréfléchissants selon classe, garantie fabricant" />
        </p>
      </Section>

      <Section title="Livraison & retours">
        <p><strong>Quels sont les délais de livraison ?</strong></p>
        <p>
          Les commandes sont expédiées sous 3 jours ouvrés. Consultez notre page{' '}
          <a href="/livraison" style={{ color: 'var(--verde)' }}>Livraison</a> pour tous les détails.
        </p>

        <p><strong>Livrez-vous en dehors de la France métropolitaine ?</strong></p>
        <p>
          Actuellement, nous livrons en France métropolitaine uniquement. Contactez-nous pour toute
          demande spécifique.
        </p>

        <p><strong>Comment retourner un produit ?</strong></p>
        <p>
          <Placeholder label="PRÉCISER — politique de retour, délai (14j légal), conditions (produit non posé, emballage d'origine), procédure" />
        </p>
      </Section>

      <Section title="Devis & tarifs">
        <p><strong>À partir de quel montant faut-il demander un devis ?</strong></p>
        <p>
          Pour les commandes dépassant 400 € HT, nous vous proposons un devis personnalisé pour
          bénéficier de tarifs adaptés à votre volume.
        </p>

        <p><strong>Proposez-vous des tarifs professionnels ?</strong></p>
        <p>
          <Placeholder label="PRÉCISER — grille tarifaire pro, remises volume, compte professionnel" />
        </p>
      </Section>

      <Section title="Vous n'avez pas trouvé votre réponse ?">
        <p>
          Contactez-nous à{' '}
          <a href="mailto:contact@le-panneau.fr" style={{ color: 'var(--verde)' }}>
            contact@le-panneau.fr
          </a>
          , nous répondons sous 24h ouvrées.
        </p>
      </Section>

    </LegalPage>
  )
}
