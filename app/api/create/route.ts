import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function POST(req: NextRequest) {
  try {
    const { from, to, anonymous } = await req.json()

    if (!to || to.trim() === '') {
      return NextResponse.json({ error: 'Recipient required' }, { status: 400 })
    }

    const id = crypto.randomUUID()

    // Save Valentine in Redis with 72-hour expiry (TTL)
    await redis.set(
      `valentine:${id}`,
      {
        from: from || 'Anonymous',
        to,
        anonymous: !!anonymous,
        createdAt: Date.now(),
      },
      { ex: 60 * 60 * 72 } // 72 hours in seconds
    )

    return NextResponse.json({ id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create Valentine' }, { status: 500 })
  }
}
