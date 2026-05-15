import { db } from "@/lib/db/connect";

export async function GET() {
  const rows = await db.all("SELECT name FROM sqlite_master");
  return Response.json(rows);
}
