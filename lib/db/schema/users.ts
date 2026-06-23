import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const Users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  address: text("address"),
  po_box: text("po_box"),
  city: text("city"),
  state: text("state"),
  zipcode: text("zipcode"),
});
