import { db } from "../../../../lib/db/db";
import { magicSingles } from "../../../../lib/db/schema/magic_singles";
import { eq, and, like } from "drizzle-orm"; // ⭐ add this

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = (page - 1) * limit;

  // ⭐ read filters
  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";

  // ⭐ build WHERE conditions
  const conditions = [];

  if (type) {
    conditions.push(like(magicSingles.frontTypeLine, `%${type}%`));
  }
  if (type) {
    conditions.push(like(magicSingles.backTypeLine, `%${type}%`));
  }
  if (rarity) {
    conditions.push(eq(magicSingles.rarity, rarity));
  }

  if (set) {
    conditions.push(eq(magicSingles.setCode, set));
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
    .limit(limit)
    .offset(offset);

  console.log("ADMIN MAGIC ROW COUNT:", rows.length);
  console.log("ADMIN MAGIC TOTAL:", total);
  return Response.json({
    rows,
    total,
    pageSize: limit,
  });
}
