type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled 
          ? "linear-gradient(135deg, #ffdce0, #ffc2cc)" 
          : "linear-gradient(135deg, #ff6b81, #ff87a2)",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "50px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        boxShadow: disabled 
          ? "none" 
          : "0 4px 15px rgba(255, 105, 135, 0.4)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(255, 105, 135, 0.6)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 15px rgba(255, 105, 135, 0.4)";
        }
      }}
    >
      {children}
    </button>
  );
}
