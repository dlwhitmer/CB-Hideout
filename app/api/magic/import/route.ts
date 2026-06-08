import { client } from "@/lib/db";
import { mapScryfallToDB } from "@/lib/mappers/magic";


export async function POST(req: Request) {
  const db = client;

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
        mapped.scryfallId,
        mapped.name,
        mapped.setCode,
        mapped.setName,
        mapped.manaCost,
        mapped.cmc,
        mapped.colors,
        mapped.colorIdentity,
        mapped.power,
        mapped.toughness,
        mapped.keywords,
        mapped.typeLine,
        mapped.oracleText,
        mapped.layout,
        mapped.cardFaces,
        mapped.collectorNumber,
        mapped.rarity,
        mapped.price,
        mapped.imageUrl,
        mapped.artist,
        mapped.releasedAt,
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
