import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Admins = sqliteTable("admins", {
  id: integer().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
 passwordHash: text("password_hash").notNull(),
});
