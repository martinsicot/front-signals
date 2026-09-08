# Checkout & paiement

## Contexte
Le panier est fonctionnel mais il n'y a aucune suite : pas de saisie d'adresse, pas de paiement, pas de confirmation de commande. C'est le gros chantier manquant pour un site e-commerce complet.

## Tâches

### Tunnel de commande
- [ ] `app/checkout/page.tsx` — page de checkout (adresse + récap panier)
- [ ] Formulaire adresse de livraison : nom, adresse, code postal, ville, pays
- [ ] Récapitulatif des articles avec sous-total HT, TVA, total TTC
- [ ] Afficher le bloc "Demander un devis" si total HT > 400 € (voir `todo/02-devis.md`)

### Intégration paiement (Stripe recommandé)
- [ ] Installer `@stripe/stripe-js` et `@stripe/react-stripe-js`
- [ ] Créer `app/api/checkout/route.ts` — crée une Stripe Checkout Session et retourne l'URL
- [ ] Rediriger vers Stripe Checkout (hosted) ou intégrer Stripe Elements
- [ ] Ajouter les variables d'env `STRIPE_SECRET_KEY` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Confirmation de commande
- [ ] `app/checkout/confirmation/page.tsx` — page affichée après paiement réussi
- [ ] Lire le `session_id` retourné par Stripe en query param
- [ ] Vider le panier après confirmation
- [ ] Afficher numéro de commande, récap, délai estimé

### Webhooks (optionnel dans un premier temps)
- [ ] `app/api/webhooks/stripe/route.ts` — écouter les événements Stripe (`payment_intent.succeeded`, etc.)

## Fichiers concernés
- `app/checkout/page.tsx` — à créer
- `app/checkout/confirmation/page.tsx` — à créer
- `app/api/checkout/route.ts` — à créer
- `app/api/webhooks/stripe/route.ts` — à créer (optionnel)
- `app/panier/page.tsx` — ajouter le bouton "Procéder au paiement" → `/checkout`
- `.env.local` — ajouter les clés Stripe
