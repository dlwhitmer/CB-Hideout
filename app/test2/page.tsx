// app/page.jsx (Next.js 13+ with App Router)
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Sticky Image Column */}
        <div className="relative">
          <div className="sticky top-20">
            <img
              src="/example.jpg"
              alt="Scrolling Image"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
    
        {/* Scrollable Content Column */}
        <div className="space-y-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="bg-white p-4 rounded shadow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
