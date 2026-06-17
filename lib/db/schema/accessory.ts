import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
// import { sql } from "drizzle-orm";

export const Accessory = sqliteTable("accessories", {
  id: integer("id").primaryKey(),
  productId: text("product_id").notNull().unique(),
  name: text("name").notNull(),
  game: text("game").notNull(),
  type: text("type").notNull(),
  price: integer("price").notNull(),     // store as number (cents or whole)
  imageUrl: text("image_url"),           // allow null
  quantity: integer("quantity").notNull().default(0),
  description: text("description").notNull(),
});
