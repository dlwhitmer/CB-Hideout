import { InsertLorcanaSingle } from "../db/schema/lorcana_singles";

export function mapLorcanaSingleToDB(single: any): InsertLorcanaSingle {
    return {
         Artist: single.Artist ?? "",
    SetName: single.Set_Name ?? "",
    Classifications: single.Classifications ?? "", // ✔ default empty
    DateAdded: single.Date_Added ?? "",
    SetNum: single.Set_Num ?? "",
    Color: single.Color ?? "",
    Gamemode: single.Gamemode ?? "",
    FlavorText: single.Flavor_Text ?? "",
    Abilities: single.Abilities ?? "",
    CardVariants: single.single_Variants ?? "",
    Franchise: single.Franchise ?? "",
    Image: single.Image ?? "",
    MoveCost: Number(single.Move_Cost ?? 0),
    Cost: Number(single.Cost ?? 0),
    Inkable: single.Inkable ?? false,
    Name: single.Name ?? "",
    Type: single.Type ?? "",
    // ✔ default 0 for missing numeric fields
    Lore: Number(single.Lore ?? 0),
    Willpower: Number(single.Willpower ?? 0),
    Strength: Number(single.Strength ?? 0),

    Rarity: single.Rarity ?? "",
    UniqueId: single.Unique_ID ?? "",
    CardNum: single.single_Num ?? "",

    // ✔ Body_Text is present here, but default if missing
    BodyText: single.Body_Text ?? "",
    

    DateModified: single.Date_Modified ?? "",
    SetId: single.Set_ID ?? "",
  };
}