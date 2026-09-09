import type { JWT } from 'next-auth/jwt'

/** Server-side backend base URL (never exposed to the browser). */
const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

/** Decode a JWT payload without verifying it (used only to read `exp`). */
function decodeExp(token: string): number | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const json = JSON.parse(
      Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'),
    ) as { exp?: number }
    return typeof json.exp === 'number' ? json.exp : null
  } catch {
    return null
  }
}

/** Milliseconds since epoch when the access token expires (0 if unknown). */
export function accessTokenExpiry(accessToken: string): number {
  const exp = decodeExp(accessToken)
  return exp ? exp * 1000 : 0
}

/**
 * Exchange a valid refresh token for a fresh access token via
 * `POST /api/auth/token/refresh/` (djangorestframework-simplejwt).
 *
 * Returns a new token object. On failure the token is flagged with
 * `error: 'RefreshAccessTokenError'` so the `session` callback can force a
 * re-login instead of silently serving an expired access token.
 */
export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${BASE}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: token.refreshToken }),
    })

    const data = (await res.json()) as { access?: string; refresh?: string }
    if (!res.ok || !data.access) {
      throw new Error('Refresh failed')
    }

    return {
      ...token,
      accessToken: data.access,
      accessTokenExpires: accessTokenExpiry(data.access),
      // simplejwt with ROTATE_REFRESH_TOKENS returns a new refresh token.
      refreshToken: data.refresh ?? token.refreshToken,
      error: undefined,
    }
  } catch {
    return { ...token, error: 'RefreshAccessTokenError' }
  }
}
