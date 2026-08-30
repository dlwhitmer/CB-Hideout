import {NewYugiohSet} from "../db/schema/yugioh_sets";

export function mapYugiohSetToDB(set: any): NewYugiohSet {
  return {
    setCode: set.code,
    setName: set.name,
    setType: set.set_type,
    releaseDate: set.released_at,
    totalCards: set.total_cards,
   
  };
}