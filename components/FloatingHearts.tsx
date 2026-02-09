export const dynamic = "force-dynamic";

'use client';

import { useEffect } from "react";
import "../styles/hearts.css";

export default function FloatingHearts() {
  useEffect(() => {
    const container = document.getElementById("hearts-container");
    if (!container) return;

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";

      // random horizontal position
      heart.style.left = Math.random() * 100 + "vw";

      // random vertical start position
      heart.style.top = Math.random() * 100 + "vh";

      // random size
      const size = 12 + Math.random() * 18;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;

      // random animation duration
      const duration = 20 + Math.random() * 40;
      heart.style.animationDuration = `${duration}s`;

      container.appendChild(heart);

      // remove heart after animation ends
      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    }, 400); // faster spawn rate for more hearts

    return () => clearInterval(interval);
  }, []);

  return <div id="hearts-container" />;
}
