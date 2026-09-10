import { type NextRequest, NextResponse } from 'next/server'
import { proxyAuthPost } from '@/lib/auth/backend'

export interface PasswordResetConfirmPayload {
  uid: string
  token: string
  password: string
}

export async function POST(req: NextRequest) {
  let body: Partial<PasswordResetConfirmPayload>
  try {
    body = (await req.json()) as Partial<PasswordResetConfirmPayload>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.uid || !body.token || !body.password) {
    return NextResponse.json({ error: 'Lien invalide ou champ manquant.' }, { status: 422 })
  }

  return proxyAuthPost('/auth/password-reset/confirm/', {
    uid: body.uid,
    token: body.token,
    password: body.password,
  })
}
