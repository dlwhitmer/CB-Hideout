import { db } from "../../../../../lib/db/db";
import { pokemonSingles } from "../../../../../lib/db/schema/pokemon";
import { and, like, gte, lte, gt, eq, SQL } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const series = searchParams.get("series") ?? "";
  const setName = searchParams.get("set");
  const conditions: SQL[] = [];
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;

  if (type) {
    conditions.push(like(pokemonSingles.types, `%${type}%`));
  }
  if (setName) {
    conditions.push(eq(pokemonSingles.setName, setName));
  }

  if (rarity) {
    conditions.push(like(pokemonSingles.rarity, `%${rarity}%`));
  }

  const price = searchParams.get("price") ?? "";
  console.log("PRICE RECEIVED:", price);

  if (price === ".01to5") {
    conditions.push(lte(pokemonSingles.price, 5));
  }

  if (price === "5to20") {
    conditions.push(
      and(gte(pokemonSingles.price, 5), lte(pokemonSingles.price, 20)),
    );
  }

  if (price === "20plus") {
    conditions.push(gt(pokemonSingles.price, 20));
  }

  if (series) {
    conditions.push(like(pokemonSingles.series, `%${series}%`));
  }
  const rows = await db
    .select({
      id: pokemonSingles.id,
      pokemonId: pokemonSingles.pokemonId,
      name: pokemonSingles.name,
      imageSmall: pokemonSingles.imageSmall,
      setCode: pokemonSingles.setCode,
      setName: pokemonSingles.setName,
      price: pokemonSingles.price,
      rarity: pokemonSingles.rarity,
      quantity: pokemonSingles.quantity,
    })
    .from(pokemonSingles)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
  return Response.json({
    data: rows,
    total: rows.length,
    pageSize,
  });
}
