# BACK-03 — API historique commandes

## Contexte
Exposer les commandes passées liées au compte connecté, avec statut et détail.

## Endpoints à créer

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/account/orders/` | Liste des commandes de l'utilisateur |
| GET | `/api/account/orders/{id}/` | Détail d'une commande |

## Auth
Bearer token requis. Un utilisateur ne peut voir que ses propres commandes.

## Réponses

### GET /api/account/orders/
Paginé (20 par page).
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "ORD-2024-001",
      "created_at": "2024-11-15T10:30:00Z",
      "status": "livree",
      "total_ttc": "245.80",
      "items_count": 3
    }
  ]
}
```

### GET /api/account/orders/{id}/
```json
{
  "id": "ORD-2024-001",
  "created_at": "2024-11-15T10:30:00Z",
  "status": "livree",
  "total_ht": "204.83",
  "total_ttc": "245.80",
  "shipping_address": { "line1": "...", "city": "...", "zip_code": "..." },
  "tracking_url": "https://suivi.transporteur.fr/...",
  "items": [
    {
      "product_id": "AB123",
      "name": "Panneau stop",
      "quantity": 2,
      "unit_price_ttc": "45.00",
      "image_url": "..."
    }
  ]
}
```

## Valeurs de statut
`en_cours` | `expediee` | `livree` | `annulee`

## Dépendances
- BACK-01 (auth)
- Modèle commande existant dans Django (à confirmer avec structure actuelle)
