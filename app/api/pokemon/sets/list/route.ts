import { db } from "../../../../../lib/db/db";
import { pokemonSingles } from "../../../../../lib/db/schema/pokemon";

export async function GET() {
  const rows = await db
    .select({
      set_code: pokemonSingles.setCode,
      set_name: pokemonSingles.setName,
    })
    .from(pokemonSingles)
    .orderBy(pokemonSingles.setName);

  return Response.json(rows);   // ⭐ MUST BE AN ARRAY
}
