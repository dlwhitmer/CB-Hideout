import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const yugiohCards = sqliteTable("yugioh_products", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  yugiohId: text("yugioh_id").unique(),
  name: text("name"),

  typeline: text("typeline"),
  type: text("type"),
  humanReadableCardType: text("human_readable_card_type"),
  frameType: text("frame_type"),

  desc: text("desc"),
  race: text("race"),
  atk: integer("atk"),
  def: integer("def"),
  level: integer("level"),
  attribute: text("attribute"),
  archetype: text("archetype"),

  // ⭐ FIX: use snake_case property names
  card_sets: text("card_sets"),
  card_images: text("card_images"),
  card_prices: text("card_prices"),

  price: text("price"),

  // ⭐ FIX: use snake_case property names
  image_small: text("image_small"),
  image_large: text("image_large"),

  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
