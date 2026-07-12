import { db } from "../../../../lib/db/db";
import { magicSingles } from "../../../../lib/db/schema/magic";
import { eq, and, like } from "drizzle-orm";   // ⭐ add this

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = 20;

  const offset = (page - 1) * pageSize;

  // ⭐ read filters
  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";

  // ⭐ build WHERE conditions
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

  // ⭐ apply WHERE to total count
  const allRows = await db
    .select()
    .from(magicSingles)
    .where(conditions.length ? and(...conditions) : undefined);

  const total = allRows.length;

  // ⭐ apply WHERE to paginated rows
  const rows = await db
    .select()
    .from(magicSingles)
    .where(conditions.length ? and(...conditions) : undefined)
    .limit(pageSize)
    .offset(offset);

  return Response.json({
    rows,
    total,
    pageSize,
  });
}
