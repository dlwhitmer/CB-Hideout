import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as pokemon from "@/lib/db/schema/pokemon";
import { eq, like, and, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = 20;

    const rarity = searchParams.get("rarity");
    const type = searchParams.get("type");

    const offset = (page - 1) * pageSize;

    const conditions = [];

    if (rarity) {
      conditions.push(eq(pokemon.pokemonCards.rarity, rarity));
    }

    if (type) {
      conditions.push(like(pokemon.pokemonCards.types, `%${type}%`));
    }

    const rows = await db
      .select()
      .from(pokemon.pokemonCards)
      .where(conditions.length ? and(...conditions) : undefined)
      .limit(pageSize)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(pokemon.pokemonCards)
      .where(conditions.length ? and(...conditions) : undefined);

    const total = totalResult[0]?.count ?? 0;
    console.log("ROWS:", rows);
    console.log("TOTAL RESULT:", totalResult);
    console.log("TOTAL:", total);
    return NextResponse.json({
      page,
      pageSize,
      total,
      rows,
    });
  } catch (err: any) {
    console.error("POKEMON LIST API ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
