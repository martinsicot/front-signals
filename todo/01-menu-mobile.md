# Menu mobile

## Contexte
Le bouton hamburger existe dans la Navbar avec un état `mobileOpen`, mais rien ne s'affiche quand on clique. Sur mobile, les liens de navigation sont invisibles.

## Tâches

- [ ] Ajouter un drawer/menu qui s'ouvre quand `mobileOpen === true`
- [ ] Y mettre les mêmes liens que la navbar desktop (Signalisation, Mobilier urbain, Sécurité & balisage, Nouveautés)
- [ ] Ajouter le bouton "Demander un devis" dans le menu mobile
- [ ] Fermer le menu au clic sur un lien ou en dehors
- [ ] Animer l'ouverture (slide ou fade)
- [ ] Fermer le menu sur changement de route (`usePathname`)

## Fichiers concernés
- `components/layout/Navbar.tsx`
