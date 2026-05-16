export const dynamic = "force-dynamic";

import DeleteButton from "./DeleteButton";
import { Product } from "@/types/product";

export default async function ProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const products: Product[] = await res.json();



  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Admin — Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((p) => (
          <div
           key={String(p.id)}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="rounded mb-2 w-full"
            />

            <h2 className="font-semibold text-white">{p.name}</h2>

            <p className="text-gray-400 text-sm">
              {p.set_code.toUpperCase()} — #{p.collector_number}
            </p>

            <p className="text-gray-400 text-sm capitalize">{p.rarity}</p>

            <p className="text-green-400 font-bold mt-1">${p.price}</p>

            {/* Delete Button */}
          <DeleteButton id={p.id} />
          </div>
        ))}
      </div>
    </div>
  );
}