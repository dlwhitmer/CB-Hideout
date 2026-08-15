"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative w-full bg-black shadow-md z-[100]">
      {/* Top Row: Logo + Search + Right Nav */}
      <div className="max-w-7xl mx-auto flex items-start justify-between  bg-black">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/images/CBH_Logo.png"
            alt="Site Logo"
            width={1024}
            height={1024}
            className="h-14 w-auto"
            priority
          />
          <span className="text-white text-[9px] sm:text-xs md:text-sm lg:text-lg font-bold whitespace-nowrap">
            THE CARDBOARD HIDEOUT
          </span>
        </Link>

        {/* Search Bar (desktop) */}
        <div className="flex-1 px-6 hidden lg:block">
          <input
            type="text"
            placeholder="Search cards, sets, or artists…"
            className="w-full mt-5 px-6 py-2 rounded-lg bg-white text-gray-900 shadow focus:outline-none"
          />
        </div>

        {/* Right-side Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link href="/login" className="hover:text-blue-300">
            Login
          </Link>
          <Link href="/admin-login" className="hover:text-blue-300">
            Admin
          </Link>
        </nav>
        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden text-white text-3xl p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 lg:hidden">
        <input
          type="text"
          placeholder="Search cards…"
          className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow focus:outline-none"
        />
      </div>

      {/* SECOND ROW: Horizontal Navbar */}
      {/* SECOND ROW: Horizontal Navbar */}
      <div className="hidden lg:block w-full bg-black/80 border-t border-white/10">
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
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 hover:bg-white/10"
              >
                Single Cards
              </Link>
              <Link
                href="/magic/packs"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 hover:bg-white/10"
              >
                Packs
              </Link>
              <Link
                href="/magic/sets"
                onClick={() => setMobileOpen(false)}
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
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-white/10 px-6 py-4">
          <div className="flex flex-col gap-4 text-white">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link href="/about" onClick={() => setMobileOpen(false)}>
              About
            </Link>

            {/* Magic */}
            <div>
              <div className="font-medium mb-2">Magic: The Gathering</div>

              <div className="ml-4 flex flex-col gap-2 text-sm text-gray-300">
                <Link
                  href="/magic/singles"
                  onClick={() => setMobileOpen(false)}
                >
                  Single Cards
                </Link>
                <Link href="/magic/packs" onClick={() => setMobileOpen(false)}>
                  Packs
                </Link>
                <Link href="/magic/sets" onClick={() => setMobileOpen(false)}>
                  Sets
                </Link>
              </div>
            </div>

            {/* Pokémon */}
            <div>
              <div className="font-medium mb-2">Pokémon</div>

              <div className="ml-4 flex flex-col gap-2 text-sm text-gray-300">
                <Link
                  href="/pokemon/singles"
                  onClick={() => setMobileOpen(false)}
                >
                  Single Cards
                </Link>
                <Link
                  href="/pokemon/packs"
                  onClick={() => setMobileOpen(false)}
                >
                  Packs
                </Link>
                <Link href="/pokemon/sets" onClick={() => setMobileOpen(false)}>
                  Sets
                </Link>
              </div>
            </div>

            {/* Yu-Gi-Oh */}
            <div>
              <div className="font-medium mb-2">Yu-Gi-Oh</div>

              <div className="ml-4 flex flex-col gap-2 text-sm text-gray-300">
                <Link
                  href="/yugioh/singles"
                  onClick={() => setMobileOpen(false)}
                >
                  Single Cards
                </Link>
                <Link href="/yugioh/packs" onClick={() => setMobileOpen(false)}>
                  Packs
                </Link>
                <Link href="/yugioh/sets" onClick={() => setMobileOpen(false)}>
                  Sets
                </Link>
              </div>
            </div>

            <Link href="/flesh-and-blood" onClick={() => setMobileOpen(false)}>
              Flesh and Blood
            </Link>

            <Link href="/star-wars" onClick={() => setMobileOpen(false)}>
              Star Wars Unlimited
            </Link>

            <Link href="/deals" onClick={() => setMobileOpen(false)}>
              Deals
            </Link>

            <Link href="/login" onClick={() => setMobileOpen(false)}>
              Login
            </Link>

            <Link href="/admin-login" onClick={() => setMobileOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
