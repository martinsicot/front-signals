/** French standard VAT rate applied to all catalogue prices (stored HT). */
export const TVA_RATE = 0.2

/** Orders strictly above this HT amount (€) also unlock the quote request path. */
export const DEVIS_THRESHOLD = 400

/** Format an amount as "1 234,50 €" (French locale, HT or TTC alike). */
export function formatEUR(value: number): string {
  return `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`
}

/** What the client sends to /api/checkout — prices are re-derived server-side. */
export interface CheckoutRequest {
  items: { productSlug: string; variantId: number; quantity: number }[]
  customer: {
    nom: string
    adresse: string
    codePostal: string
    ville: string
    pays: string
  }
}
