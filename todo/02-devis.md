# Page Demander un devis

## Contexte
Deux points d'entrée distincts vers `/devis` :

1. **Navbar + homepage** → formulaire libre, sans lien avec le panier (clients B2B qui contactent en amont)
2. **Panier/checkout** → formulaire pré-rempli avec les articles du panier, affiché uniquement si total HT > 400 €

## Tâches

### Page `/devis`
- [x] Créer `app/devis/page.tsx`
- [x] Formulaire : nom, société, email, téléphone, message
- [x] Si `?from=panier` dans l'URL : lire le panier via CartContext et pré-remplir une section "Articles concernés" (lecture seule)
- [x] Validation côté client (champs requis, format email)
- [x] Action d'envoi : `mailto:` avec corps pré-rempli (articles + infos contact)
- [x] Page de confirmation après envoi

### Bouton conditionnel dans le panier
- [x] Dans `app/panier/page.tsx` : afficher le bloc devis si `totalHT > 400`
- [x] Message : *"Votre commande dépasse 400 € — vous pouvez aussi demander un devis personnalisé."*
- [x] Bouton → `/devis?from=panier`
- [x] Le bouton "Procéder au paiement" est toujours visible (le devis est une option, pas un remplacement)

### CTA Navbar / Homepage
- [x] Le bouton "Demander un devis" de la Navbar pointe désormais vers `/devis`
- [x] Le bouton "Demander un devis gratuit" de `CtaDevisSection` pointe vers `/devis`

## Fichiers concernés
- `app/devis/page.tsx` ✓
- `app/devis/DevisForm.tsx` ✓
- `app/panier/page.tsx` ✓
- `components/layout/Navbar.tsx` ✓
- `components/home/CtaDevisSection.tsx` ✓
