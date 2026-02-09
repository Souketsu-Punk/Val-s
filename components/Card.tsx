export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "white",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
    >
      {children}
    </div>
  );
}
