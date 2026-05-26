"use client";
import { useState, useRef } from "react";
import Link from "next/link";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  let timeout: NodeJS.Timeout;

  return (
    <nav className="fixed top-0 left-0 right-0 z-20">
      <div className="backdrop-blur-md bg-black border-b">
        <div className="px-10 py-2 flex items-center justify-between">
          <div className=" text-white text-[20px] font-bold text-center tracking-widest">
            Arcane
          </div>

          <ul className="hidden md:flex space-x-6 text-white">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/about">About</Link>
            </li>

            {/* DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setOpen(true);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setOpen(false);
                }, 200);
              }}
            >
              <span className="cursor-pointer">Products ▾</span>

              {open && (
                <div className="absolute top-full left-0 mt-2 bg-black border border-gray-700 rounded min-w-[180px] z-50">
                  <Link
                    className="block px-4 py-2 hover:bg-gray-800"
                    href="/products"
                  >
                    Magic Cards
                  </Link>

                  <Link
                    className="block px-4 py-2 hover:bg-gray-800"
                    href="/products?type=Creature"
                  >
                    Creatures
                  </Link>

                  <Link
                    className="block px-4 py-2 hover:bg-gray-800"
                    href="/accessories"
                  >
                    Accessories
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
          {open && (
            <div className="md:hidden flex flex-col items-center gap-4 py-4 text-white">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/products">Products</Link>
              <Link href="/cart">Cart</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
