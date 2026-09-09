import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/** Server-side backend base URL (never exposed to the browser). */
const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

/**
 * Invalidate the current session's refresh token on the Django backend
 * (BACK-01 `/api/auth/logout/`) before NextAuth clears the client session.
 *
 * The refresh token lives only inside the encrypted NextAuth JWT, so it is
 * read server-side via `getToken` and never sent to the browser.
 */
export async function POST(req: NextRequest) {
  const token = await getToken({ req })

  if (token?.refreshToken) {
    try {
      await fetch(`${BASE}/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify({ refresh: token.refreshToken }),
      })
    } catch {
      // Best-effort: local sign-out proceeds even if the backend call fails.
    }
  }

  return NextResponse.json({ ok: true })
}
