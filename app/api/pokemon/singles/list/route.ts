import { db } from "../../../../../lib/db/db";
import { pokemonSingles } from "../../../../../lib/db/schema/pokemon";
import { and, like, gte, lte, gt, eq, sql, SQL } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const series = searchParams.get("series") ?? "";
  const setName = searchParams.get("set") ?? "";
  const price = searchParams.get("price") ?? "";

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  const conditions: SQL[] = [];

  if (type) conditions.push(like(pokemonSingles.types, `%${type}%`));
  if (setName) conditions.push(eq(pokemonSingles.setName, setName));
  if (rarity) conditions.push(like(pokemonSingles.rarity, `%${rarity}%`));
  if (series) conditions.push(like(pokemonSingles.series, `%${series}%`));

  if (price === ".01to5") conditions.push(lte(pokemonSingles.price, 5));
  if (price === "5to20")
    conditions.push(
      and(gte(pokemonSingles.price, 5), lte(pokemonSingles.price, 20)),
    );
  if (price === "20plus") conditions.push(gt(pokemonSingles.price, 20));

  const where = conditions.length ? and(...conditions) : undefined;

  // ⭐ COUNT(*) for total pages
  const totalRows = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(pokemonSingles)
    .where(where);

  const total = totalRows[0].count;

  // ⭐ Paginated rows
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
    .where(where)
    .limit(pageSize)
    .offset(offset);

  return Response.json({
    data: rows,
    total,
    pageSize,
  });
}
