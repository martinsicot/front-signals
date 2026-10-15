import { test, expect } from '@playwright/test'

test('tunnel de paiement guest', async ({ page }) => {
  // 1. Catalogue → produit
  await page.goto('http://localhost:3000/catalogue')
  await page.getByRole('link', { name: /Panneau A13a/i }).first().click()

  // 2. Ajouter au panier (variantes par défaut)
  await page.getByRole('button', { name: 'Ajouter au panier' }).click()

  // 3. Checkout
  await page.goto('http://localhost:3000/checkout')

  // 4. Remplir l'adresse
  await page.getByRole('textbox', { name: 'Email *' }).fill('martin@sicotsoft.com')
  await page.getByRole('textbox', { name: 'Nom complet *' }).fill('Jean Dupont')
  await page.getByRole('textbox', { name: 'Adresse *' }).fill('12 rue de la République')
  await page.getByRole('textbox', { name: 'Code postal *' }).fill('69001')
  await page.getByRole('textbox', { name: 'Ville *' }).fill('Lyon')

  // 5. Soumettre → crée commande + session Stripe
  await page.getByRole('button', { name: 'Procéder au paiement' }).click()

  // 6. Remplir la carte dans l'iframe Stripe
  const stripe = page.locator('iframe[name="embedded-checkout"]').contentFrame()
  await stripe.getByRole('textbox', { name: 'Card number' }).waitFor({ timeout: 15000 })
  await stripe.getByRole('textbox', { name: 'Card number' }).fill('4242424242424242')
  await stripe.getByRole('textbox', { name: 'Expiration' }).fill('12/29')
  await stripe.getByRole('textbox', { name: 'Credit or debit card CVC/CVV' }).fill('123')
  await stripe.getByRole('textbox', { name: 'Cardholder name' }).fill('Jean Dupont')

  // 7. Payer
  await stripe.getByTestId('hosted-payment-submit-button').click()

  // 8. Confirmation
  await page.waitForURL('**/checkout/confirmation**', { timeout: 20000 })
  await expect(page.getByRole('heading', { name: 'Merci pour votre commande !' })).toBeVisible()
  await expect(page.getByText('martin@sicotsoft.com')).toBeVisible()
})
