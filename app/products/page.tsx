// force vercel rebuild
export const dynamic = "force-dynamic";
import { Product } from "@/types/product";
import { PageProps } from "@/types/page-props";
import { getDb } from "@/lib/db";



export default async function ProductsPage({ searchParams }: PageProps) {
  const db = getDb();
  const sp = await searchParams; // FIX for Next.js 15/16
  const page = parseInt(sp?.page || "1");

  const pageSize = 20;
  const offset = (page - 1) * pageSize;

 // Fetch paginated products
  const result = await db.execute({


  sql: "SELECT id, scryfall_id, name, price, image_url FROM products ORDER BY id LIMIT ? OFFSET ?",
  args: [pageSize, offset],
});


const products = (result.rows ?? []).map((row) => ({
  id: row.id,
  scryfall_id: row.scryfall_id,
  name: row.name,
  price: Number(row.price),
  image_url: row.image_url,
  set_code: row.set_code ?? null,
  collector_number: row.collector_number ?? null,
  rarity: row.rarity ?? null,
  type_line: row.type_line ?? null,
  oracle_text: row.oracle_text ?? null,
  description: row.description ?? null,
})) as Product[];

// const products = result.rows;


// Fetch total count
const totalResult = await db.execute({
  sql: "SELECT COUNT(*) as count FROM products",
});

const total = Number(totalResult.rows[0].count);
const totalPages = Math.ceil(total / pageSize);

  return (
    <div className=" min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">
      <h1 className="text-3xl font-bold mb-6 text-white">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((p) => (
        <a
          key={p.id}
          href={`/products/${p.id}`}
          className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
        >
          console.log("IMAGE URL:", product.image_url);
           <img
            src={p.image_url || "/placeholder.png"}
            alt={p.name}
            className="w-80 rounded shadow"
          />
          

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