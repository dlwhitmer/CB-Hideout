"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderClient() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="relative w-full bg-black shadow-md z-100">
      {/* Top Row: Logo + Search + Right Nav */}
      <div className="max-w-7xl mx-auto flex items-start justify-between bg-black">
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
          <span className="text-white text-[9px] sm:text-xs md:text-sm lg:text-xl font-bold whitespace-nowrap">
            THE CARDBOARD HIDEOUT
          </span>
        </Link>

        {/* Search Bar (desktop) */}
        <div className="flex-1 px-6 hidden lg:block">
          <input
            type="text"
            placeholder="Search cards, sets, or artists…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/search?q=${encodeURIComponent(search)}`;
              }
            }}
            className="w-full mt-5 px-6 py-2 rounded-lg bg-white text-gray-900 shadow focus:outline-none"
          />
        </div>

        {/* Right-side Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link href="/login" className="hover:text-blue-300">
            Login
          </Link>
          <Link href="/admin-login" className="hover:text-blue-300 pr-10">
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = `/search?q=${encodeURIComponent(search)}`;
            }
          }}
          className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 shadow focus:outline-none"
        />
      </div>
      {/* SECOND ROW: Horizontal Navbar */}
      <div className="hidden lg:block w-full bg-black/80 border-t  border-white/10">
        <nav className="max-w-7xl mx-auto flex items-center gap-5 px-4 py-2 text-white font-medium overflow-visible whitespace-nowrap">
          <div className="relative group inline-block ">
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-center hover:bg-white/10"
            >
            About Us
            </Link>
          </div>
          <div className="relative group inline-block ">
            <Link
              href="/magic/singles"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-center hover:bg-white/10"
            >
              Magic
            </Link>
          </div>

          {/* OTHER LINKS — unchanged */}
          <div className="relative group inline-block">
            <div className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
              <Link
                href="/gundam/singles"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Gundam
              </Link>
            </div>
          </div>
          
          <div className="relative group inline-block">
            <div className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
              <Link
                href="/lorcana/singles"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Lorcana
              </Link>
            </div>
          </div>

          <div className="relative group inline-block">
            <div className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
              <Link
                href="/onepiece/singles"
                className="block px-4 py-2 hover:bg-white/10"
              >
                One Piece
              </Link>
            </div>
          </div>

          <div className="relative group inline-block">
            <div className="flex items-center gap-1 hover:text-blue-300 cursor-pointer">
              <Link
                href="/riftbound/singles"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Riftbound
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-white/10 px-6 py-4">
          <div className=" mobile-menu-text">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link href="/about" onClick={() => setMobileOpen(false)}>
              About
            </Link>

            {/* Magic */}
            <div>
              <Link href="/magic/singles" onClick={() => setMobileOpen(false)}>
                Magic
              </Link>
            </div>

            {/* Gundam */}
            <div>
              <Link href="/gundam/singles" onClick={() => setMobileOpen(false)}>
                Gundam
              </Link>
            </div>

            {/* Lorcana */}
            <div>
              <Link
                href="/lorcana/singles"
                onClick={() => setMobileOpen(false)}
              >
                Lorcana
              </Link>
            </div>
            {/* One Piece */}
            <div>
              <Link
                href="/onepiece/singles"
                onClick={() => setMobileOpen(false)}
              >
                OnePiece
              </Link>
            </div>
            {/* RiftBound */}
            <div>
              <Link
                href="/riftbound/singles"
                onClick={() => setMobileOpen(false)}
              >
                RiftBound
              </Link>
            </div>

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
