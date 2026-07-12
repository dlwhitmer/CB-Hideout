import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black backdrop-blur-md shadow-md sticky top-0 z-50">
      {/* Top Row: Logo + Search + Right Nav */}
      <div className="max-w-7xl mx-auto flex items-center ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/CBH_Logo.png"
            alt="Site Logo"
            width={1024}
            height={1024}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* Search Bar (desktop) */}
        <div className="flex-1 px-6 hidden md:block">
          <input
            type="text"
            placeholder="Search cards, sets, or artists…"
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow focus:outline-none"
          />
        </div>

        {/* Right-side Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white">
          <Link href="/login" className="hover:text-blue-300">
            Login
          </Link>
          <Link href="/admin-login" className="hover:text-blue-300">
            Admin
          </Link>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 md:hidden">
        <input
          type="text"
          placeholder="Search cards…"
          className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow focus:outline-none"
        />
      </div>

      {/* SECOND ROW: Horizontal Navbar */}
      {/* SECOND ROW: Horizontal Navbar */}
      <div className="w-full bg-black/80 border-t border-white/10">
        <nav className="max-w-7xl mx-auto flex items-center gap-8 px-4 py-2 text-white text-sm font-medium overflow-visible whitespace-nowrap">
          {/* MAGIC DROPDOWN */}
          <div className="relative group inline-block">
            <div className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
              Magic: The Gathering
              <span className="text-xs">▼</span>
            </div>

            {/* Dropdown */}
            <div className="absolute left-0 hidden group-hover:block bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-[9999] w-48">
              <Link
                href="/magic/singles"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Single Cards
              </Link>
              <Link
                href="/magic/packs"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Packs
              </Link>
              <Link
                href="/magic/sets"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Sets
              </Link>
            </div>
          </div>

          {/* OTHER LINKS — unchanged */}
          <div className="relative group inline-block">
            <div className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
              Pokemon
              <span className="text-xs">▼</span>
            </div>

            {/* Dropdown */}
            <div className="absolute left-0 hidden group-hover:block bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-[9999] w-48">
              <Link
                href="/pokemon/singles"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Single Cards
              </Link>
              <Link
                href="/pokemon/packs"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Packs
              </Link>
              <Link
                href="/pokemon/sets"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Sets
              </Link>
            </div>
          </div>
          <div className="relative group inline-block">
            <div className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
              Yu-gi-oh
              <span className="text-xs">▼</span>
            </div>

            {/* Dropdown */}
            <div className="absolute left-0 hidden group-hover:block bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-[9999] w-48">
              <Link
                href="/yugioh/singles"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Single Cards
              </Link>
              <Link
                href="/yugioh/packs"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Packs
              </Link>
              <Link
                href="/yugioh/sets"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Sets
              </Link>
            </div>
          </div>
          <Link href="/flesh-and-blood" className="hover:text-blue-300">
            Flesh and Blood
          </Link>
          <Link href="/star-wars" className="hover:text-blue-300">
            Star Wars Unlimited
          </Link>
          <Link href="/deals" className="hover:text-blue-300">
            Deals
          </Link>
        </nav>
      </div>
    </header>
  );
}
