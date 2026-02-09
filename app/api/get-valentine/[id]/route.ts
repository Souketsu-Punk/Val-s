export const dynamic = "force-dynamic";


import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

interface Params {
  id: string
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params

    const valentine = await redis.get(`valentine:${id}`)

    if (!valentine) {
      return NextResponse.json({ error: 'Valentine not found' }, { status: 404 })
    }

    return NextResponse.json(valentine)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch Valentine' }, { status: 500 })
  }
}
