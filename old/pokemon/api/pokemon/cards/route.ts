import { db } from "../../../../lib/db/db";
import {pokemonCards} from "../../../../lib/db/schema/pokemon_cards"; // ⭐ add this
import { eq, and, like } from "drizzle-orm"; // ⭐ add this

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = (page - 1) * limit;

  // ⭐ read filters
  const name = searchParams.get("name") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";

  // ⭐ build WHERE conditions
  const conditions = [];

  if (name) {
    conditions.push(like(pokemonCards.name, `%${name}%`));
  }
  if (rarity) {
    conditions.push(like(pokemonCards.rarity, `%${rarity}%`));
  }
  if (set) {
    conditions.push(eq(pokemonCards.setCode, set));
  }

  // ⭐ apply WHERE to total count
  const allRows = await db
    .select()
    .from(pokemonCards)
    .where(conditions.length ? and(...conditions) : undefined);

  const total = allRows.length;

  // ⭐ apply WHERE to paginated rows
  const rows = await db
    .select()
    .from(pokemonCards)
    .where(conditions.length ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset);

  console.log("ADMIN POKEMON ROW COUNT:", rows.length);
  console.log("ADMIN POKEMON TOTAL:", total);
  return Response.json({
    rows,
    total,
    pageSize: limit,
  });
}
