import "./globals.css";
import "./app.css";
import HeaderServer from "./components/HeaderServer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen overflow-x-hidden">
        <HeaderServer />
        <main>{children}</main>
      </body>
    </html>
  );
}
