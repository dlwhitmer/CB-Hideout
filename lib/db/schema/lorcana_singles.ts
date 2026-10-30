import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const lorcanaSingles = sqliteTable("lorcana_singles", {
  id: integer("id").primaryKey(),
  Artist: text("Artist").notNull(),
  SetName: text("Set_Name").notNull(),
  Classifications: text("Classifications"),
  DateAdded: text("Date_Added").notNull(),
  SetNum: text("Set_Num").notNull(),
  Color: text("Color").notNull(),
  Gamemode: text("Gamemode"),
  Franchise: text("Franchise").notNull(),
  MoveCost: integer("Move_Cost"),
  Abilities: text("Abilities"),
  Image: text("Image").notNull(),
  Cost: integer("Cost").notNull(),
  Inkable: integer("Inkable", { mode: "boolean" }),
  Name: text("Name").notNull(),
  Type: text("Type").notNull(),
  Lore: integer("Lore").notNull(),
  Rarity: text("Rarity").notNull(),
  FlavorText: text("Flavor_text"),
  UniqueId: text("Unique_Id").notNull(),
  CardNum: integer("Card_Num").notNull(),
  BodyText: text("Body_text"),
  Willpower: integer("Willpower").notNull(),
  CardVariants: text("Card_Variants"),
  DateModified: text("Date_Modified").notNull(),
  Strength: integer("Strength").notNull(),
  SetId: text("Set_id").notNull(),
  ourPrice: real("our_price"),
  quantity: integer("quantity").default(0),
  condition:text("condition"),
});

export type SelectLorcanaSingle = InferSelectModel<typeof lorcanaSingles>;
export type InsertLorcanaSingle = InferInsertModel<typeof lorcanaSingles>;
