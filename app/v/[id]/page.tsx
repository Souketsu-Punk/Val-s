"use client";

import { useEffect } from "react";
import Container from "../../../components/Container";
import Card from "../../../components/Card";
import Button from "../../../components/Button";

export default async function Valentine({ params }: any) {
  const res = await fetch(`/api/get?id=${params.id}`);
  const valentine = await res.json();

  async function respond(response: string) {
    await fetch("/api/respond", {
      method: "POST",
      body: JSON.stringify({ id: params.id, response })
    });

    if (response === "yes") {
      import("canvas-confetti").then(c =>
        c.default({ spread: 80, particleCount: 120 })
      );
    }

    setTimeout(() => {
      window.location.href = `/result/${params.id}`;
    }, 800);
  }

  return (
    <Container>
      <Card>
        <h2>
          {valentine.anonymous
            ? "Someone asked you 💌"
            : `${valentine.senderName || "Someone"} asked you 💌`}
        </h2>

        <p>{valentine.message}</p>

        <Button onClick={() => respond("yes")}>Yes 💖</Button>
        <Button onClick={() => respond("maybe")}>Maybe 😌</Button>
        <Button onClick={() => respond("no")}>No 🫶</Button>
      </Card>
    </Container>
  );
}
