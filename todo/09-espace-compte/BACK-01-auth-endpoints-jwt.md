# BACK-01 — Auth : endpoints Django JWT

## Contexte
Mise en place de l'authentification côté backend Django avec JWT (SimpleJWT).

## Endpoints à créer

| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/auth/register/` | Inscription |
| POST | `/api/auth/login/` | Connexion → access + refresh token |
| POST | `/api/auth/token/refresh/` | Renouvellement de l'access token |
| POST | `/api/auth/logout/` | Invalidation du refresh token |
| POST | `/api/auth/password-reset/` | Envoi email de réinitialisation |
| POST | `/api/auth/password-reset/confirm/` | Confirmation avec token URL |

## Payload attendus

### POST /api/auth/register/
```json
{ "first_name": "...", "last_name": "...", "email": "...", "password": "...", "password_confirm": "..." }
```
Réponse 201 : `{ "access": "...", "refresh": "..." }`

### POST /api/auth/login/
```json
{ "email": "...", "password": "..." }
```
Réponse 200 : `{ "access": "...", "refresh": "...", "user": { "id": 1, "email": "...", "first_name": "..." } }`

### POST /api/auth/logout/
```json
{ "refresh": "..." }
```
Réponse 205

### POST /api/auth/password-reset/
```json
{ "email": "..." }
```
Réponse 200 (toujours, même si email inconnu — sécurité)

### POST /api/auth/password-reset/confirm/
```json
{ "token": "...", "uid": "...", "new_password": "..." }
```
Réponse 200

## Erreurs à normaliser
- 400 : validation échouée (champs manquants, email déjà utilisé, passwords ne correspondent pas)
- 401 : identifiants incorrects
- Toutes les erreurs au format `{ "detail": "..." }` ou `{ "field": ["..."] }`

## Livrables
- Endpoints fonctionnels et testés
- Email de réinitialisation configuré (template minimal)
- Documentation des réponses d'erreur

## Dépendances
Aucune (point de départ du chantier)
