import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="light">
      <body>{children}</body>
    </html>
  );
}
