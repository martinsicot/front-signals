# BACK-02 — API profil utilisateur

## Contexte
Exposer et permettre la modification des données de profil de l'utilisateur connecté.

## Endpoints à créer

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/account/me/` | Récupérer le profil courant |
| PATCH | `/api/account/me/` | Modifier les informations du profil |

## Auth
Bearer token (JWT) requis sur tous les endpoints. Retourner 401 si absent ou expiré.

## Réponses

### GET /api/account/me/
```json
{
  "id": 1,
  "email": "martin@example.com",
  "first_name": "Martin",
  "last_name": "Sicot",
  "phone": "0612345678",
  "default_shipping_address": {
    "line1": "12 rue des Acacias",
    "line2": "",
    "zip_code": "75001",
    "city": "Paris",
    "country": "FR"
  }
}
```

### PATCH /api/account/me/
Champs modifiables : `first_name`, `last_name`, `phone`, `default_shipping_address`  
L'email n'est pas modifiable directement (nécessite une vérification séparée si besoin).

Réponse 200 : profil mis à jour.

## Dépendances
- BACK-01 (auth opérationnelle)
