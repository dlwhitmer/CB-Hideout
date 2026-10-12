"use client"
import Link from "next/link";


export default function AdminDashboardClient({ name }: { name: string }) {
  return (
    <section className="bg-[#3498db] min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-1 text-black  underline decoration-3 text-center">
          Admin Dashboard
        </h1>
        <p className="text-lg font-bold text-center">
          Welcome to your Admin panel {name}.
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

      <div className="relative flex flex-row justify-center items-start gap-30 w-full">
        {/*LEFT COLUMN*/}
        <div className="flex flex-col items-center gap-2">
          {/* MAGIC DROPDOWN */}
          <div className="relative group">
            <div className="text-[14px] font-bold flex items-center justify-center w-full px-2 py-2 cursor-pointer hover:text-[#ffca3a]">
              <span>Magic Cards</span>
              <span className="text-xs ml-2">▶</span>
            </div>

            {/* SUBMENU */}
            <div
              className="
        text-[13px]
        invisible
        opacity-0
        group-hover:visible
        group-hover:opacity-100
        absolute
        left-full
        top-0
        bg-gray-900
        border border-gray-700
        rounded-md
        w-48
        z-50"
            >
              <Link
                href="/admin/magic/cards"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Cards if Sets
              </Link>

              <Link
                href="/admin/magic/singles"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Single Cards
              </Link>

              <Link
                href="/admin/magic/products"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Sealed Product
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            {/* GUNDAM DROPDOWN */}
            <div className="relative group">
              <div className="text-[14px] font-bold flex items-center justify-center w-full px-2 py-2 cursor-pointer hover:text-[#ffca3a]">
                <span>Gundam Cards</span>
                <span className="text-xs ml-2">▶</span>
              </div>

              {/* SUBMENU */}
              <div
                className="
        text-[13px]
        invisible
        opacity-0
        group-hover:visible
        group-hover:opacity-100
        absolute
        left-full
        top-0
        bg-gray-900
        border border-gray-700
        rounded-md
        w-48
        z-50"
              >
                <Link
                  href="/admin/gundam/cards"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cards in Sets
                </Link>

                <Link
                  href="/admin/gundam/singles"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Single Cards
                </Link>

                <Link
                  href="/admin/gundam/products"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Sealed Product
                </Link>
              </div>
            </div>

            {/* LORCANA DROPDOWN */}
            <div className="relative group">
              <div className="text-[14px] font-bold flex justify-center items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a]">
                <span>Riftbound Cards</span>
                <span className="text-xs ml-2">▶</span>
              </div>

              <div
                className="
      text-[13px]
      hidden
      hover:block
      group-hover:block
      absolute
      left-full
      top-0
      ml-2
      bg-gray-900
      border border-gray-700
      rounded-md
      w-48
      z-50
    "
              >
                <Link
                  href="/admin/riftbound/cards"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cards of Sets
                </Link>
                <Link
                  href="/admin/riftbound/sets"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Sets
                </Link>

                <Link
                  href="/admin/riftbound/sets"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  One Set
                </Link>
              </div>
            </div>
          </div>
          <div className="relative group pt-2">
          <Link
            href="/admin/import"
            className="text-[15px] font-bold hover:text-[#ffca3a]"
          >
            Universal Import
          </Link>
        </div>
        </div>
        {/*RIGHT COLUMN*/}
        <div className="flex flex-col items-center gap-2">
          {/* LORCANA DROPDOWN */}
          <div className="relative group">
            <div className="text-[14px] font-bold flex justify-center items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a]">
              <span>Lorcana Cards</span>
              <span className="text-xs ml-2">▶</span>
            </div>

            <div
              className="
      text-[13px]
      hidden
      hover:block
      group-hover:block
      absolute
      left-full
      top-0
      ml-2
      bg-gray-900
      border border-gray-700
      rounded-md
      w-48
      z-50
    "
            >
              <Link
                href="/admin/lorcana/cards"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Cards of Sets
              </Link>
              <Link
                href="/admin/lorcana/sets"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Sets
              </Link>

              <Link
                href="/admin/lorcana/sets"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                One Set
              </Link>
            </div>
          </div>

          {/* LORCANA DROPDOWN */}
          <div className="relative group">
            <div className="text-[14px] font-bold flex justify-center items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a]">
              <span>OnePiece Cards</span>
              <span className="text-xs ml-2">▶</span>
            </div>

            <div
              className="
      text-[13px]
      hidden
      hover:block
      group-hover:block
      absolute
      left-full
      top-0
      ml-2
      bg-gray-900
      border border-gray-700
      rounded-md
      w-48
      z-50
    "
            >
              <Link
                href="/admin/onepiece/cards"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Cards of Sets
              </Link>
              <Link
                href="/admin/onepiece/sets"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Sets
              </Link>

              <Link
                href="/admin/onepiece/sets"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                One Set
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="text-[14px] font-bold flex justify-center items-center px-2 py-2 cursor-pointer hover:text-[#ffca3a]">
              <span>Add Products</span>
              <span className="text-xs ml-2">▶</span>
            </div>

            <div
              className="
      text-[13px]
      hidden
      hover:block
      group-hover:block
      absolute
      left-full
      top-0
      ml-2
      bg-gray-900
      border border-gray-700
      rounded-md
      w-48
      z-50
    "
            >
              <Link
                href="/admin/magic/products/add"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Magic
              </Link>
              <Link
                href="/admin/pokemon/products/add"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Pokemon
              </Link>
              <Link
                href="/admin/gundam/products/add"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Gundam
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
