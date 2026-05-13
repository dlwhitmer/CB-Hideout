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

      <Link href="/admin/products" className={linkClass("/admin/products")}>
        Products
      </Link>

      <Link href="/admin/import" className={linkClass("/admin/import")}>
        Import Card
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