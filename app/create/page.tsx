"use client";

import { useState } from "react";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function Create() {
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [link, setLink] = useState<string | null>(null);

  async function submit() {
    const res = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({
        message,
        senderName,
        anonymous
      })
    });

    const data = await res.json();
    setLink(`${window.location.origin}/v/${data.id}`);
  }

  return (
    <Container>
      <Card>
        <h2>Create Your Valentine 💌</h2>

        <textarea
          placeholder="Your Valentine message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ width: "100%", height: 100 }}
        />

        {!anonymous && (
          <input
            placeholder="Your name (optional)"
            value={senderName}
            onChange={e => setSenderName(e.target.value)}
            style={{ width: "100%", marginTop: 10 }}
          />
        )}

        <label style={{ display: "block", marginTop: 10 }}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={e => setAnonymous(e.target.checked)}
          />{" "}
          Send anonymously
        </label>

        <Button onClick={submit}>Generate Link</Button>

        {link && (
          <>
            <p>Share this link (expires in 72 hours):</p>
            <code>{link}</code>
          </>
        )}
      </Card>
    </Container>
  );
}
