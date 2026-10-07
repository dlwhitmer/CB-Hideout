import { InsertLorcanaCard } from "../db/schema";

export function mapLorcanaCardToDB(card: any): InsertLorcanaCard {
  return {
    Artist: card.Artist ?? "",
    SetName: card.Set_Name ?? "",
    Classifications: card.Classifications ?? "", // ✔ default empty
    DateAdded: card.Date_Added ?? "",
    SetNum: card.Set_Num ?? "",
    Color: card.Color ?? "",
    Gamemode: card.Gamemode ?? "",
    FlavorText: card.Flavor_Text ?? "",
    Abilities: card.Abilities ?? "",
    CardVariants: card.Card_Variants ?? "",
    Franchise: card.Franchise ?? "",
    Image: card.Image ?? "",
    MoveCost: Number(card.Move_Cost ?? 0),
    Cost: Number(card.Cost ?? 0),
    Inkable: card.Inkable ?? false,
    Name: card.Name ?? "",
    Type: card.Type ?? "",
    // ✔ default 0 for missing numeric fields
    Lore: Number(card.Lore ?? 0),
    Willpower: Number(card.Willpower ?? 0),
    Strength: Number(card.Strength ?? 0),

    Rarity: card.Rarity ?? "",
    UniqueID: card.Unique_ID ?? "",
    CardNum: card.Card_Num ?? "",

    // ✔ Body_Text is present here, but default if missing
    BodyText: card.Body_Text ?? "",
    

    DateModified: card.Date_Modified ?? "",
    SetID: card.Set_ID ?? "",
  };
}
