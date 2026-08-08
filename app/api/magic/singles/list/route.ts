import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema";
import { and, eq, like } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";
  const colors = searchParams.get("colors") ?? "";
  const finishes = searchParams.get("finishes") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;

  const conditions = [];

  if (type) {
    conditions.push(like(magicSingles.frontTypeLine, `%${type}%`));
  }
  if (finishes) {
    conditions.push(like(magicSingles.finishes, `%${finishes}%`));
  }
  if (colors) {
    conditions.push(like(magicSingles.frontColors, `%${colors}%`));
  }

  if (rarity) {
    conditions.push(eq(magicSingles.rarity, rarity));
  }

  if (set) {
    conditions.push(eq(magicSingles.setCode, set));
  }
  // const test = await db.select().from(magicSingles).limit(5);

  // console.log("FIRST MAGIC CARDS:", test);
  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(magicSingles)
    .where(where)
    .orderBy(magicSingles.collectorNumber)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalCount = await db.select().from(magicSingles).where(where);

  return Response.json({
    data: rows,
    total: totalCount.length,
    pageSize,
  });
}
