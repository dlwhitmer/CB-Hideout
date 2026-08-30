import Link from "next/link";

export default function AdminDashboard() {
  return (
    <section className="bg-[#3498db] min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-1 text-black  underline decoration-3 text-center">
          Admin Dashboard
        </h1>
        <p className="text-lg font-bold text-center">
          Welcome to your admin panel.
        </p>
      </div>
      <div>
        <h2 className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[26px] underline pt-4 text-center font-bold mb-1">
          Admin Panel
        </h2>
        <h3 className="text-[18px] text-center">Dashboard</h3>
      </div>
      <div className="text-[23px] underline decoration-3 pt-5 text-black font-bold text-center">
        <h2>View Edit & Import</h2>
      </div>
      <div className="flex justify-center gap-6">
        {/* MAGIC DROPDOWN */}
        <div className="relative group">
          <div className="text-[20px] font-bold flex justify-between items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a] ">
            <span>Magic Cards</span>
            <span className="text-xs">▼</span>
          </div>

          <div className="hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md mt-1">
            <Link
              href="/admin/magic/singles"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Single Cards
            </Link>
            <Link
              href="/admin/magic/packs"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Sealed Product
            </Link>
            
          </div>
        </div>
        {/* POKEMON DROPDOWN */}
        <div className="relative group">
          <div className=" text-[20px] font-bold flex justify-between items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a] ">
            <span>Pokemon Cards</span>
            <span className="text-xs">▼</span>
          </div>

          <div className="hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md mt-1">
            <Link
              href="/admin/pokemon/singles"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Single Cards
            </Link>
            <Link
              href="/admin/pokemon/packs"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Packs
            </Link>
            <Link
              href="/admin/pokemon/sets"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Sets
            </Link>
          </div>
        </div>

        {/* YU-GI-OH DROPDOWN */}
        <div className="relative group">
          <div className="text-[20px] font-bold flex justify-between items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a]">
            <span>Yu-Gi-Oh Cards</span>
            <span className="text-xs">▼</span>
          </div>

          <div className="hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md mt-1">
            <Link
              href="/admin/yugioh/singles"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Single Cards
            </Link>
            <Link
              href="/admin/yugioh/packs"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Packs
            </Link>
            <Link
              href="/admin/yugioh/sets"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Sets
            </Link>
          </div>
        </div>

        {/* POKEMON DROPDOWN */}
        <div className="relative group">
          <div className=" text-[20px] font-bold flex justify-between items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a] ">
            <span>Add Products</span>
            <span className="text-xs">▼</span>
          </div>

          <div className="hidden group-hover:block bg-gray-900 border border-gray-700 rounded-md mt-1">
            <Link
              href="/admin/magic/products/add"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Magic Products
            </Link>
            <Link
              href="/admin/pokemon/products/add"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
              Pokemon Products
            </Link>
            <Link
              href="/admin/yugioh/products/add"
              className="block px-4 py-2 text-white hover:bg-gray-700"
            >
            Yugioh Products
            </Link>
          </div>
        </div>

        <div className="relative group pt-2">
          <Link
            href="/admin/import"
            className="text-[20px] font-bold hover:text-[#ffca3a]"
          >
            Universal Import
          </Link>
        </div>
      
      </div>

    </section>
  );
}
