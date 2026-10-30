import { db } from "../../../../lib/db/db";
import { lorcanaSingles } from "../../../../lib/db/schema";
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
      .from(lorcanaSingles);

    const rows = await db
      .select({
        id: lorcanaSingles.id,
        Name: lorcanaSingles.Name,
        SetId: lorcanaSingles.SetId,
        SetName: lorcanaSingles.SetName,
        Image: lorcanaSingles.Image,
        ourPrice: lorcanaSingles.ourPrice,
        condition:lorcanaSingles.condition,
        Rarity: lorcanaSingles.Rarity,
      })
      .from(lorcanaSingles)
      .orderBy(desc(lorcanaSingles.id))
      .limit(limit)
      .offset(offset);

    return Response.json({
      rows,
      total,
      pageSize: limit,
    });
  } catch (error) {
    console.error("ADMIN Lorcana SINGLES ERROR:", error);

    return Response.json(
      { error: "Failed to load Lorcana singles." },
      { status: 500 },
    );
  }
}