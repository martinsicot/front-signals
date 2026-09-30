# FRONT-05 — Historique devis `/mon-compte/devis`

## Contexte
Pages de consultation des demandes de devis soumises par l'utilisateur connecté.

## Pages à créer

### `/mon-compte/devis` — `app/mon-compte/devis/page.tsx`
- Liste paginée depuis `GET /api/account/quotes/`
- Par ligne : référence devis, date de demande, nombre d'articles, badge statut
- Clic sur une ligne → `/mon-compte/devis/{id}`
- État vide : "Vous n'avez pas encore de demande de devis" + lien vers `/devis`

### `/mon-compte/devis/[id]` — `app/mon-compte/devis/[id]/page.tsx`
- Appel `GET /api/account/quotes/{id}/`
- En-tête : référence, date, statut
- Liste des produits demandés (nom, quantité)
- Message joint à la demande si présent
- Bloc "Réponse de notre équipe" si `status !== 'en_attente'` :
  - Total HT / TTC proposé
  - Date de validité du devis
  - Notes commerciales
  - Bouton "Télécharger le devis PDF" si `pdf_url` disponible
- Breadcrumb : Mon compte > Devis > {référence}

## Badges statut (couleurs)
| Statut | Couleur |
|--------|---------|
| en_attente | Gris |
| repondu | Bleu |
| accepte | Vert |
| refuse | Rouge/gris |

## Fichiers
- `app/mon-compte/devis/page.tsx`
- `app/mon-compte/devis/[id]/page.tsx`
- `components/account/QuoteStatusBadge.tsx`

## Dépendances
- FRONT-01 (auth + layout `/mon-compte`)
- BACK-04
