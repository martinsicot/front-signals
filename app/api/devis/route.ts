import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'

export interface DevisPayload {
  nom: string
  societe?: string
  email: string
  telephone?: string
  message?: string
  items?: { name: string; sku: string; quantity: number }[]
  totalHT?: number
}

const resend = new Resend(process.env.RESEND_API_KEY)

// Switch to a verified domain address once strada-signal.fr is configured in Resend
const FROM = 'onboarding@resend.dev'
const TO = 'martin@sicotsoft.com'

function buildHtml(body: DevisPayload): string {
  const itemsHtml = body.items?.length
    ? `<h3>Articles</h3><ul>${body.items.map(i => `<li>${i.name} — Réf. ${i.sku} × ${i.quantity}</li>`).join('')}</ul><p><strong>Total HT :</strong> ${body.totalHT?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>`
    : ''

  return `
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom :</strong> ${body.nom}</p>
    ${body.societe ? `<p><strong>Société :</strong> ${body.societe}</p>` : ''}
    <p><strong>Email :</strong> <a href="mailto:${body.email}">${body.email}</a></p>
    ${body.telephone ? `<p><strong>Téléphone :</strong> ${body.telephone}</p>` : ''}
    ${itemsHtml}
    ${body.message ? `<h3>Message</h3><p>${body.message.replace(/\n/g, '<br>')}</p>` : ''}
  `
}

export async function POST(req: NextRequest) {
  let body: DevisPayload

  try {
    body = (await req.json()) as DevisPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.nom?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: 'nom and email are required' }, { status: 422 })
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: body.email,
    subject: `Demande de devis — ${body.societe ?? body.nom}`,
    html: buildHtml(body),
  })

  if (error) {
    console.error('[devis] resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
