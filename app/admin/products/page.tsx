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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);

  const res = await fetch(`${baseUrl}/api/products/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }

  const data = await res.json();

  return data.products; // ✅ THIS is the missing piece
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
      <div className="grid grid-cols-[60px_150px_110px_100px_120px_80px_150px] gap-4 px-3 py-2 font-bold text-gray-700 border-b bg-gray-100 rounded-t-lg">
        <div className="pl-2">Image</div>
        <div className="pl-12">Scryfall ID</div>
        <div className="pl-11">Name</div>
        <div className="pl-8">Set</div>
        <div className="pl-2">Rarity</div>
        <div className="-pl-">Price</div>
        <div className="pl-15">Actions</div>
      </div>

      {/* PRODUCT ROWS */}
      <div className="space-y-2 mt-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-[80px_150px_120px_100px_120px_80px_150px] items-center gap-4 border rounded-lg p-3 bg-white shadow"
          >
            {/* IMAGE */}
            <img
              src={p.image_url}
              alt={p.name}
              className="w-20 h-24 flex justify-center object-cover rounded"
            />

            {/* SCRYFALL ID */}
            <p className="text-sm text-center font-bold text-black">
              {p.scryfall_id}
            </p>

            {/* NAME */}
            <p className="text-center text-sm text-gray-600 font-semibold">
              {p.name}
            </p>

            {/* SET CODE */}
            <p className="text-sm text-black font-bold">
              {p.set_code.toUpperCase()}
            </p>

            {/* RARITY */}
            <p className="text-sm text-black font-bold">{p.rarity}</p>

            {/* PRICE */}
            <p className="text-sm text-black font-bold">
              ${Number(p.price).toFixed(2)}
            </p>

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
