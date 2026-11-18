import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  if (!token?.accessToken) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  const page = new URL(req.url).searchParams.get('page') ?? '1'
  const res = await fetch(`${BASE}/orders/mine/?page=${page}`, {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
