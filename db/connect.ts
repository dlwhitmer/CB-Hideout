import Database from "better-sqlite3";

let db: any;

export function connectDB() {
  if (!db) {
    db = new Database("cbhideout.db");
  }
  return db;
}