import { db } from "../../../../lib/db/db";
import { pokemonSets } from "../../../../lib/db/schema";


export async function GET() {
  const rows = await db.select().from(pokemonSets);
  return Response.json({ data: rows });
}