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
    <nav className="w-full bg-gray-900 border-b border-gray-700 px-6 py-3 flex items-center gap-8">
      <h1 className="text-xl font-bold text-white">Admin Panel</h1>

      <Link href="/admin/magic" className={linkClass("/admin/magic")}>
        Magic Cards
      </Link>

      <Link href="/admin/pokemon" className={linkClass("/admin/pokemon")}>
        Pokemon Cards
      </Link>
     
      <Link href="/admin/yugioh" className={linkClass("/admin/yugioh")}>
        Yu-Gi-Oh Cards
      </Link>

      <Link href="/admin/magic/import" className={linkClass("/admin/magic/import")}>
        Import Magic Cards
      </Link>

      <Link href="/admin/pokemon/import" className={linkClass("/admin/pokemon/import")}>
        Import Pokemon Cards
      </Link>
      
      <Link href="/admin/yugioh/import" className={linkClass("/admin/yugioh/import")}>
        Import Yu-Gi-Oh Cards
      </Link>

      <Link href="/admin/users" className={linkClass("/admin/users")}>
        Users
      </Link>

      <Link href="/admin/settings" className={linkClass("/admin/settings")}>
        Settings
      </Link>
    </nav>
  );
}