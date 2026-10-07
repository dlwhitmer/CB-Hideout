import { NewPokemonSet } from "../db/schema/pokemon_sets";

export function mapPokemonSetToDB(set: any): NewPokemonSet {
  return {
    set_id: set.id,
    name: set.name,
    series: set.series,
    printedTotal: set.printed_total,
    total: set.total,
    pctgo_code: set.ptcgo_code,
    releaseDate: set.release_date,
    updatedAt: set.updated_at,
    logoUrl: set.images?.logo ?? null,
    symbolUrl: set.images?.symbol ?? null,
  };
}
