import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const Users = sqliteTable("users", {
  id: integer().primaryKey(),
  username: text().notNull().unique(),
  passwordHash: text().notNull(),
  name: text(),
  address: text(),
  po_box: text(),
  city: text(),
  state: text(),
  zipcode: text(),
});
