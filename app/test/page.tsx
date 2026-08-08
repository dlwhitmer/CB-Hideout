export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Column 1</h2>
          <p>This is the first column content.</p>
        </div>

        {/* Column 2 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Column 2</h2>
          <p>This is the second column content.</p>
        </div>

        {/* Column 3 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Column 3</h2>
          <p>This is the third column content.</p>
        </div>

      </div>
    </div>
  );
}
