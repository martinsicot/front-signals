import type { Metadata } from 'next'
import LegalPage, { Section, Placeholder } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Le Panneau',
}

export default function CGVPage() {
  return (
    <LegalPage title="Conditions Générales de Vente">

      <Section title="Préambule">
        <p>
          La société <strong><Placeholder label="NOM_SOCIETE" /></strong>,{' '}
          <Placeholder label="FORME_JURIDIQUE" /> au capital de <Placeholder label="MONTANT_CAPITAL" /> €,
          immatriculée au RCS sous le numéro <Placeholder label="SIRET" />, dont le siège social est situé{' '}
          <Placeholder label="ADRESSE_SIEGE" /> (ci-après « Le Panneau » ou « le Vendeur »), exploite le site{' '}
          <Placeholder label="URL_SITE" /> sous la marque commerciale <strong>Le Panneau</strong>.
        </p>
        <p>
          Le Panneau propose à la vente des panneaux publicitaires et signalétiques personnalisés (impression,
          découpe, finition), fabriqués sur mesure à la commande.
        </p>
        <p>
          Les présentes CGV s'appliquent à toute commande passée sur le site, à l'exclusion de toute autre
          condition. Elles sont indissociables de la{' '}
          <a href="/confidentialite" style={{ color: 'var(--verde)' }}>Politique de confidentialité</a>.
        </p>
      </Section>

      <Section title="Article 1 — Définitions">
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong>Client :</strong> toute personne physique ou morale passant commande sur le site, avec ou sans compte.</li>
          <li><strong>Client consommateur :</strong> personne physique agissant en dehors de toute activité professionnelle (art. liminaire Code conso.).</li>
          <li><strong>Client professionnel :</strong> personne agissant dans le cadre de son activité professionnelle.</li>
          <li><strong>Commande :</strong> acte par lequel le Client sélectionne un Produit, renseigne ses paramètres de personnalisation et procède au paiement.</li>
          <li><strong>Produits :</strong> panneaux fabriqués sur mesure selon les spécifications transmises par le Client (format, support, impression, découpe, finition, etc.).</li>
          <li><strong>Parties :</strong> le Vendeur et le Client, désignés conjointement.</li>
        </ul>
      </Section>

      <Section title="Article 2 — Objet et champ d'application">
        <p>
          Les présentes CGV régissent les ventes de Produits conclues à distance via le site{' '}
          <Placeholder label="URL_SITE" />, que le Client dispose ou non d'un compte (guest checkout inclus).
        </p>
        <p>
          Toute Commande implique l'acceptation pleine et sans réserve des présentes CGV, matérialisée
          par la case à cocher prévue à cet effet avant validation définitive.
        </p>
      </Section>

      <Section title="Article 3 — Produits et commande">
        <p>
          Les Produits sont des panneaux personnalisés fabriqués à la commande. Les visuels illustratifs
          n'ont qu'une valeur indicative ; le rendu final dépend des fichiers et paramètres transmis par le Client.
        </p>
        <p><strong>Le Client est seul responsable :</strong></p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <li>de la conformité de ses fichiers graphiques (résolution, droits d'auteur, droit à l'image) ;</li>
          <li>de l'exactitude des informations de personnalisation renseignées.</li>
        </ul>
        <p>Le processus de commande comprend : sélection du produit → personnalisation → vérification du récapitulatif → acceptation des CGV et renonciation au droit de rétractation → paiement → email de confirmation.</p>
        <p>
          La Commande est ferme et définitive dès confirmation du paiement. En cas d'erreur constatée,
          le Client doit contacter le Vendeur dans les <strong>deux (2) heures</strong> à l'adresse{' '}
          <a href={`mailto:`} style={{ color: 'var(--verde)' }}><Placeholder label="EMAIL_CONTACT" /></a>.
        </p>
        <p>
          Le Vendeur se réserve le droit de refuser toute Commande pour motif légitime (fichiers non conformes,
          contenu illicite, suspicion de fraude).
        </p>
      </Section>

      <Section title="Article 4 — Prix">
        <p>
          Les prix sont indiqués en euros <strong>toutes taxes comprises (TTC)</strong>, TVA 20 % incluse,
          hors frais de livraison. Les frais de livraison sont affichés séparément avant validation.
        </p>
        <p>
          Le Vendeur se réserve le droit de modifier ses prix à tout moment. Le prix applicable est celui
          en vigueur à la date de validation de la Commande. Une facture électronique est émise et envoyée
          par email après chaque Commande.
        </p>
      </Section>

      <Section title="Article 5 — Paiement">
        <p>
          Le paiement est exigible intégralement et comptant à la validation de la Commande. Le Vendeur
          utilise la solution sécurisée <strong>Stripe</strong> (Stripe Payments Europe, Ltd.). Moyens acceptés :
          carte bancaire (Visa, Mastercard, American Express) et tout autre moyen proposé par Stripe.
        </p>
        <p>
          Les données bancaires sont transmises directement à Stripe et ne transitent pas par les serveurs
          du Vendeur. Le Vendeur ne conserve aucune information bancaire.
        </p>
        <p>
          En cas de refus de transaction, la Commande est automatiquement annulée et le Client en est informé par email.
        </p>
        <p style={{ fontSize: 13 }}>
          <em>Clients professionnels uniquement —</em> En cas de paiement différé expressément convenu par écrit,
          tout retard entraîne de plein droit des pénalités au taux de <strong>trois (3) fois le taux légal</strong> et
          une indemnité forfaitaire de <strong>40 €</strong> (art. D. 441-5 Code de commerce).
        </p>
      </Section>

      <Section title="Article 6 — Fabrication et délais">
        <p>
          Tous les Produits sont <strong>fabriqués sur mesure à la commande</strong>. La fabrication ne débute
          qu'après confirmation du paiement et validation des fichiers.
        </p>
        <p>
          Délai de fabrication indicatif : <strong><Placeholder label="DELAI_FABRICATION_JOURS" /> jours ouvrés</strong>{' '}
          à compter de la confirmation de Commande. Ce délai est indicatif et peut varier selon la complexité
          du Produit ou les contraintes de production.
        </p>
        <p>
          Si un bon à tirer (BAT) est prévu, le délai ne commence à courir qu'à compter de sa validation
          écrite par le Client.
        </p>
      </Section>

      <Section title="Article 7 — Livraison">
        <p>
          Livraison sur <Placeholder label="ZONE_LIVRAISON — ex : France métropolitaine" />.
          Délai indicatif : <strong><Placeholder label="DELAI_LIVRAISON_JOURS" /> jours ouvrés</strong> à compter
          de l'expédition. Un email de suivi est envoyé au Client à l'expédition.
        </p>
        <p>
          Le risque de perte ou de détérioration est transféré au Client consommateur à la prise de possession
          physique du bien. Pour les Clients professionnels, le transfert s'opère dès remise au transporteur.
        </p>
        <p>
          À réception, le Client doit vérifier l'état du colis. En cas de dommage apparent, il doit émettre
          des réserves précises sur le bon de livraison et confirmer au transporteur par LRAR dans les{' '}
          <strong>3 jours</strong>, et informer le Vendeur à <Placeholder label="EMAIL_RETOURS" />.
        </p>
      </Section>

      <Section title="Article 8 — Droit de rétractation">
        <p>
          Conformément à l'article L. 221-18 du Code de la consommation, le consommateur dispose en principe
          d'un délai de <strong>14 jours</strong> pour exercer son droit de rétractation.
        </p>
        <p style={{ background: 'var(--surface)', padding: '12px 16px', borderRadius: 6, border: '1px solid var(--border)' }}>
          <strong>⚠️ Exception produits sur mesure — L. 221-28 3° du Code de la consommation</strong><br />
          L'ensemble des Produits étant fabriqués selon les spécifications personnalisées du Client,{' '}
          <strong>le droit de rétractation ne s'applique pas</strong>. Toute Commande validée et payée est
          ferme et définitive. Cette renonciation est matérialisée par une case à cocher dédiée lors du
          processus de commande.
        </p>
        <p>
          Cette disposition ne prive pas le Client consommateur du bénéfice des garanties légales (art. 9).
        </p>
      </Section>

      <Section title="Article 9 — Garanties légales">
        <p>
          <strong>Garantie légale de conformité</strong> (art. L. 217-4 et s. Code conso.) : le Client consommateur
          dispose de <strong>2 ans</strong> à compter de la délivrance pour agir. Durant les 12 premiers mois,
          il est dispensé de prouver l'existence du défaut. Il peut demander réparation, remplacement, réduction
          de prix ou résolution du contrat.
        </p>
        <p>
          <em>Attention :</em> un rendu conforme aux fichiers transmis mais non conforme aux attentes subjectives
          du Client ne constitue pas un défaut de conformité.
        </p>
        <p>
          <strong>Garantie contre les vices cachés</strong> (art. 1641 et s. Code civil) : le Client dispose de
          2 ans à compter de la découverte du vice pour agir.
        </p>
        <p>
          Pour mettre en œuvre une garantie, contacter le Vendeur à{' '}
          <Placeholder label="EMAIL_RETOURS" /> avec le numéro de Commande, description du défaut et photos.
        </p>
      </Section>

      <Section title="Article 10 — Retours et réclamations">
        <p>
          Toute réclamation doit être adressée à <Placeholder label="EMAIL_RETOURS" /> dans les{' '}
          <Placeholder label="DELAI_RECLAMATION_JOURS — ex : 14" /> jours suivant la réception, avec numéro
          de Commande, description du problème et photos.
        </p>
        <p>
          <strong>Aucun retour physique n'est accepté sans accord préalable écrit du Vendeur.</strong>
        </p>
        <p>
          En cas de litige, le Client consommateur peut recourir gratuitement au médiateur de la consommation :{' '}
          <strong><Placeholder label="NOM_MEDIATEUR" /></strong> —{' '}
          <Placeholder label="URL_MEDIATEUR" />.
          Plateforme européenne de règlement en ligne :{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            ec.europa.eu/consumers/odr
          </a>.
        </p>
      </Section>

      <Section title="Article 11 — Responsabilité">
        <p>
          La responsabilité du Vendeur est limitée aux <strong>dommages directs</strong> et plafonnée à la{' '}
          <strong>valeur TTC de la Commande</strong> à l'origine du litige. Les dommages indirects (manque
          à gagner, perte d'exploitation, préjudice d'image) sont exclus.
        </p>
        <p>
          Le Client est seul responsable des contenus (visuels, textes, marques, logos) qu'il fournit
          pour la personnalisation. Il garantit le Vendeur contre tout recours de tiers découlant de
          l'utilisation de ces contenus.
        </p>
      </Section>

      <Section title="Article 12 — Données personnelles">
        <p>
          Le responsable de traitement est <strong><Placeholder label="NOM_SOCIETE" /></strong> —{' '}
          <Placeholder label="ADRESSE_SIEGE" /> — <Placeholder label="EMAIL_RGPD" />.
        </p>
        <p>
          Les données collectées lors de la Commande sont utilisées pour : traitement et suivi des commandes,
          facturation, emails transactionnels, prévention de la fraude et obligations légales. Durées de
          conservation : 3 ans (données clients) et 10 ans (données de facturation).
        </p>
        <p>
          Conformément au RGPD, vous disposez de droits d'accès, rectification, effacement, limitation,
          portabilité et opposition. Pour les exercer : <Placeholder label="EMAIL_RGPD" />.
          Réclamation possible auprès de la{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>CNIL</a>.
        </p>
        <p>
          Pour plus de détails, consulter notre{' '}
          <a href="/confidentialite" style={{ color: 'var(--verde)' }}>Politique de confidentialité</a>.
        </p>
      </Section>

      <Section title="Article 13 — Force majeure">
        <p>
          Aucune des Parties ne pourra être tenue responsable de l'inexécution de ses obligations en cas
          de force majeure au sens de l'article 1218 du Code civil (catastrophes naturelles, grèves générales,
          pannes de réseaux, pandémies reconnues, décisions gouvernementales, etc.).
        </p>
        <p>
          La Partie constatant l'événement en informe l'autre sans délai. Si la force majeure persiste
          au-delà de <strong>30 jours calendaires</strong>, chaque Partie peut résilier la Commande concernée
          sans indemnité, par notification écrite.
        </p>
      </Section>

      <Section title="Article 14 — Dispositions diverses">
        <p>
          <strong>Droit applicable :</strong> droit français. <strong>Langue :</strong> français.
        </p>
        <p>
          <strong>Juridiction — Consommateurs :</strong> tribunaux français compétents selon les règles de
          droit commun (domicile du défendeur ou lieu de livraison, au choix du consommateur).
        </p>
        <p>
          <strong>Juridiction — Professionnels :</strong> compétence exclusive du{' '}
          <Placeholder label="JURIDICTION_COMPETENTE — ex : Tribunal de commerce de Paris" />.
        </p>
        <p>
          Si l'une des clauses des présentes CGV est déclarée nulle, les autres demeurent en vigueur et
          conservent leur plein effet.
        </p>
      </Section>

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>
        Dernière mise à jour : <Placeholder label="JJ/MM/AAAA" />
      </p>

    </LegalPage>
  )
}
