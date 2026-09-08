# Espace compte utilisateur

## Contexte
Gros chantier à traiter en dernier. Nécessite une authentification et probablement une API backend dédiée.

## Tâches

### Authentification
- [ ] Choisir la solution : NextAuth.js, Clerk, Auth0, ou auth maison via API Django
- [ ] Page de connexion `/connexion`
- [ ] Page d'inscription `/inscription`
- [ ] Gestion des sessions (JWT ou cookie httpOnly)
- [ ] Réinitialisation de mot de passe

### Dashboard compte — `/mon-compte`
- [ ] Page principale avec résumé (dernières commandes, devis en cours)
- [ ] Modifier profil (nom, email, téléphone, adresse de livraison par défaut)

### Historique commandes — `/mon-compte/commandes`
- [ ] Liste des commandes avec statut (en cours, expédiée, livrée)
- [ ] Détail d'une commande
- [ ] Lien vers suivi transporteur

### Historique devis — `/mon-compte/devis`
- [ ] Liste des demandes de devis soumises
- [ ] Statut (en attente, répondu, accepté, refusé)
- [ ] Télécharger le devis PDF si disponible

## Prérequis
- Authentification opérationnelle côté backend Django
- API endpoints pour commandes et devis

## Fichiers concernés
- `app/connexion/page.tsx` — à créer
- `app/inscription/page.tsx` — à créer
- `app/mon-compte/page.tsx` — à créer
- `app/mon-compte/commandes/page.tsx` — à créer
- `app/mon-compte/devis/page.tsx` — à créer
- `context/AuthContext.tsx` — à créer
- `lib/auth/` — à créer
