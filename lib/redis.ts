import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.Valentino!,
  token: process.env.Valentino!,
})
