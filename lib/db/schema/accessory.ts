import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
// import { sql } from "drizzle-orm";

export const Accessory = sqliteTable("accessories", {
  id: integer().primaryKey(),
  productId: text().notNull().unique(),
  name: text().notNull(),
  game: text().notNull(),
  type: text().notNull(),
  price: integer().notNull(),     // store as number (cents or whole)
  imageUrl: text(),           // allow null
  quantity: integer().notNull().default(0),
  description: text().notNull(),
});
