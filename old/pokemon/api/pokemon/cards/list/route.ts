import { db } from "../../../../../lib/db/db";
import { pokemonCards } from "../../../../../lib/db/schema/pokemon_cards";
import { and, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";
  const name = searchParams.get("name") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;

  const conditions = [];

  if (name) {
    conditions.push(like(pokemonCards.name, `%${name}%`));
  }

  if (rarity) {
    conditions.push(like(pokemonCards.rarity, `%${rarity}%`));
  }

  if (set) {
    conditions.push(like(pokemonCards.setCode, `%${set}%`));
  }

  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(pokemonCards)
    .where(where)
    .orderBy(pokemonCards.cardNumber)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalCount = await db.select().from(pokemonCards).where(where);

  return NextResponse.json({
    data: rows,
    total: totalCount.length,
    pageSize,
  });
}
