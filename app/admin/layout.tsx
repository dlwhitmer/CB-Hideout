import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">

      {/* Sidebar */}

    <aside className="w-64 bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/admin" className="hover:text-blue-400">Dashboard</Link>
        <Link href="/admin/products" className="hover:text-blue-400">Products</Link>
        <Link href="/admin/products/add" className="hover:text-blue-400">Add Product</Link>
        <Link href="/admin/import" className="hover:text-blue-400">Import Card</Link>
        <Link href="/admin/users" className="hover:text-blue-400">Users</Link>
      </nav>
    </aside>



      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}