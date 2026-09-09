import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Gate `/mon-compte/**` behind an authenticated NextAuth session.
 * Unauthenticated visitors are sent to `/connexion?redirect=<original-path>`
 * so they return to the requested page after signing in.
 */
export default async function proxy(req: NextRequest) {
  const token = await getToken({ req })

  if (!token || token.error === 'RefreshAccessTokenError') {
    const url = req.nextUrl.clone()
    const target = req.nextUrl.pathname + req.nextUrl.search
    url.pathname = '/connexion'
    url.search = `?redirect=${encodeURIComponent(target)}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/mon-compte/:path*'],
}
