import "./globals.css";
import "./app.css";
import Header from "./components/Hearder";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative min-h-screen overflow-x-hidden bg-black">
       
        <div className="relative">
          <Header/>

          <main className="pt-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
