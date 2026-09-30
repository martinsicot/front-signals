# FRONT-04 — Historique commandes `/mon-compte/commandes`

## Contexte
Pages de consultation des commandes passées par l'utilisateur connecté.

## Pages à créer

### `/mon-compte/commandes` — `app/mon-compte/commandes/page.tsx`
- Liste paginée depuis `GET /api/account/orders/`
- Par ligne : référence commande, date, nombre d'articles, montant TTC, badge statut
- Clic sur une ligne → `/mon-compte/commandes/{id}`
- Pagination (20 par page)
- État vide : "Vous n'avez pas encore de commande"

### `/mon-compte/commandes/[id]` — `app/mon-compte/commandes/[id]/page.tsx`
- Appel `GET /api/account/orders/{id}/`
- En-tête : référence, date, statut
- Tableau des articles (image, nom, quantité, prix unitaire, sous-total)
- Bloc adresse de livraison
- Récapitulatif HT / TVA / TTC
- Bouton "Suivre ma commande" si `tracking_url` disponible (ouvre dans un nouvel onglet)
- Breadcrumb : Mon compte > Commandes > {référence}

## Badges statut (couleurs)
| Statut | Couleur |
|--------|---------|
| en_cours | Bleu |
| expediee | Orange |
| livree | Vert |
| annulee | Rouge/gris |

## Fichiers
- `app/mon-compte/commandes/page.tsx`
- `app/mon-compte/commandes/[id]/page.tsx`
- `components/account/OrderStatusBadge.tsx`
- `components/account/OrderItemsTable.tsx`

## Dépendances
- FRONT-01 (auth + layout `/mon-compte`)
- BACK-03
