import "./globals.css";
import NavBar from "./navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative min-h-screen overflow-x-hidden bg-black">
        <div className="relative z-10">
          <NavBar />

          <main className="pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}