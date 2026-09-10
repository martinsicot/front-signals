import { type NextRequest, NextResponse } from 'next/server'
import { proxyAuthPost } from '@/lib/auth/backend'

export async function POST(req: NextRequest) {
  let body: { email?: string }
  try {
    body = (await req.json()) as { email?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.email?.trim()) {
    return NextResponse.json({ error: 'Email requis.' }, { status: 422 })
  }

  return proxyAuthPost('/auth/password-reset/', { email: body.email })
}
