import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const token = await getToken({ req })
  if (!token?.accessToken) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  const res = await fetch(`${BASE}/account/quotes/${id}/`, {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
