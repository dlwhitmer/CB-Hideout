import { db } from "../../../../../lib/db/db";
import {pokemonCards} from "../../../../../lib/db/schema/pokemon_cards";

export async function POST(req: Request) {
  const body = await req.json();
  const inserted = await db.insert(pokemonCards).values(body).returning();
  return Response.json({ data: inserted[0] });
}
