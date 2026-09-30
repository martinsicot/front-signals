# BACK-04 — API historique devis

## Contexte
Exposer les demandes de devis soumises par l'utilisateur connecté, avec statut et PDF.

## Endpoints à créer

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/account/quotes/` | Liste des devis de l'utilisateur |
| GET | `/api/account/quotes/{id}/` | Détail d'un devis |

## Auth
Bearer token requis. Un utilisateur ne peut voir que ses propres devis.

## Réponses

### GET /api/account/quotes/
Paginé (20 par page).
```json
{
  "count": 2,
  "results": [
    {
      "id": "DEV-2024-007",
      "created_at": "2024-12-01T09:00:00Z",
      "status": "repondu",
      "items_count": 4
    }
  ]
}
```

### GET /api/account/quotes/{id}/
```json
{
  "id": "DEV-2024-007",
  "created_at": "2024-12-01T09:00:00Z",
  "status": "repondu",
  "message": "Bonjour, je souhaite un devis pour...",
  "pdf_url": "https://api.example.com/quotes/DEV-2024-007/pdf/",
  "items": [
    {
      "product_id": "AB123",
      "name": "Panneau stop",
      "quantity": 10
    }
  ],
  "response": {
    "total_ht": "380.00",
    "total_ttc": "456.00",
    "valid_until": "2025-01-01",
    "notes": "Remise accordée pour quantité."
  }
}
```

Le champ `pdf_url` est `null` si aucun PDF n'est disponible.  
Le champ `response` est `null` si le devis est encore `en_attente`.

## Valeurs de statut
`en_attente` | `repondu` | `accepte` | `refuse`

## Dépendances
- BACK-01 (auth)
- Modèle devis existant dans Django (à lier avec le formulaire de devis frontend existant)
