import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:text-blue-400">
            Dashboard
          </Link>

          <h2 className="underline decoration-4 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            View & Edit Products
          </h2>
          <Link href="/admin/magic/" className="hover:text-blue-400">
            Magic Cards
          </Link>
          <Link href="/admin/pokemon/" className="hover:text-blue-400">
            Pokemon Cards
          </Link>
          <Link href="/admin/yugioh/" className="hover:text-blue-400">
            Yu-Gi-Oh Cards
          </Link>

          <h2 className="underline decoration-4 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            Add Products
          </h2>
          <Link href="/admin/magic/add/" className="hover:text-blue-400">
            Add Product
          </Link>

          <h2 className="underline decoration-2 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            Import Cards
          </h2>
          <Link href="/admin/magic/import" className="hover:text-blue-400">
            Import Magic Card
          </Link>
          <Link href="/admin/pokemon/import" className="hover:text-blue-400">
            Import Pokemon Card
          </Link>
          <Link href="/admin/yugioh/import" className="hover:text-blue-400">
            Import Yu-Gi-Oh Card
          </Link>

          <h2 className="underline decoration-4 decoration-[#fff000] text-[#fff000] text-[16px] font-bold mt-2 mb-1">
            Edit Users
          </h2>
          <Link href="/admin/users" className="hover:text-blue-400">
            Users
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
