import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const Cart = sqliteTable("cart", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull(),        // links to customer
  productId: text("product_id").notNull(),     // links to your product tables
  quantity: integer("quantity").notNull().default(1),
});
