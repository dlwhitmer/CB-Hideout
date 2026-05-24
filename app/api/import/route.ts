import { getDb } from "@/lib/db";
import { mapScryfallToDB } from "@/lib/mapper";

export async function POST(req: Request) {
  const db = getDb();

  try {
    // get data from frontend
    const body = await req.json();

    const { scryfall_id, price, description } = body;

    // fetch ONE card from Scryfall
    const res = await fetch(`https://api.scryfall.com/cards/${scryfall_id}`);

    if (!res.ok) {
      return Response.json(
        { error: "Card not found on Scryfall" },
        { status: 404 },
      );
    }

    const card = await res.json();

    // map data
    const mapped = mapScryfallToDB(card);

    // override custom values from admin form
    mapped.price = Number(price || mapped.price || 0);
    mapped.description = description || "";

    // insert into DB
    await db.execute({
      sql: `
        INSERT OR REPLACE INTO products (
          scryfall_id,
          name,
          set_code,
          set_name,
          mana_cost,
          cmc,
          colors,
          color_identity,
          power,
          toughness,
          keywords,
          type_line,
          oracle_text,
          layout,
          card_faces,
          collector_number,
          rarity,
          price,
          image_url,
          artist,
          released_at,
          description
        ) VALUES (
          ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        )
      `,
      args: [
        mapped.scryfall_id,
        mapped.name,
        mapped.set_code,
        mapped.set_name,
        mapped.mana_cost,
        mapped.cmc,
        mapped.colors,
        mapped.color_identity,
        mapped.power,
        mapped.toughness,
        mapped.keywords,
        mapped.type_line,
        mapped.oracle_text,
        mapped.layout,
        mapped.card_faces,
        mapped.collector_number,
        mapped.rarity,
        mapped.price,
        mapped.image_url,
        mapped.artist,
        mapped.released_at,
        mapped.description,
      ],
    });

    return Response.json({
      success: true,
      card: mapped.name,
    });
  } catch (err: any) {
    console.error(err);

    return Response.json({ error: err.message }, { status: 500 });
  }
}
