import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

export default function AdminNavbar() {
  const segment = useSelectedLayoutSegment();

  const linkClass = (path: string) =>
    segment === path ? "text-white font-semibold" : "text-gray-400 hover:text-white";

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <nav className="space-y-4">
        <Link href="/admin/magic" className={linkClass("magic")}>
          Magic Cards
        </Link>

        <Link href="/admin/pokemon" className={linkClass("pokemon")}>
          Pokémon Cards
        </Link>

        <Link href="/admin/yugioh" className={linkClass("yugioh")}>
          Yu‑Gi‑Oh Cards
        </Link>

        <hr className="border-gray-700" />

        <Link href="/admin/magic/import" className={linkClass("magic")}>
          Import Magic Cards
        </Link>

        <Link href="/admin/pokemon/import" className={linkClass("pokemon")}>
          Import Pokémon Cards
        </Link>

        <Link href="/admin/yugioh/import" className={linkClass("yugioh")}>
          Import Yu‑Gi‑Oh Cards
        </Link>

        <hr className="border-gray-700" />

        <Link href="/admin/users" className={linkClass("users")}>
          Users
        </Link>

        <Link href="/admin/settings" className={linkClass("settings")}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}
