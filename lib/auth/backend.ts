/** Server-side backend base URL (never exposed to the browser). */
const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

/**
 * Forward a JSON POST from a Next.js route handler to the Django backend,
 * relaying the backend status code and body back to the browser. Keeps the
 * backend URL server-side so the browser only ever talks to Next.js.
 */
export async function proxyAuthPost(path: string, body: unknown): Promise<Response> {
  let res: Response
  try {
    res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return Response.json({ error: 'Service indisponible. Réessayez plus tard.' }, { status: 502 })
  }

  // Relay the backend body verbatim so field-level validation errors survive.
  const text = await res.text()
  return new Response(text || null, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('Content-Type') ?? 'application/json' },
  })
}
