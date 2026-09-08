# Barre de recherche dans le catalogue

## Contexte
La recherche est accessible uniquement via la navbar (icône loupe ou ⌘K). Sur les pages `/catalogue` et `/catalogue/[categorie]`, l'utilisateur qui veut affiner sa recherche doit remonter tout en haut — comportement non intuitif.

## Solution
Ajouter une barre de recherche visible dans le header de ces pages. Au clic, elle ouvre la même `SearchOverlay` existante (même comportement, pas de doublon de logique).

## Tâches

- [ ] Créer `components/search/CatalogSearchBar.tsx` — bouton stylé comme un input (loupe + placeholder + hint ⌘K), état local `open`, monte `SearchOverlay` si `open === true`
- [ ] Ajouter `<CatalogSearchBar />` dans le header de `app/catalogue/page.tsx` (sous le titre et le compteur de références)
- [ ] Ajouter `<CatalogSearchBar />` dans le header de `app/catalogue/[categorie]/page.tsx`

## Fichiers concernés
- `components/search/CatalogSearchBar.tsx` — à créer
- `app/catalogue/page.tsx`
- `app/catalogue/[categorie]/page.tsx`
