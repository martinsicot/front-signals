import { type NextRequest, NextResponse } from 'next/server'
import { proxyAuthPost } from '@/lib/auth/backend'

export interface RegisterPayload {
  first_name: string
  last_name: string
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  let body: Partial<RegisterPayload>
  try {
    body = (await req.json()) as Partial<RegisterPayload>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.first_name?.trim() || !body.last_name?.trim() || !body.email?.trim() || !body.password) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 422 })
  }

  return proxyAuthPost('/auth/register/', {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: body.password,
  })
}
