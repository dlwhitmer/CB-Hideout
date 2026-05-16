export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();


  const result = await db.execute({
    sql: `
      SELECT id, scryfall_id, name, set_code, collector_number, rarity, price, image_url
      FROM products
      ORDER BY id
    `,
  });

  const products = result.rows.map((row: any) => ({
    id: String(row.id),
    scryfall_id: row.scryfall_id ?? "",
    name: row.name ?? "",
    set_code: row.set_code ?? "",
    collector_number: row.collector_number ?? "",
    rarity: row.rarity ?? "",
    price: Number(row.price ?? 0),
    image_url: row.image_url ?? "",
  }));

  return Response.json(products);
}