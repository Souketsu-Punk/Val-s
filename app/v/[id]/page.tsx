'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import Container from '../../../components/Container'
import Card from '../../../components/Card'

export const dynamic = "force-dynamic";

export default function ValentineView({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [showNoConfirm, setShowNoConfirm] = useState(false)

  const baseButtonStyle: React.CSSProperties = {
  padding: "12px 26px",
  borderRadius: "999px",
  border: "none",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  color: "white",
};

const yesStyle: React.CSSProperties = {
  ...baseButtonStyle,
  background: "linear-gradient(135deg, #ff6b81, #ff8fab)",
  boxShadow: "0 6px 20px rgba(255, 105, 135, 0.45)",
};

const maybeStyle: React.CSSProperties = {
  ...baseButtonStyle,
  background: "linear-gradient(135deg, #ffb703, #ffd166)",
  boxShadow: "0 6px 20px rgba(255, 183, 3, 0.45)",
};

const noStyle: React.CSSProperties = {
  ...baseButtonStyle,
  background: "linear-gradient(135deg, #adb5bd, #ced4da)",
  boxShadow: "0 6px 20px rgba(173, 181, 189, 0.45)",
};


  useEffect(() => {
    async function fetchValentine() {
      const res = await fetch(`/api/get-valentine/${params.id}`)
      const json = await res.json()
      setData(json)
      // Initial confetti if already Yes
      if (json.response === 'yes') confetti({ particleCount: 100, spread: 70 })
    }
    fetchValentine()
  }, [params.id])

  // Confetti every 3 seconds if 'yes'
  useEffect(() => {
    if (response === 'yes') {
      const interval = setInterval(() => confetti({ particleCount: 100, spread: 70 }), 3000)
      return () => clearInterval(interval)
    }
  }, [response])

  async function handleResponse(r: 'yes' | 'maybe' | 'no') {
    if (r === 'no') {
      setShowNoConfirm(true)
      return
    }

    setResponse(r)
    await fetch(`/api/respond/${params.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: r }),
    })
  }

  async function confirmNo(final: boolean) {
    setShowNoConfirm(false)
    if (!final) return
    setResponse('no')
    await fetch(`/api/respond/${params.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: 'no' }),
    })
  }

  if (!data) return <p>Loading...</p>
  if (data.error) return <p>{data.error}</p>

  return (
    <Container>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        textAlign: 'center'
      }}>
        <Card>
          <h1>💌 To: {data.to}</h1>

          <p style={{ marginTop: '1rem', fontSize: '1.2rem', lineHeight: '1.5' }}>
            {data.message}
          </p>

          <p>From: {data.anonymous ? 'Anonymous' : data.from}</p>

          {/* Show response buttons if this is an askValentine */}
          {data.askValentine && !response && !showNoConfirm && (
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <p style={{ width: "100%", marginBottom: "0.5rem" }}>
                How do you respond?
              </p>

              <button
                style={yesStyle}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => handleResponse("yes")}
              >
                Yes 💖
              </button>

              <button
                style={maybeStyle}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => handleResponse("maybe")}
              >
                Maybe 🤔
              </button>

              <button
                style={noStyle}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => handleResponse("no")}
              >
                No 😢
              </button>

            </div>
          )}


          {/* Show No confirmation */}
          {showNoConfirm && (
            <div style={{ marginTop: '1rem' }}>
              <p>Aww 😢 Are you sure?</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button style={noStyle} onClick={() => confirmNo(true)}>
                  Yes, I’m sure 😢
                </button>
                <button style={yesStyle} onClick={() => confirmNo(false)}>
                  Wait… go back 💖
                </button>
              </div>

            </div>
          )}

          {/* Display responses */}
          {response === 'yes' && (
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'green' }}>
              Yay! 💖 They said YES! Confetti time! 🎉
            </p>
          )}

          {response === 'maybe' && (
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'orange' }}>
              They are thinking about it… 🌸 Hope is in the air!
            </p>
          )}

          {response === 'no' && (
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'red' }}>
              Oh… they said NO. 😢 Don’t worry, better luck next time!
            </p>
          )}
        </Card>
      </div>

      <div className="hearts-bg"></div>
    </Container>
  )
}
