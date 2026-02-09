'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffe0e6, #ffb3c6)", // soft pink gradient
        padding: 24,
        borderRadius: 20,
        boxShadow: "0 10px 30px rgba(255, 105, 135, 0.3)", // warm pink glow
        border: "2px solid #ff6b81",
        color: "#660033",
        maxWidth: "500px",
        margin: "20px auto",
        fontFamily: "'Comic Neue', cursive",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* optional floating heart accent */}
      <div
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          backgroundColor: "#ff6b81",
          transform: "rotate(45deg)",
          borderRadius: "50% 50% 50% 50%",
          top: "-10px",
          right: "-10px",
          opacity: 0.3,
        }}
      />
      {children}
    </div>
  );
}
