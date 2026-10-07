import { SelectLorcanaSet } from "../db/schema/lorcana_sets";

export function mapLorcanaSetToDB(set: any): SelectLorcanaSet {
  return {
    id: 0, // placeholder if you even keep this mapper
    SetNum: set.Set_Num,
    ReleaseDate: set.Release_Date,
    Cards: set.Cards,
    Name: set.Name,
    SetID: set.Set_ID,   // ⭐ FIXED
  };
}

