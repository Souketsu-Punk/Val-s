"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Create() {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState<string | null>(null);

  async function submit() {
    const res = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setLink(`${window.location.origin}/v/${data.id}`);
  }

  return (
    <Container>
      <Card>
        <h2>Your Valentine Message</h2>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ width: "100%", height: 100 }}
        />
        <Button onClick={submit}>Generate Link</Button>

        {link && (
          <>
            <p>Share this link:</p>
            <code>{link}</code>
          </>
        )}
      </Card>
    </Container>
  );
}
