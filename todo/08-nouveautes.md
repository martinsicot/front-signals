# Tri "Nouveautés"

## Contexte
Le lien "Nouveautés" dans la navbar pointe vers `/catalogue?sort=new`, mais le paramètre `sort` n'est pas géré côté frontend ni transmis au backend. Il ne fait rien.

## Tâches

### Frontend
- [ ] Lire le paramètre `sort` dans `app/catalogue/page.tsx` (dans `searchParams`)
- [ ] Transmettre `sort` à `api.products()` si supporté par le backend
- [ ] Transmettre `sort` à `InfiniteProductGrid` pour le paginer correctement
- [ ] Afficher un titre adapté : "Nouveautés" si `sort=new`

### Backend (à vérifier)
- [ ] Vérifier que l'API Django supporte un paramètre `ordering=new` ou `sort=new`
- [ ] Si non : ajouter le filtre côté backend (tri par `created_at` desc)

## Fichiers concernés
- `app/catalogue/page.tsx`
- `components/catalog/InfiniteProductGrid.tsx`
- Backend : `backend-signals` (hors scope frontend)
