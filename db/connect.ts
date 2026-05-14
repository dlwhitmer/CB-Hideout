import Database from "better-sqlite3";

import { open } from "sqlite";

let db: any;

export function connectDB() {
  if (!db) {
    db = new Database("products.sqlite", { verbose: console.log });
  }
  return db;
}
