import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import FaqAccordion from '@/components/faq/FaqAccordion'

export const metadata: Metadata = {
  title: 'FAQ — Strada',
}

const faqGroups = [
  {
    category: 'Commandes & devis',
    items: [
      {
        question: 'Comment obtenir un devis ?',
        answer:
          'Vous pouvez demander un devis directement depuis la page produit en cliquant sur "Demander un devis", ou en ajoutant des articles au panier et en sélectionnant l\'option "Demande de devis" lors du récapitulatif. Vous pouvez également nous contacter par email à devis@strada-signal.fr.',
      },
      {
        question: 'Y a-t-il un minimum de commande ?',
        answer:
          'Il n\'y a pas de minimum de commande pour les produits en stock disponibles à l\'achat direct. Pour les commandes sur devis (produits volumineux ou sur mesure), un minimum peut s\'appliquer selon les références. Contactez-nous pour plus d\'informations.',
      },
      {
        question: 'Puis-je modifier ou annuler ma commande ?',
        answer:
          'Toute modification ou annulation doit être signalée dans les 24 heures ouvrées suivant la commande, avant expédition. Passé ce délai, la commande est en cours de traitement et ne peut plus être modifiée. Contactez-nous rapidement à devis@strada-signal.fr.',
      },
      {
        question: 'Acceptez-vous les bons de commande administratifs ?',
        answer:
          'Oui. Pour les collectivités et organismes publics, nous acceptons les bons de commande administratifs. La facture est émise à réception du bon de commande validé. Contactez-nous pour mettre en place cette modalité.',
      },
    ],
  },
  {
    category: 'Livraison',
    items: [
      {
        question: 'Quels sont les délais de livraison ?',
        answer:
          'Pour les produits en stock, le délai est généralement de 2 à 5 jours ouvrés à compter de la confirmation du paiement. Les produits sur commande ou personnalisés nécessitent 7 à 30 jours selon les spécifications. Un email de suivi vous est envoyé dès l\'expédition.',
      },
      {
        question: 'Livrez-vous en dehors de la France métropolitaine ?',
        answer:
          'Nous livrons principalement en France métropolitaine. Les livraisons vers les DOM-TOM et l\'Union européenne sont possibles sur devis. Contactez-nous à devis@strada-signal.fr pour obtenir un tarif adapté.',
      },
      {
        question: 'Comment sont livrés les panneaux et produits volumineux ?',
        answer:
          'Les panneaux de grande taille et le mobilier urbain sont expédiés sur palette avec hayon élévateur. Il est nécessaire que le lieu de livraison soit accessible aux poids lourds. À réception, vérifiez l\'état de la marchandise en présence du chauffeur et émettez toute réserve sur le bon de livraison.',
      },
      {
        question: 'Y a-t-il un franco de port ?',
        answer:
          'Oui, la livraison est offerte à partir d\'un certain montant HT pour les commandes standard en France métropolitaine. Le montant exact et les frais de port applicables sont affichés dans le récapitulatif avant validation de la commande.',
      },
    ],
  },
  {
    category: 'Personnalisation & sur-mesure',
    items: [
      {
        question: 'Proposez-vous des panneaux personnalisés ?',
        answer:
          'Oui. Nous pouvons réaliser des panneaux personnalisés (texte, pictogramme, couleur, dimensions) selon vos spécifications. Ces commandes font l\'objet d\'une demande de devis. Contactez-nous avec vos besoins à devis@strada-signal.fr.',
      },
      {
        question: 'Puis-je commander des produits aux couleurs de ma collectivité ?',
        answer:
          'Certains produits, notamment le mobilier urbain, peuvent être personnalisés avec des coloris spécifiques. Cette option est soumise à un devis et à des quantités minimales selon les références. Contactez-nous pour évaluer la faisabilité.',
      },
    ],
  },
  {
    category: 'Conformité & garanties',
    items: [
      {
        question: 'Vos produits sont-ils conformes aux normes françaises et européennes ?',
        answer:
          'Oui. Tous nos produits de signalisation respectent la norme NF EN 12899-1 et sont marqués CE. Les fiches techniques et déclarations de performance sont disponibles sur demande, notamment pour les marchés publics.',
      },
      {
        question: 'Quelle est la garantie sur vos produits ?',
        answer:
          'Nos produits bénéficient de la garantie légale de conformité (2 ans) et de la garantie contre les vices cachés, conformément au Code de la consommation et au Code civil. Certains produits disposent d\'une garantie fabricant supplémentaire mentionnée sur la fiche produit.',
      },
      {
        question: 'Fournissez-vous des documents pour les appels d\'offres ?',
        answer:
          'Oui. Sur demande, nous fournissons les fiches techniques, déclarations de performance (DoP), attestations de conformité NF EN 12899-1 et tout autre document nécessaire aux dossiers de marchés publics. Contactez-nous à devis@strada-signal.fr.',
      },
    ],
  },
  {
    category: 'Retours & réclamations',
    items: [
      {
        question: 'Comment signaler un problème à la réception ?',
        answer:
          'En cas de colis endommagé ou de manque, émettez des réserves sur le bon de livraison en présence du chauffeur, puis contactez-nous dans les 3 jours ouvrés à devis@strada-signal.fr avec photos et bon de livraison annoté.',
      },
      {
        question: 'Puis-je retourner un produit ?',
        answer:
          'Les particuliers disposent d\'un droit de rétractation de 14 jours à compter de la réception. Les produits sur mesure ou personnalisés sont exclus du droit de rétractation. Pour les professionnels, les retours sont soumis à accord préalable. Contactez-nous pour tout retour.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <LegalPage title="Foire aux questions" category="Aide & support">
      <FaqAccordion groups={faqGroups} />
    </LegalPage>
  )
}
