import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const yugiohCards = sqliteTable("yugioh_products", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Required identifiers
  yugiohId: text("yugioh_id").notNull().unique(),
  name: text("name").notNull(),

  // Core card metadata (always present)
  type: text("type").notNull(),
  frameType: text("frame_type").notNull(),

  // Optional metadata (Yu‑Gi‑Oh API varies)
  typeline: text("typeline"),
  humanReadableCardType: text("human_readable_card_type"),
  desc: text("desc"),
  race: text("race"),
  attribute: text("attribute"),
  archetype: text("archetype"),

  // Stats (optional depending on card type)
  atk: integer("atk"),
  def: integer("def"),
  level: integer("level"),

  // JSON fields (stringified arrays)
  card_sets: text("card_sets"),
  card_images: text("card_images"),
  card_prices: text("card_prices"),

  // Inventory + pricing
  quantity: integer("quantity").notNull().default(0),
  price: real("price").notNull().default(0),

  // Image URLs
  image_small: text("image_small"),
  image_large: text("image_large"),

  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
