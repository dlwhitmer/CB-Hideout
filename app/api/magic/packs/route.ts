import { db } from "../../../../lib/db/db";
import { magicPacks } from "../../../../lib/db/schema";

export async function POST(req: Request) {
  const items = await req.json(); // array of cards

  const mapped = items.map((card: any) => ({
    name: card.name,
    setCode: card.set,
    imageUrl:
      card.image_url ??
      card.image_uris?.normal ??
      card.images?.logo ??
      card.images?.symbol ??
      null,
    price: card.price ?? 0,
  }));

  await db.insert(magicPacks).values(mapped);
  return Response.json({ success: true });
}
