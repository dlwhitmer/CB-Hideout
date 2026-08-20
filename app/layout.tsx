import "./globals.css";
import "./app.css";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen overflow-x-hidden">
        <Header />

        <main>{children}</main>
      </body>
    </html>
  );
}
