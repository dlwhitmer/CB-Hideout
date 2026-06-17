"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname.startsWith(path)
      ? "text-white font-semibold"
      : "text-gray-400 hover:text-white";

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <nav className="space-y-4">

        <Link href="/admin/magic" className={linkClass("/admin/magic")}>
          Magic Cards
        </Link>

        <Link href="/admin/pokemon" className={linkClass("/admin/pokemon")}>
          Pokémon Cards
        </Link>

        <Link href="/admin/yugioh" className={linkClass("/admin/yugioh")}>
          Yu‑Gi‑Oh Cards
        </Link>

        <hr className="border-gray-700" />

        <Link href="/admin/magic/import" className={linkClass("/admin/magic/import")}>
          Import Magic Cards
        </Link>

        <Link href="/admin/pokemon/import" className={linkClass("/admin/pokemon/import")}>
          Import Pokémon Cards
        </Link>

        <Link href="/admin/yugioh/import" className={linkClass("/admin/yugioh/import")}>
          Import Yu‑Gi‑Oh Cards
        </Link>

        <hr className="border-gray-700" />

        <Link href="/admin/users" className={linkClass("/admin/users")}>
          Users
        </Link>

        <Link href="/admin/settings" className={linkClass("/admin/settings")}>
          Settings
        </Link>

      </nav>
    </aside>
  );
}
