"use client";

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

      // random size
      const size = 12 + Math.random() * 18;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;

      // random animation duration
      heart.style.animationDuration = 6 + Math.random() * 6 + "s";

      container.appendChild(heart);

      // cleanup
      setTimeout(() => {
        heart.remove();
      }, 12000);
    }, 600); // heart spawn rate

    return () => clearInterval(interval);
  }, []);

  return <div id="hearts-container" />;
}
