# Task Plan: Frontend — Signals e-commerce

## Goal
Construire un frontend Next.js (App Router, TypeScript) pour une API Django REST de vente de panneaux de signalisation. Le site cible les collectivités, mairies et professionnels du BTP.

Stack : Next.js · Tailwind CSS · NextAuth.js (JWT) · MDX (blog)
Design system : maquette Strada (`strada.html`)
Architecture : voir `specs/architecture.md`

---

## Phases

### ✅ Phase 0 — Initialisation
- [x] Scaffold Next.js (App Router, TypeScript, Tailwind)
- [x] Design tokens Strada dans `globals.css`
- [x] ThemeProvider (dark mode, localStorage)
- [x] Layout global : Navbar + Footer

### ✅ Phase 1 — Page d'accueil
- [x] HeroSection
- [x] TrustBar
- [x] CategoriesSection
- [x] ProductsSection (données statiques + filtres)
- [x] WhyUsSection
- [x] CtaDevisSection

### 🔧 Phase 2 — Catalogue (SSR)
- [ ] `/catalogue` — grille produits paginée + sidebar catégories
- [ ] `/catalogue/[categorie]` — filtre par catégorie
- [ ] `/produits/[slug]` — page produit (image, prix, add-to-cart, JSON-LD)
- [ ] Breadcrumb composant
- [ ] ProductCard composant réutilisable
- [ ] Connexion API backend (`GET /api/catalog/products/`, `GET /api/catalog/products/{slug}/`)

### 🔧 Phase 3 — Auth (NextAuth + JWT)
- [ ] Configuration NextAuth avec provider Django JWT
- [ ] `/connexion` — formulaire login
- [ ] `/inscription` — formulaire register
- [ ] Route handler `app/api/auth/[...nextauth]/route.ts`
- [ ] Middleware de protection des routes auth-gated

### 🔧 Phase 4 — Panier (client-side)
- [ ] CartContext + useCart hook
- [ ] CartDrawer (slide-in depuis la droite)
- [ ] `/panier` — CartPage complète
- [ ] Connexion API backend (`GET/POST/PATCH/DELETE /api/cart/`)
- [ ] Badge panier live dans Navbar

### 🔧 Phase 5 — Checkout (client-side)
- [ ] CheckoutStepper (3 étapes)
- [ ] AddressStep — formulaire adresse avec validation
- [ ] SummaryStep — récap commande
- [ ] StripeRedirectButton — POST `/api/orders/{id}/checkout/`
- [ ] `/commande/[id]/confirmation` — page confirmation

### 🔧 Phase 6 — Compte (client-side, auth-gated)
- [ ] `/mon-compte` — profil utilisateur
- [ ] `/mon-compte/commandes` — liste commandes
- [ ] `/mon-compte/commandes/[id]` — détail commande

### 🔧 Phase 7 — CRM (client-side, staff-gated)
- [ ] `/crm` — dashboard (stats, dernières commandes)
- [ ] `/crm/commandes` — liste filtrée par statut/date/email
- [ ] `/crm/commandes/[id]` — détail + transitions de statut
- [ ] `/crm/clients` — liste clients
- [ ] `/crm/clients/[id]` — profil + historique + adresses

### 🔧 Phase 8 — Blog (SSG + ISR)
- [ ] Structure MDX dans `content/blog/`
- [ ] `/blog` — liste des articles
- [ ] `/blog/[slug]` — article avec metadata SEO
- [ ] MDXComponents pour le rendu des articles

### 🔧 Phase 9 — QA
- [ ] Mobile (375px, 390px)
- [ ] Lighthouse ≥ 80 performance, SEO 100, accessibilité ≥ 90
- [ ] Cross-browser (Chrome, Safari, Firefox)
- [ ] E2E : guest checkout → Stripe → confirmation
- [ ] E2E : utilisateur connecté → commande → portail compte
- [ ] CRM : transitions de statut complètes
- [ ] 404 page custom

---

## Décisions actées
- **Framework** : Next.js App Router
- **CSS** : Tailwind CSS compilé (pas CDN)
- **Dark mode** : ThemeProvider + data-theme sur html + localStorage
- **Auth** : NextAuth.js + simplejwt Django
- **Blog** : MDX local (pas de CMS)
- **Hébergement** : Vercel (GitHub → déploiement auto)
- **Backend** : `../backend-signals` — voir routes dans ce repo

## Erreurs rencontrées
_(aucune pour l'instant)_

## Statut
**Phase 1 terminée.** Phase 2 (catalogue) est la prochaine étape.
