import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:text-blue-400">
            Dashboard
          </Link>

          <h2 className="underline decoration-4 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            View & Edit Products
          </h2>
          {/* MAGIC DROPDOWN */}
          <div className="relative group">
            <div className="flex justify-between items-center px-2 py-2 cursor-pointer hover:text-blue-400">
              <span>Magic Cards</span>
              <span className="text-xs">▼</span>
            </div>

            <div className="hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md mt-1">
              <Link
                href="/admin/magic/singles"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Single Cards
              </Link>
              <Link
                href="/admin/magic/packs"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Packs
              </Link>
              <Link
                href="/admin/magic/sets"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Sets
              </Link>
            </div>
          </div>

          {/* POKEMON DROPDOWN */}
          <div className="relative group">
            <div className="flex justify-between items-center px-2 py-2 cursor-pointer hover:text-blue-400">
              <span>Pokemon Cards</span>
              <span className="text-xs">▼</span>
            </div>

            <div className="hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md mt-1">
              <Link
                href="/admin/pokemon/singles"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Single Cards
              </Link>
              <Link
                href="/admin/pokemon/packs"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Packs
              </Link>
              <Link
                href="/admin/pokemon/sets"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Sets
              </Link>
            </div>
          </div>

          {/* YU-GI-OH DROPDOWN */}
          <div className="relative group">
            <div className="flex justify-between items-center px-2 py-2 cursor-pointer hover:text-blue-400">
              <span>Yu-Gi-Oh Cards</span>
              <span className="text-xs">▼</span>
            </div>

            <div className="hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md mt-1">
              <Link
                href="/admin/yugioh/singles"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Single Cards
              </Link>
              <Link
                href="/admin/yugioh/packs"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Packs
              </Link>
              <Link
                href="/admin/yugioh/sets"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Sets
              </Link>
            </div>
          </div>

          <h2 className="underline decoration-4 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            Add Products
          </h2>
          <Link href="/admin/magic/add/" className="hover:text-blue-400">
            Add Product
          </Link>

          <h2 className="underline decoration-2 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            Import Cards
          </h2>
          <Link href="/admin/import" className="hover:text-blue-400">
            Universal Import
          </Link>

          <h2 className="underline decoration-4 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            Edit Users
          </h2>
          <Link href="/admin/users" className="hover:text-blue-400">
            Users
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
