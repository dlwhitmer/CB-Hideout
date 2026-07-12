import { db } from "../../../../../lib/db/db";
import { pokemonSets } from "../../../../../lib/db/schema";

export async function POST(req: Request) {
  const body = await req.json();

  const inserted = await db.insert(pokemonSets).values(body).returning();
  return Response.json({ data: inserted[0] });
}