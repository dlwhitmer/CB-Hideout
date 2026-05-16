export const dynamic = "force-dynamic";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT name FROM sqlite_master",
  });

  return Response.json(result.rows);
}
