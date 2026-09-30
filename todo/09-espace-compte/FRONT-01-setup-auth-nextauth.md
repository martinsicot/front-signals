# FRONT-01 — Setup authentification avec NextAuth.js

## Contexte
Câbler l'auth JWT Django avec NextAuth.js via un credentials provider. Fournir un hook `useAuth()` utilisable dans toute l'app.

## Tâches

### Installation
- [ ] `npm install next-auth`
- [ ] Configurer `NEXTAUTH_SECRET` et `NEXTAUTH_URL` dans `.env.local`

### Configuration NextAuth
- [ ] Créer `app/api/auth/[...nextauth]/route.ts`
- [ ] Credentials provider appelant `BACK-01` (`/api/auth/login/`)
- [ ] Stocker `access`, `refresh` et `user` dans la session JWT NextAuth
- [ ] Callback `jwt` : renouveler l'access token via `/api/auth/token/refresh/` si expiré
- [ ] Callback `session` : exposer `user` et `accessToken` côté client

### AuthContext / hook
- [ ] Créer `context/AuthContext.tsx` avec `useAuth()` exposant :
  - `user` — données utilisateur (id, email, prénom)
  - `isAuthenticated` — booléen
  - `login(email, password)` — appelle `signIn()` de NextAuth
  - `logout()` — appelle `signOut()` + appel `BACK-01` logout pour invalider refresh
- [ ] Wrapper `AuthProvider` à ajouter dans `app/layout.tsx`

### Protection des routes
- [ ] Créer `middleware.ts` à la racine — matcher sur `/mon-compte/**`
- [ ] Redirect vers `/connexion?redirect=...` si session absente

## Fichiers à créer
- `app/api/auth/[...nextauth]/route.ts`
- `context/AuthContext.tsx`
- `lib/auth/refreshToken.ts` — logique de refresh
- `middleware.ts`

## Dépendances
- BACK-01 terminé et endpoints accessibles
