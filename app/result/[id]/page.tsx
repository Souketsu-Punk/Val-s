'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";


export default function ResultPage({ params }: { params: { id: string } }) {
  const [valentine, setValentine] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/get-valentine/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setValentine(data);
        confetti({ particleCount: 150, spread: 80 });
      });
  }, [params.id]);

  if (!valentine) return <p>Loading…</p>;
  if (valentine.error) return <p>{valentine.error}</p>;

  return (
    <div>
      <h1>💖 {valentine.to}'s Valentine</h1>
      <p>From: {valentine.anonymous ? "Anonymous" : valentine.from}</p>
    </div>
  );
}
