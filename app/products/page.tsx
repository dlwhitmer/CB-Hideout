import { connectDB } from "@/db/connect";
export const dynamic = "force-dynamic"; 

export default async function ProductsPage({ searchParams }: any) {
  const sp = await searchParams; // FIX for Next.js 15/16
  const page = parseInt(sp?.page || "1");

  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  const db = connectDB();

  const products = db
    .prepare(
      "SELECT id, scryfall_id, name, price, image_url FROM products ORDER BY id LIMIT ? OFFSET ?"
    )
    .all(pageSize, offset);

  const total = db.prepare("SELECT COUNT(*) as count FROM products").get();
  const totalPages = Math.ceil(total.count / pageSize);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((p: any) => (
          <a
            key={p.id}
            href={`/products/${p.scryfall_id}`}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
          >
            <img src={p.image_url} alt={p.name} className="rounded mb-2 w-full" />
            <h2 className="font-semibold text-white">{p.name}</h2>
            <p className="text-gray-400 text-sm">${p.price}</p>
          </a>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8 text-white">
        {page > 1 && (
          <a href={`/products?page=${page - 1}`} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
            Previous
          </a>
        )}

        {page < totalPages && (
          <a href={`/products?page=${page + 1}`} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
            Next
          </a>
        )}
      </div>
    </div>
  );
}