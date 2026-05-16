import { db } from "@/lib/db";

export async function GET() {
  const result = await db.execute({
    sql: "SELECT name FROM sqlite_master",
  });

  return Response.json(result.rows);
}
