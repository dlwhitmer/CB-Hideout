import Database from "better-sqlite3";

let db: any;

export function connectDB() {
  if (!db) {
    db = new Database("db/cbhideout.db");
  }
  return db;
}