
export default function Home() {
  return (
    <>

      <main className="min-h-screen bg-[url('/images/arcane-bg.webp')] bg-no-repeat bg-[length:100%_100%]">
        {/* Your homepage content */}
        {/* Watermark */}
      <div className="absolute inset-0 sticky top-[120px] flex items-center justify-center pointer-events-none z-10">
        <img
          src="/images/CBH_Logo.png"
          alt="Watermark Logo"
          className="opacity-50 h-[400px] w-auto"
        />
      </div>
      </main>
    </>
  );
}
