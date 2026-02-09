'use client'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface Valentine {
  from: string
  to: string
  anonymous: boolean
}

interface PageProps {
  params: { id: string }
}

export default function ResultPage({ params }: PageProps) {
  const [valentine, setValentine] = useState<Valentine | null>(null)

  useEffect(() => {
    async function fetchValentine() {
      const res = await fetch(`/api/get-valentine/${params.id}`)
      const data = await res.json()
      setValentine(data)

      // Trigger confetti
      confetti({ particleCount: 100, spread: 70 })
    }

    fetchValentine()
  }, [params.id])

  if (!valentine) return <p>Loading...</p>

  return (
    <div className="valentine-page">
      <h1>💌 A Valentine for {valentine.to}</h1>
      <p>From: {valentine.anonymous ? 'Anonymous' : valentine.from}</p>
      <div className="hearts-bg"></div> {/* Floating hearts component */}
    </div>
  )
}
