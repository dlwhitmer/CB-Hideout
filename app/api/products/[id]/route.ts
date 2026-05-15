import { db } from "@/lib/db/connect";

export async function DELETE(_req: Request, context: any) {
  try {
    const { id } = await context.params;

    await db.execute({
      sql: "DELETE FROM products WHERE id = ?",
      args: [id],
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}