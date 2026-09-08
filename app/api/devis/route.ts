import { NextResponse, type NextRequest } from 'next/server'

export interface DevisPayload {
  nom: string
  societe?: string
  email: string
  telephone?: string
  message?: string
  items?: { name: string; sku: string; quantity: number }[]
  totalHT?: number
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

  // TODO: send email via Resend (or another provider).
  // Example:
  //   import { Resend } from 'resend'
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' })

  console.log('[devis] received:', body)

  return NextResponse.json({ ok: true })
}
