import { connectDB } from "@/db/connect";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  console.log("DELETE ROUTE HIT FOR ID:", id);

  const db = await connectDB();
  await db.run("DELETE FROM products WHERE id = ?", [id]);

  return Response.json({ success: true });
}