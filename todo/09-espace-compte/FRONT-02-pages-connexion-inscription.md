# FRONT-02 — Pages connexion, inscription et réinitialisation mot de passe

## Contexte
Formulaires d'entrée dans l'espace compte. S'appuient sur `useAuth()` (FRONT-01) et les endpoints BACK-01.

## Pages à créer

### `/connexion` — `app/connexion/page.tsx`
- Formulaire : email + mot de passe
- Bouton "Se connecter"
- Lien "Mot de passe oublié ?" → `/mot-de-passe-oublie`
- Lien "Pas encore de compte ?" → `/inscription`
- Après connexion : redirect vers `?redirect=` ou `/mon-compte`
- Gestion d'erreur : message si identifiants invalides

### `/inscription` — `app/inscription/page.tsx`
- Formulaire : prénom, nom, email, mot de passe, confirmation mot de passe
- Validation côté client (mots de passe identiques, format email)
- Après inscription : connexion automatique + redirect `/mon-compte`
- Lien "Déjà un compte ?" → `/connexion`

### `/mot-de-passe-oublie` — `app/mot-de-passe-oublie/page.tsx`
- Formulaire : email
- Message de confirmation envoyé (toujours affiché, même si email inconnu)
- Appelle `POST /api/auth/password-reset/`

### `/reinitialisation-mot-de-passe` — `app/reinitialisation-mot-de-passe/page.tsx`
- Reçoit `token` et `uid` en query params
- Formulaire : nouveau mot de passe + confirmation
- Appelle `POST /api/auth/password-reset/confirm/`
- Redirect vers `/connexion` après succès

## UI
- Utiliser les composants existants (boutons, inputs) du design system du projet
- Pages centrées, card blanche, responsive mobile
- Pas de layout avec sidebar (pages publiques)

## Dépendances
- FRONT-01 (`useAuth`, `login()`)
- BACK-01 (tous les endpoints auth)
