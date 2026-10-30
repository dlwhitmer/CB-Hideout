import { db } from "../../../../lib/db/db";
import { gundamSingles } from "../../../../lib/db/schema";
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

    const [{ total }] = await db.select({ total: count() }).from(gundamSingles);

    const rows = await db
      .select({
        id: gundamSingles.id,
        productId: gundamSingles.productId,
        cardNumber: gundamSingles.cardNumber,
        name: gundamSingles.name,
        setCode: gundamSingles.setCode,
        setName: gundamSingles.setName,
        imageUrl: gundamSingles.imageUrl,
        ourPrice: gundamSingles.ourPrice,
        condition: gundamSingles.condition,
        rarity: gundamSingles.rarity,
        quantity: gundamSingles.quantity,
      })
      .from(gundamSingles)
      .orderBy(desc(gundamSingles.id))
      .limit(limit)
      .offset(offset);
    return Response.json({
      rows,
      total,
      pageSize: limit,
    });
  } catch (error) {
    console.error("ADMIN Gundam SINGLES ERROR:", error);

    return Response.json(
      { error: "Failed to load Gundam singles." },
      { status: 500 },
    );
  }
}
