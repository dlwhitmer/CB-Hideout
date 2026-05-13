import { connectDB } from "@/db/connect";

export async function GET() {
  const db = await connectDB();
  const rows = await db.all("SELECT name FROM sqlite_master");
  return Response.json(rows);
}
