import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
});
