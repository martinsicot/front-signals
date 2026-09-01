# Architecture — Front Signals

## Stack

**Framework** : Next.js (App Router) + TypeScript strict
**CSS** : Tailwind CSS compilé
**Auth** : NextAuth.js + JWT (djangorestframework-simplejwt côté backend)

---

## Pourquoi Next.js

- **SEO** : pages catalogue, produit et blog générées côté serveur — indexables par Google
- **Routing fichier** : la structure de dossiers définit les routes
- **Flexibilité de rendu** : stratégie choisie page par page (SSG, SSR, client)
- **TypeScript** : strict mode activé par défaut

---

## Domaines et communication API

```
Frontend  →  app.domain.fr      (Next.js)
Backend   →  api.domain.fr      (Django — noms de domaines exacts à confirmer)
```

Deux sous-domaines séparés. En développement : `localhost:3000` et `localhost:8000`.

### Flux des requêtes

**Depuis le serveur Next.js** (SSR/SSG) :
```
Serveur Next.js  →  api.domain.fr/api/*   (direct, serveur à serveur, pas de CORS)
```

**Depuis le navigateur** (pages client-side : panier, checkout, CRM) :
```
Navigateur  →  app.domain.fr/api/*  →  Next.js proxy  →  api.domain.fr/api/*
```
Le navigateur ne connaît que `app.domain.fr` — le sous-domaine backend n'est pas exposé dans le JS.

### Ce qu'il faut configurer

- **Django** : `django-cors-headers` avec `CORS_ALLOWED_ORIGINS = ["https://app.domain.fr"]`
- **Next.js** : route proxy `app/api/[...path]/route.ts` qui forwarde vers `api.domain.fr`

### Variables d'environnement

```
# Côté serveur Next.js uniquement (non exposé au navigateur)
API_INTERNAL_URL=https://api.domain.fr

# Côté navigateur — pointe vers le proxy Next.js
NEXT_PUBLIC_API_URL=https://app.domain.fr/api
```

---

## Auth — JWT via NextAuth.js

Le backend Django utilise `djangorestframework-simplejwt`.

Flux :
1. Utilisateur soumet login → NextAuth appelle `backend.domain.fr/api/auth/token/`
2. Backend retourne `access` + `refresh` JWT
3. NextAuth stocke les tokens en session chiffrée (cookie httpOnly)
4. Chaque requête API inclut `Authorization: Bearer <access_token>`
5. Refresh automatique via NextAuth avant expiration

**Avantage** : le token ne transite jamais en clair dans le JS client.

---

## Stratégie de rendu par type de page

| Page | Stratégie | Raison |
|------|-----------|--------|
| Home (`/`) | SSG | Statique, LCP rapide |
| Catalogue (`/catalogue`) | SSR | Contenu change, SEO critique |
| Page produit (`/produits/[slug]`) | SSR | SEO critique, données fraîches |
| Blog liste (`/blog`) | SSG + ISR | Régénéré automatiquement à chaque article |
| Article de blog (`/blog/[slug]`) | SSG + ISR | SEO maximal, contenu MDX statique |
| CGV, Mentions légales | SSG | Contenu statique |
| Panier (`/panier`) | Client | Données utilisateur, pas de SEO |
| Checkout (`/commande`) | Client | Données utilisateur, pas de SEO |
| Compte (`/mon-compte`) | Client | Auth-gated |
| CRM (`/crm`) | Client | Staff only |

**ISR (Incremental Static Regeneration)** : la page est régénérée en arrière-plan toutes les X secondes sans redéploiement. Idéal pour le blog.

---

## Blog — MDX

Les articles sont des fichiers `.mdx` dans le repo. Pas de CMS externe pour V1.

```
content/
  blog/
    panneau-stop-norme-française.mdx
    choisir-panneaux-chantier.mdx
    ...
```

Chaque fichier contient un frontmatter YAML :
```yaml
---
title: "Comment choisir ses panneaux de chantier"
date: 2024-03-15
description: "Guide complet pour sélectionner les panneaux réglementaires..."
slug: choisir-panneaux-chantier
tags: [chantier, réglementation]
---
```

Next.js lit les fichiers au build avec `next-mdx-remote` ou `@next/mdx`, génère les pages en SSG + ISR.

**SEO blog** : chaque article a ses propres `<title>`, `<meta description>`, `og:image` via la Metadata API Next.js.

---

## State management

| Besoin | Solution |
|--------|----------|
| Session utilisateur | NextAuth (`useSession`) |
| Panier | React Context + `useReducer` |
| Données serveur (produits, commandes) | Fetch dans Server Components |
| Données client dynamiques | SWR (`useSWR`) |

Pas de Redux ni Zustand — trop lourd pour ce périmètre.

---

## Structure de fichiers cible

```
app/
  layout.tsx                          # layout global (nav, footer)
  page.tsx                            # / (home, SSG)
  catalogue/
    page.tsx                          # /catalogue (SSR)
    [categorie]/
      page.tsx                        # /catalogue/[categorie] (SSR)
  produits/
    [slug]/
      page.tsx                        # /produits/[slug] (SSR)
  blog/
    page.tsx                          # /blog — liste articles (SSG+ISR)
    [slug]/
      page.tsx                        # /blog/[slug] — article MDX (SSG+ISR)
  panier/
    page.tsx                          # /panier (client)
  commande/
    page.tsx                          # /commande — checkout multi-steps (client)
    [id]/
      confirmation/
        page.tsx                      # /commande/[id]/confirmation
  mon-compte/
    layout.tsx                        # layout compte (auth guard)
    page.tsx                          # /mon-compte
    commandes/
      page.tsx
      [id]/
        page.tsx
  crm/
    layout.tsx                        # layout CRM (staff guard)
    page.tsx                          # /crm (dashboard)
    commandes/
      page.tsx
      [id]/
        page.tsx
    clients/
      page.tsx
      [id]/
        page.tsx
  connexion/
    page.tsx
  inscription/
    page.tsx
  cgv/
    page.tsx
  mentions-legales/
    page.tsx
  api/
    proxy/
      [...path]/
        route.ts                      # proxy vers backend.domain.fr

content/
  blog/                               # fichiers MDX des articles

components/
  ui/                                 # boutons, badges, inputs, modals
  catalog/                            # ProductCard, CategorySidebar, Breadcrumb
  cart/                               # CartItem, CartSummary, CartDrawer
  checkout/                           # CheckoutStepper, AddressForm, OrderSummary
  account/                            # OrderTable, ProfileForm
  crm/                                # OrderTable CRM, StatusBadge, StatusTransitionButton
  blog/                               # ArticleCard, ArticleLayout, MDXComponents

hooks/
  useCart.ts
  useOrders.ts

lib/
  api/
    client.ts                         # fetch client-side (via proxy)
    server.ts                         # fetch server-side (direct backend)
  mdx.ts                              # lecture et parsing des fichiers MDX
  types.ts                            # types TypeScript partagés

content/
  blog/                               # articles .mdx
```

---

## Ce qui n'est PAS dans ce front

- Pas de Django templates ni de HTMX
- Pas de CMS externe (blog en MDX pour V1)
- Pas de Redux / Zustand
- Le backend reste une API pure — Next.js est le seul client
