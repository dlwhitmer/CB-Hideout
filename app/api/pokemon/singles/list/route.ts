import { db } from "../../../../../lib/db/db";
import { pokemonSingles } from "../../../../../lib/db/schema/pokemon";
import { and, eq, like } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";

  const conditions = [];

  if (type) {
    conditions.push(like(pokemonSingles.types, `%${type}%`));
  }

  if (rarity) {
    conditions.push(eq(pokemonSingles.rarity, rarity));
  }

  if (set) {
    conditions.push(eq(pokemonSingles.setCode, set));
  }

  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(pokemonSingles)
    .where(where)
    .orderBy(pokemonSingles.cardNumber);

  return Response.json({
    data: rows,
    total: rows.length,
    pageSize: rows.length,
  });
}
