import { InsertGundamSet } from "../db/schema/gundam_sets";

export function mapGundamSetToDB(set: any): InsertGundamSet {
  return {
    setCode: set.set_code,
    setName: set.set_name,
    cardCount: set.card_count,
  };
}