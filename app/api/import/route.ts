export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  const db = getDb();

  const { scryfall_id, price, description } = await request.json();

  // Fetch card data
  const res = await fetch(`https://api.scryfall.com/cards/${scryfall_id}`);
  const card = await res.json();

  // Handle Scryfall error responses
  if (card.object === "error") {
    return Response.json(
      { error: "Invalid Scryfall ID", details: card.details },
      { status: 400 }
    );
  }

  const name = card.name ?? "";
  const set_code = card.set?.toUpperCase() ?? "";
  const collector_number = card.collector_number ?? "";
  const rarity = card.rarity ?? "";
  const type_line = card.type_line ?? "";
  const oracle_text = card.oracle_text ?? "";
  const artist = card.artist || "";
  const image_url =
    card.image_uris?.normal ||
    card.image_uris?.large ||
    card.card_faces?.[0]?.image_uris?.normal ||
    card.card_faces?.[0]?.image_uris?.large || "";

   
  await db.execute({
    sql: `INSERT INTO products 
      (scryfall_id, name, set_code, collector_number, rarity, type_line, oracle_text, image_url, price, artist, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      scryfall_id,
      name,
      set_code,
      collector_number,
      rarity,
      type_line,
      oracle_text,
      image_url,
      price ?? "",
      artist ?? "",
      description ?? "",
    ],
  });

  return Response.json({ success: true, name });
}