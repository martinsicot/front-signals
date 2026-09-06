import { NextResponse, type NextRequest } from 'next/server'
import { api } from '@/lib/api/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') ?? undefined
  const q = searchParams.get('q') ?? undefined
  const pageParam = searchParams.get('page')
  const page = pageParam ? Number(pageParam) : undefined

  if (page !== undefined && (!Number.isInteger(page) || page < 1)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  try {
    const data = await api.products({ category, q, page })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
  }
}
