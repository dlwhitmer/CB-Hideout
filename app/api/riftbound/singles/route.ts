import { db } from "../../../../lib/db/db";
import { riftboundSingles } from "../../../../lib/db/schema";
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
      .from(riftboundSingles);

    const rows = await db
      .select({
        id: riftboundSingles.id,
        name: riftboundSingles.name,
        riftboundId: riftboundSingles.riftboundId,
        set:riftboundSingles.set,
        supertype:riftboundSingles.supertype,
        artist:riftboundSingles.artist,
        setName: riftboundSingles.setName,
        imgUrl: riftboundSingles.imgUrl,
        rarity: riftboundSingles.rarity,
        num:riftboundSingles.num,
        type:riftboundSingles.type,
      })
      .from(riftboundSingles)
      .orderBy(desc(riftboundSingles.id))
      .limit(limit)
      .offset(offset);

    return Response.json({
      rows,
      total,
      pageSize: limit,
    });
  } catch (error) {
    console.error("ADMIN RIFTBOUND SINGLES ERROR:", error);

    return Response.json(
      { error: "Failed to load RIFTBOUND singles." },
      { status: 500 },
    );
  }
}