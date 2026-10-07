import { InsertRiftboundSet } from "../db/schema/riftbound_sets";

export function mapRiftboundSetToDB(set: any): InsertRiftboundSet {
  return {
    name: set.name,
    apiId: set.api_id,
    code: set.code,
    cardCount: set.card_count,
    releaseDate: set.release_date,
  };
}
