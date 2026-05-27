import { DetailPageParams } from "@/types/route-params";
import type { Product, ProductRow } from "@/types/product";

import { getDb } from "@/lib/db";
import BackButton from "@/app/backbutton";

export const dynamic = "force-dynamic";
export default async function ProductDetailPage({ params }: DetailPageParams) {
  const db = getDb();
  const p = await params; // p.id is now fully typed
  console.log("PARAM ID:", p.id);
  const result = (await db.execute({
    sql: "SELECT * FROM products WHERE id = ?",
    args: [p.id],
  })) as unknown as { rows: any[] };

  const rows = result.rows as ProductRow[];
  const row = rows[0];
  console.log("DB RESULT:", result.rows);
  if (!row) {
    return <p>Product not found</p>;
  }

  const product: Product = {
    id: Number(row.id ?? 0),
    scryfall_id: row.scryfall_id ?? "",
    name: row.name ?? "",
    set_code: row.set_code ?? "",
    collector_number: row.collector_number ?? "",
    rarity: row.rarity ?? "",
    price: Number(row.price ?? 0),
    image_url: row.image_url ?? "",
    type_line: row.type_line ?? "",
    oracle_text: row.oracle_text ?? "",
    artist: row.artist ?? "",
    description: row.description ?? "",
  };

  if (!product) {
    return <div className="p-6 text-red-400">Product not found.</div>;
  }

  return (
    <main
      className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%]
 "
    >
      <div className="p-6 max-w-5xl mx-auto text-white">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0">
            <img
              src={product.image_url || "/placeholder.png"}
              alt={product.name}
              className="w-80 rounded shadow"
            />
          </div>

          <div className="flex flex-col gap-4 flex-1 pt-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="grid grid-cols-2 gap-y-2 text-white">
              <p>
                <span className="font-semibold">Set:</span> {product.set_code}
              </p>
              <p>
                <span className="font-semibold">Collector #:</span>{" "}
                {product.collector_number}
              </p>
              <p>
                <span className="font-semibold">Rarity:</span> {product.rarity}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {product.type_line}
              </p>
              <p>
                <span className="font-semibold">Artist:</span> {product.artist}
              </p>
            </div>

            {product.oracle_text && (
              <div className="bg-black/40 p-4 rounded leading-relaxed whitespace-pre-line">
                {product.oracle_text}
              </div>
            )}

            {product.description && (
              <div className="bg-gray-500/40 p-4 rounded font-bold text-white leading-relaxed">
                {product.description}
              </div>
            )}
            <div className="flex justify-left">
              <p className="mx-15 text-green-400 text-2xl font-bold">
                ${product.price}
              </p>
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
