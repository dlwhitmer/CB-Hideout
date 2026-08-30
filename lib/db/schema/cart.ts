import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const Cart = sqliteTable("cart", {
  id: integer().primaryKey(),
  userId: integer().notNull(),        // links to customer
  productId: text().notNull(),     // links to your product tables
  quantity: integer().notNull().default(1),
});
