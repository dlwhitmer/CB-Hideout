"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Check login state
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUserId(data.userId ?? null))
      .catch(() => setUserId(null));
  }, []);

  // Logout handler
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.reload();
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-20">
      <div className="backdrop-blur-md bg-black border-b">
        <div className="px-10 py-2 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/CBH_Logo.png"
              alt="Logo"
              width={45}
              height={45}
              className="object-contain"
            />
            <span className="text-white text-[12px] lg:text-[20px] font-bold">
              THE CARDBOARD HIDEOUT
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-white items-center">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>

            {/* Desktop Products Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setDesktopDropdownOpen(true);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setDesktopDropdownOpen(false);
                }, 200);
              }}
            >
              <span className="cursor-pointer">Products ▾</span>

              {desktopDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-black border border-gray-700 rounded min-w-[180px] z-50">
                  <Link className="block px-4 py-2 hover:bg-gray-800" href="/magic/">Magic Cards</Link>
                  <Link className="block px-4 py-2 hover:bg-gray-800" href="/pokemon/">Pokemon Cards</Link>
                  <Link className="block px-4 py-2 hover:bg-gray-800" href="/yugioh/">Yu-Gi-Oh Cards</Link>
                  <Link className="block px-4 py-2 hover:bg-gray-800" href="/accessories/">Accessories</Link>
                </div>
              )}
            </li>

            <li><Link href="/cart">Cart</Link></li>

            {/* Auth Section */}
            {userId ? (
              <>
                <li><Link href="/account">Account</Link></li>
                <li>
                  <button onClick={handleLogout} className="hover:text-gray-300">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link href="/login">Login</Link></li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 py-4 text-white border-t border-gray-700">

            <Link href="/">Home</Link>
            <Link href="/about">About</Link>

            {/* Mobile Products Dropdown */}
            <div className="w-full px-6">
              <button
                className="w-full text-left flex justify-between items-center"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              >
                <span>Products</span>
                <span>{mobileProductsOpen ? "▴" : "▾"}</span>
              </button>

              {mobileProductsOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  <Link href="/magic/">Magic Cards</Link>
                  <Link href="/pokemon/">Pokemon Cards</Link>
                  <Link href="/yugioh/">Yu-Gi-Oh Cards</Link>
                  <Link href="/accessories/">Accessories</Link>
                </div>
              )}
            </div>

            <Link href="/cart">Cart</Link>

            {userId ? (
              <>
                <Link href="/account">Account</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
