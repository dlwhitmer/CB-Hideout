import { db } from "../../../../../lib/db/db";
import { magicSingles, magicPrices } from "../../../../../lib/db/schema";
import { and, eq, like, getTableColumns } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";

  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";
  const colors = searchParams.get("colors") ?? "";
  const finishes = searchParams.get("finishes") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 10;

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
  if (search) {
    conditions.push(like(magicSingles.name, `%${search}%`));
  }
  // const test = await db.select().from(magicSingles).limit(5);

  // console.log("FIRST MAGIC CARDS:", test);
  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select({
      ...getTableColumns(magicSingles),
      ourPrice: magicPrices.ourPrice,
    })
    .from(magicSingles)
    .leftJoin(magicPrices, eq(magicSingles.scryfallId, magicPrices.scryfallId))
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
