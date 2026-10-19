# Signavia — Handoff design → implémentation

Boutique en ligne de panneaux de signalisation routière (panneaux, poteaux, fixations).
Direction retenue : **B — « Fiche technique routière »**. Trois pages à implémenter :

| Maquette | Page | Route suggérée |
|---|---|---|
| `design/Home2.dc.html` | Accueil / catalogue | `/` |
| `design/Category2.dc.html` | Sous-catégorie (ex. panneaux de danger type A) | `/categorie/[slug]` |
| `design/Product2.dc.html` | Fiche produit configurable (ex. A14) | `/produit/[code]` |

## Comment lire les maquettes

Les fichiers `.dc.html` viennent d'un outil de design ; ils **ne s'exécutent pas tels quels** (ils dépendent d'un runtime `support.js` absent). Les utiliser comme **spécification visuelle et comportementale** :

- Tout le markup visible est dans `<x-dc>…</x-dc>`, avec styles inline = valeurs de design exactes (couleurs, tailles, espacements).
- `{{nom}}` = valeur dynamique calculée dans `renderVals()` (script en bas de fichier).
- `<sc-for list="{{items}}" as="item">` = boucle ; `<sc-if value="{{cond}}">` = affichage conditionnel.
- `onClick="{{handler}}"` = interaction ; la logique d'état est dans la classe `Component` (`this.state`, `setState`).
- `data-props` → `accent` : couleur d'accent paramétrable (défaut `#FFD400`).
- Les liens `href="Category2.dc.html"` etc. représentent la navigation entre pages.

## Design tokens

| Token | Valeur | Usage |
|---|---|---|
| `--ink` | `#111315` | texte, barres, boutons primaires sombres |
| `--paper` | `#FFFFFF` | fond |
| `--surface` | `#F3F3F1` | survol de tuiles, fond du plan coté |
| `--rule` | `#D6D7D9` | filets fins (grilles sans gouttière) |
| `--muted` | `#565B61` | texte secondaire (contraste AA sur blanc) |
| `--text-2` | `#3A3E43` | paragraphes |
| `--accent` | `#FFD400` | jaune marquage routier : CTA, prix, onglet actif |
| `--sign-red` | `#D52B1E` | dessins de panneaux uniquement |
| `--sign-blue` | `#1F5BB5` | dessins de panneaux + badge NF |

- Polices (Google Fonts) : **Overpass** 400–900 (titres et texte), **Overpass Mono** 500–600 (codes, cotes, prix, libellés de section).
- Rayons : 2 px maximum. Séparateurs : 2 px `--ink` pour les sections, 1 px `--rule` entre éléments.
- Largeur max du contenu : 1360 px, gouttière 24 px. Cibles tactiles ≥ 44 px.
- Grilles de produits « sans gouttière » : bordures partagées (border-left/top sur le conteneur, border-right/bottom sur chaque tuile), `repeat(auto-fill, minmax(…, 1fr))`.

## Composants à extraire

`Header` (barre noire + recherche + Espace pro / Devis (n) / Panier (n)), `CategoryNav` (liens numérotés 01–06, onglet actif en jaune), `Breadcrumb` (mono, séparateur « / »), `SectionHeading` (numéro mono « 01 — … » + titre), `SignIcon` (dessins SVG par forme : triangle, triangle inversé, rond, octogone, carré, flèche, poteau…), `ProductTile`, `ProductTable`, `SegmentedControl`, `FilterChip`, `QuantityStepper`, `PriceSummary`, `TierPriceTable`, `Footer`.

## Comportements à reproduire

**Accueil**
- « Trouver par forme » : 6 tuiles-liens vers la catégorie filtrée par forme.
- Index catalogue : 6 catégories avec 3 sous-liens chacune.

**Sous-catégorie**
- Onglets de type (A, AB, B, C, CE, D, M) : type courant en noir, `aria-current="page"`.
- Puces de filtre (gamme, classe, avec poteau) : bascule on/off, `aria-pressed`, doivent filtrer la liste.
- Bascule **Grille / Tableau** : même jeu de produits, deux rendus ; le tableau défile horizontalement sur mobile.
- Tri (code, meilleures ventes, prix), bouton « Afficher plus », bouton « + Devis » par produit.

**Fiche produit**
- Configurateur en 4 étapes : gamme (500 / 700 / 1000 / 1250 mm), classe de rétroréflexion (1 / 2), poteau (aucun / 2 / 2,3 / 3 / 3,5 m), quantité (min 1).
- **Plan coté SVG dynamique** : le triangle change d'échelle selon la gamme, la cote horizontale affiche la dimension en mm, le poteau et sa cote verticale apparaissent si un poteau est choisi (voir calculs dans `renderVals()` de `Product2.dc.html`).
- Récapitulatif mis à jour en direct ; la ligne du tableau de tarif dégressif correspondant à la quantité est surlignée en jaune (1–4, 5–9, 10–24, 25+).
- Compléments (panonceau M9z, bouchon, kit de scellement) : bascule « + Ajouter » / « ✓ Ajouté ».
- « Ajouter au panier » et « Ajouter au devis » envoient la configuration complète.

## Contenus à remplacer

Les valeurs entre crochets sont des espaces réservés à brancher sur les vraies données : `[PRIX]`, `[N]` (nombre de références), `[DÉLAI]`, `[POIDS]`, `[ÉP.]`, `[TÉLÉPHONE]`, `[E-MAIL]`. Les dessins SVG de panneaux remplacent temporairement les photos produit ; les pictogrammes non dessinés affichent leur code.

## Modèle de données suggéré

- `Category { slug, number, name, subcategories[] }`
- `SignType { code: "A"|"AB"|"B"|…, name, shape }`
- `Product { code, name, type, shape, sizesMm[], classes[], nf: boolean, priceFrom, images[], specs{} }`
- `PriceTier { productCode, minQty, maxQty, unitPriceHt }`
- `Addon { code, name, priceHt }`
- `CartLine { productCode, sizeMm, class, poleLengthM | null, addons[], qty }`

## Critères d'acceptation / tests

1. Rendu fidèle aux maquettes à 1440 px ; pas de défilement horizontal à 375 px (header, menus et grilles passent à la ligne).
2. Accessibilité : navigation clavier complète, focus visible, `aria-pressed` / `aria-current` / `aria-label` comme dans les maquettes, contraste AA.
3. Tests composants : filtres, bascule grille/tableau, configurateur (gamme → cote du plan, poteau → affichage du poteau), stepper (min 1), palier de prix surligné selon la quantité.
4. Tests E2E (Playwright) : Accueil → forme « Triangle » → catégorie → produit A14 → configurer (Grande, Classe 2, poteau 3 m, qté 6) → ajout panier → la ligne panier contient la configuration exacte.
5. Lighthouse : Accessibilité ≥ 95, Performance ≥ 90 sur mobile.
