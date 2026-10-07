import { db } from "../../../../../lib/db/db";
import {pokemonSets} from "../../../../../lib/db/schema/pokemon_sets";

export async function GET() {
  const rows = await db
    .select({
      set_id: pokemonSets.set_id,
      setName: pokemonSets.name,
    })
    .from(pokemonSets)
    .orderBy(pokemonSets.name);

  return Response.json(rows);
}
