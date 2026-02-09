import "../styles/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
