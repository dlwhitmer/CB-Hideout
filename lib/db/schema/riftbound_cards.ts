import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";


export const riftboundCards = sqliteTable("riftbound_Cards", {
  id: text("id").primaryKey(),                     // "6a517603ad64d2d80a4f0371"
  riftboundId: text("riftbound_id").notNull(),     // "jdg-059-221"

  name: text("name").notNull(),                    // "Svellsongur"
  cleanName: text("clean_name").notNull(),         // "Svellsongur"
  num: integer("num").notNull(),                   // 59

  energy: integer("energy"),                       // 3
  might: integer("might"),                         // null
  power: integer("power"),                         // 1

  type: text("type").notNull(),                    // "Gear"
  supertype: text("supertype"),                    // null
  rarity: text("rarity").notNull(),                // "Promo"

  domains: text("domains"),                        // JSON array ["Calm"]

  text: text("text"),                              // raw text
  rich: text("rich"),                              // HTML text
  flavour: text("flavour"),                        // flavor text

  set: text("set").notNull(),                      // "JDG"
  setName: text("set_name").notNull(),             // "Riftbound Judge Promotional Cardss"

  tags: text("tags"),                              // JSON array ["Equipment"]

  artist: text("artist"),                          // "Envar Studio"
  tcgId: text("tcg_id"),                           // "692372"

  imgUrl: text("img_url"),                         // full image URL
  img: text("img"),                                // local image path

  orientation: text("orientation"),                // "portrait"

  alt: integer("alt").notNull(),                   // boolean → 0/1
  sig: integer("sig").notNull(),                   // boolean → 0/1
  over: integer("over").notNull()                  // boolean → 0/1
});

export type SelectRiftBoundCard = InferSelectModel<typeof riftboundCards>;
export type InsertRiftBoundCard = InferInsertModel<typeof riftboundCards>;
