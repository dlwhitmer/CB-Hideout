import Link from "next/link";
import DeleteButton from "./DeleteButton";


interface Product {
  id: number;
  name: string;
  price: number | string;
  description: string | null;
  scryfall_id: string;
  set_code: string;
  collector_number: string;
  rarity: string;
  type_line: string;
  oracle_text: string | null;
  artist: string;
  image_url: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("/api/products/list", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }

  return res.json();
}

export default async function ProductsListPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          href="/admin/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      {/* HEADER ROW */}
      <div className="grid grid-cols-[80px_150px_1fr_100px_120px_80px_150px] gap-4 px-3 py-2 font-bold text-gray-700 border-b bg-gray-100 rounded-t-lg">
        <div>Image</div>
        <div>Scryfall ID</div>
        <div>Name</div>
        <div>Set</div>
        <div>Rarity</div>
        <div>Price</div>
        <div className="text-right">Actions</div>
      </div>

      {/* PRODUCT ROWS */}
      <div className="space-y-2 mt-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-[80px_150px_1fr_100px_120px_80px_150px] items-center gap-4 border rounded-lg p-3 bg-white shadow"
          >
            {/* IMAGE */}
            <img
              src={p.image_url}
              alt={p.name}
              className="w-16 h-20 object-cover rounded"
            />

            {/* SCRYFALL ID */}
            <p className="text-sm font-mono text-gray-700">{p.scryfall_id}</p>

            {/* NAME */}
            <p className="font-semibold">{p.name}</p>

            {/* SET CODE */}
            <p className="text-sm text-gray-600">{p.set_code.toUpperCase()}</p>

            {/* RARITY */}
            <p className="text-sm text-gray-600">{p.rarity}</p>

            {/* PRICE */}
            <p className="font-bold">${Number(p.price).toFixed(2)}</p>

            {/* ACTIONS */}
            <div className="flex gap-2 justify-end">
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <DeleteButton id={String(p.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}