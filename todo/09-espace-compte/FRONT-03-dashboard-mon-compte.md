# FRONT-03 — Dashboard `/mon-compte`

## Contexte
Page d'accueil de l'espace personnel. Résumé des activités et gestion du profil.

## Page : `/mon-compte` — `app/mon-compte/page.tsx`

### Layout
- Sidebar de navigation (liens vers commandes, devis, déconnexion)
- Zone principale avec blocs

### Bloc "Mes dernières commandes"
- 3 dernières commandes depuis `GET /api/account/orders/`
- Badge statut coloré par état
- Lien "Voir toutes mes commandes" → `/mon-compte/commandes`
- Si aucune commande : message d'invitation à commander

### Bloc "Mes devis en cours"
- Devis avec statut `en_attente` ou `repondu` depuis `GET /api/account/quotes/`
- Lien "Voir tous mes devis" → `/mon-compte/devis`
- Si aucun devis : message d'invitation à faire une demande

### Bloc "Mon profil"
- Affichage : prénom, nom, email, téléphone, adresse de livraison par défaut
- Bouton "Modifier mon profil" → ouvre un formulaire inline ou modal
- Formulaire de modification :
  - Champs : prénom, nom, téléphone, adresse livraison par défaut (ligne 1, ligne 2, CP, ville)
  - Soumission : `PATCH /api/account/me/`
  - Toast de confirmation après sauvegarde

## Fichiers
- `app/mon-compte/page.tsx`
- `app/mon-compte/layout.tsx` — layout avec sidebar commun à toutes les sous-pages
- `components/account/ProfileForm.tsx`
- `components/account/OrderSummaryCard.tsx`
- `components/account/QuoteSummaryCard.tsx`

## Dépendances
- FRONT-01 (auth + protection route)
- BACK-02, BACK-03, BACK-04
