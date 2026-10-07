import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const lorcanaCards = sqliteTable("lorcana_cards", {
  id: integer("id").primaryKey(),
  Artist: text("Artist").notNull(),
  SetName: text("Set_Name").notNull(),
  Classifications: text("Classifications"),
  DateAdded: text("Date_Added").notNull(),
  SetNum: integer("Set_Num").notNull(),
  Color: text("Color").notNull(),
  Gamemode: text("Gamemode"),
  Franchise: text("Franchise").notNull(),
  MoveCost: integer("Move_Cost"),
  Abilities: text("Abilities"),
  Image: text("Image").notNull(),
  Cost: integer("Cost").notNull(),
  Inkable: integer("Inkable").notNull(),
  Name: text("Name").notNull(),
  Type: text("Type").notNull(),
  Lore: integer("Lore").notNull(),
  Rarity: text("Rarity").notNull(),
  FlavorText: text("Flavor_Text"),
  UniqueID: text("Unique_ID").notNull(),
  CardNum: integer("Card_Num").notNull(),
  BodyText: text("Body_Text"),
  Willpower: integer("Willpower").notNull(),
  CardVariants: text("Card_Variants"),
  DateModified: text("Date_Modified").notNull(),
  Strength: integer("Strength").notNull(),
  SetID: text("Set_ID").notNull(),
});

export type SelectLorcanaCard = InferSelectModel<typeof lorcanaCards>;
export type InsertLorcanaCard = InferInsertModel<typeof lorcanaCards>;
