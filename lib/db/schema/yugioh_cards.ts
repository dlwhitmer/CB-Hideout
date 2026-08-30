import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

/* -------------------------------------------------------
    YU‑GI‑OH — Cards
  ------------------------------------------------------- */
export const yugiohCards = sqliteTable("yugioh_cards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  yugiohId: text("yugioh_id").notNull(),
  name: text("name").notNull(),
  typeline: text("typeline"),
  type: text("type"),
  humanReadableCardType: text("human_readable_card_type"),
  frameType: text("frame_type"),
  desc: text("desc"),
  linkmarkers: text("linkmarkers"),
  linkval: integer("linkval"),
  race: text("race"),
  atk: integer("atk"),
  def: integer("def"),
  level: integer("level"),
  scale: integer("scale"),
  attribute: text("attribute"),
  archetype: text("archetype"),
  primarySet: text("primary_set"),
  cardSets: text("card_sets"),
  cardImages: text("card_images"),
  imageSmall: text("image_small"),
  imageLarge: text("image_large"),

  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export type YugiohCard = InferSelectModel<typeof yugiohCards>;
export type NewYugiohCard = InferInsertModel<typeof yugiohCards>;

