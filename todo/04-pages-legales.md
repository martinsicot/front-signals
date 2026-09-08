# Pages légales

## Contexte
Obligatoires en France pour tout site e-commerce. Les liens existent dans le footer mais les pages n'existent pas.

## Tâches

### CGV — `/cgv`
- [ ] Créer `app/cgv/page.tsx`
- [ ] Contenu : conditions générales de vente (à rédiger avec le client)
- [ ] Sections typiques : objet, prix, commandes, livraison, retours, garanties, données personnelles, litiges
- [ ] Mentionner la TVA applicable (20 % sur signalisation routière en France)

### Mentions légales — `/mentions-legales`
- [ ] Créer `app/mentions-legales/page.tsx`
- [ ] Contenu : éditeur du site, hébergeur (Vercel), SIRET, responsable de publication, contact
- [ ] Informations RGPD : données collectées, durée de conservation, droits des utilisateurs

### Politique de confidentialité (bonus)
- [ ] Créer `app/confidentialite/page.tsx` si nécessaire (RGPD)

## Prérequis
- Obtenir les informations légales du client : SIRET, adresse siège, RCS, nom du responsable

## Fichiers concernés
- `app/cgv/page.tsx` — à créer
- `app/mentions-legales/page.tsx` — à créer
