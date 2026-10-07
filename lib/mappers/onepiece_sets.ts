import { InsertOnePieceSet } from "../db/schema/onepiece_set";

export function mapOnePieceSetToDb(set: any): InsertOnePieceSet {
  return {
    setName: set.set_name,
    setId: set.set_id,
  };
}
