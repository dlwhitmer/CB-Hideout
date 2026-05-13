import { connectDB } from "@/db/connect";
import { Product } from "../types/product";
export default async function AdminProductsPage() {
  const db = await connectDB();

  const products = await db.all<Product[]>(
    "SELECT id, scryfall_id, name, price, image_url FROM products"
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Scryfall ID</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-gray-800">
              <td className="p-2">{p.name}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2 font-mono text-xs text-gray-400">
                {p.scryfall_id}
              </td>
              <td className="p-2">
                <a
                  href={`/admin/products/${p.id}`}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}