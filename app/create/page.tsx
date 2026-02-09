'use client'
export const dynamic = "force-dynamic";

import { useState } from "react"
import Container from "../../components/Container"
import Card from "../../components/Card"
import Button from "../../components/Button"
import { templates } from "../../lib/templates"

export default function Create() {
  const [recipientName, setRecipientName] = useState("")
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [askValentine, setAskValentine] = useState(false)
  const [link, setLink] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  function selectTemplate(template: string) {
    setMessage(template)
  }

  async function submit() {
    if (!recipientName.trim()) {
      alert("Please enter a recipient name!")
      return
    }
    if (!message.trim()) {
      alert("Please enter a message!")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: senderName,
          to: recipientName,
          message,
          anonymous,
          askValentine
        }),
      })

      const data = await res.json()

      if (data.id) {
        const newLink = `${window.location.origin}/v/${data.id}`
        setLink(newLink)
        setCopied(false)
      } else {
        alert(data.error || "Failed to create Valentine. Try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  async function copyLink() {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Container>
      <Card>
        <h2>Create Your Valentine 💌</h2>

        <input
          placeholder="Recipient's name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label style={{ display: "block", marginBottom: 10 }}>
          <input
            type="checkbox"
            checked={askValentine}
            onChange={(e) => setAskValentine(e.target.checked)}
          />{" "}
          Ask them to be your Valentine?
        </label>

        {askValentine && (
          <div style={{ marginBottom: 10 }}>
            <p>Pick a template or type your own message:</p>
            {templates.map((t, i) => (
              <Button key={i} onClick={() => selectTemplate(t)}>
                {t}
              </Button>
            ))}
          </div>
        )}

        <textarea
          placeholder="Your Valentine message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", height: 100 }}
        />

        {!anonymous && (
          <input
            placeholder="Your name (optional)"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            style={{ width: "100%", marginTop: 10 }}
          />
        )}

        <label style={{ display: "block", marginTop: 10 }}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />{" "}
          Send anonymously
        </label>

        <Button onClick={submit} disabled={loading}>
          {loading ? "Creating..." : "Generate Link"}
        </Button>

        {link && (
          <div style={{ marginTop: 15 }}>
            <p>Share this link (expires in 72 hours):</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <code style={{ wordBreak: "break-all" }}>{link}</code>
              <Button onClick={copyLink}>{copied ? "Copied!" : "Copy"}</Button>
            </div>
          </div>
        )}
      </Card>
    </Container>
  )
}
