import { db } from "../../../../lib/db/db";
import { onePieceSingles } from "../../../../lib/db/schema/onepiece_singles";
import { count, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") ?? "10")),
    );
    const offset = (page - 1) * limit;

    const [{ total }] = await db
      .select({ total: count() })
      .from(onePieceSingles);

    const rows = await db
      .select({
        id: onePieceSingles.id,
        cardName: onePieceSingles.cardName,
        cardSetId: onePieceSingles.cardSetId,
        setName: onePieceSingles.setName,
        cardImage: onePieceSingles.cardImage,
        marketPrice: onePieceSingles.marketPrice,
        inventoryPrice: onePieceSingles.inventoryPrice,
        ourOnePrice: onePieceSingles.ourOnePrice,
        condition:onePieceSingles.condition,
        rarity: onePieceSingles.rarity,
      })
      .from(onePieceSingles)
      .orderBy(desc(onePieceSingles.id))
      .limit(limit)
      .offset(offset);

    return Response.json({
      rows,
      total,
      pageSize: limit,
    });
  } catch (error) {
    console.error("ADMIN ONE PIECE SINGLES ERROR:", error);

    return Response.json(
      { error: "Failed to load One Piece singles." },
      { status: 500 },
    );
  }
}