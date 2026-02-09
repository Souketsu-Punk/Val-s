export default function Button({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 18px",
        borderRadius: 8,
        border: "none",
        background: "#ff4d6d",
        color: "white",
        fontSize: 16,
        marginTop: 12
      }}
    >
      {children}
    </button>
  );
}
