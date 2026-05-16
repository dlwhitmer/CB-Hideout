import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { scryfall_id, price, description } = await request.json();

  // Fetch card data from Scryfall
  const res = await fetch(`https://api.scryfall.com/cards/${scryfall_id}`);
  const card = await res.json();

  // Extract the fields we want
  const name = card.name;
  const set_code = card.set.toUpperCase();
  const collector_number = card.collector_number;
  const rarity = card.rarity;
  const type_line = card.type_line;
  const oracle_text = card.oracle_text || "";
  const image_url = card.image_uris?.normal || card.image_uris?.large || "";

  // Insert into SQLite
 await db.execute({
  sql: `INSERT INTO products 
    (scryfall_id, name, set_code, collector_number, rarity, type_line, oracle_text, image_url, price, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  args: [
    scryfall_id,
    name,
    set_code,
    collector_number,
    rarity,
    type_line,
    oracle_text,
    image_url,
    price,
    description,
  ],
});
  return Response.json({ success: true, name });
}