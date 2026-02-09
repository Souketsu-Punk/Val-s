import "../styles/globals.css";
import FloatingHearts from "@/components/FloatingHearts";

export const metadata = {
  title: "Ask Someone to Be Your Valentine 💌",
  description: "Create a cute Valentine ask and send it to someone special."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FloatingHearts />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
