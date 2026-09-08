# Roadmap — Strada Front

## Ce qui fonctionne

- Catalogue produits (navigation, filtres par catégorie, scroll infini)
- Page produit avec sélection de variantes et prix
- Panier (ajout, suppression, quantités, total HT)
- Recherche live (overlay ⌘K)
- Home page complète
- Footer et Navbar desktop

---

## Ce qui manque

### Critique (liens morts aujourd'hui)

- **Page `/devis`** — le bouton "Demander un devis" du panier et de la fiche produit pointe là, mais la page n'existe pas. C'est le point de conversion principal du site.
- **Menu mobile** — le bouton hamburger existe et a un état `mobileOpen`, mais aucune navigation ne s'affiche quand on clique.

### Légalement obligatoire en France

- **Page CGV** (`/cgv`)
- **Page Mentions légales** (`/mentions-legales`)

### Contenu manquant dans le footer/CTA

- Numéro de téléphone (placeholder `+33 (0)X XX XX XX XX`)
- SIRET (placeholder `[XXX XXX XXX XXXXX]`)

### Pages informatives

- `/a-propos`
- `/livraison` (délais, transporteurs, zones)
- `/conformite` (normes CE, NF, etc. — important pour la signalisation)
- `/faq`

### Fonctionnalités avancées

- **Espace compte** (`/mon-compte`) — historique commandes, devis, profil
- **Barre de recherche dans le catalogue** — une barre visible sur les pages catalogue/catégorie qui ouvre la même modale de recherche (évite de remonter en haut de page)
- **Tri "Nouveautés"** — `/catalogue?sort=new` ne fait rien côté API pour l'instant

---

## Ordre de priorité suggéré

| # | Feature | Effort |
|---|---------|--------|
| 1 | Menu mobile | Faible |
| 2 | Page `/devis` avec panier pré-rempli | Moyen |
| 3 | CGV + Mentions légales | Faible |
| 4 | Téléphone & SIRET dans le footer | Trivial |
| 5 | Pages informatives (à propos, livraison, conformité, FAQ) | Faible |
| 6 | Barre de recherche dans le catalogue | Faible |
| 7 | Tri "Nouveautés" | Faible |
| 8 | Espace compte | Élevé |
