import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema";
import { and, eq, like } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";

  const conditions = [];

  if (type) {
    conditions.push(like(magicSingles.type_line, `%${type}%`));
  }

  if (rarity) {
    conditions.push(eq(magicSingles.rarity, rarity));
  }

  if (set) {
    conditions.push(eq(magicSingles.set_code, set));
  }

  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(magicSingles)
    .where(where)
    .orderBy(magicSingles.collector_number);

  return Response.json({
    data: rows,          // ✔ matches public page
    total: rows.length,  // ✔ matches public page
    pageSize: rows.length // ✔ matches public page
  });
}
