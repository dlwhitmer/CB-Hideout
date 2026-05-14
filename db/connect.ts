import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "db", "cbhideout.db");
const db = new Database(dbPath);

export default db;