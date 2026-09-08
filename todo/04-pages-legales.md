# Pages légales

## Contexte
Obligatoires en France pour tout site e-commerce. Les liens existent dans le footer mais les pages n'existent pas.

## Tâches

### CGV — `/cgv`
<<<<<<< HEAD
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
=======
- [x] Créer `app/cgv/page.tsx`
- [x] Sections : objet, prix & TVA (20%), commandes, paiement, livraison, rétractation, garanties, responsabilité, données personnelles, litiges
- [ ] Remplacer les placeholders : raison sociale, forme juridique, capital, adresse, SIRET, RCS, transporteur, médiateur, date

### Mentions légales — `/mentions-legales`
- [x] Créer `app/mentions-legales/page.tsx`
- [x] Sections : éditeur, responsable publication, hébergeur (Vercel), propriété intellectuelle, RGPD, cookies, liens
- [ ] Remplacer les placeholders : raison sociale, adresse, SIRET, RCS, responsable, téléphone, date

### Politique de confidentialité — `/confidentialite`
- [x] Créer `app/confidentialite/page.tsx`
- [x] Sections : responsable, données & finalités, durée conservation, destinataires (Vercel/Stripe/Resend), transferts hors UE, droits, cookies
- [ ] Remplacer les placeholders : raison sociale, adresse, date

### Composant partagé
- [x] Créer `components/legal/LegalPage.tsx` — layout + composants `Section` et `Placeholder`

## Placeholders à remplir (communs aux 3 pages)
- `RAISON SOCIALE`
- `SAS / SARL / EURL`
- `MONTANT` (capital)
- `ADRESSE COMPLÈTE`
- `SIRET`
- `RCS VILLE — NUMÉRO`
- `NOM PRÉNOM` (responsable publication)
- `+33 X XX XX XX XX`
- `JJ/MM/AAAA` (date de mise à jour)
- `NOM DU TRANSPORTEUR` (CGV uniquement)
- `NOM DU MÉDIATEUR — URL` (CGV uniquement)

## Fichiers concernés
- `components/legal/LegalPage.tsx` ✓
- `app/cgv/page.tsx` ✓
- `app/mentions-legales/page.tsx` ✓
- `app/confidentialite/page.tsx` ✓
>>>>>>> 2e8b866 (feat(legal): add CGV, mentions légales and privacy policy pages with placeholders)
