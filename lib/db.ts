import { createClient } from "@libsql/client";

let db: ReturnType<typeof createClient> | null = null;

export function getDb() {
  if (!db) {
    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
      throw new Error("Missing Turso environment variables");
    }

    db = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }

  return db;
}