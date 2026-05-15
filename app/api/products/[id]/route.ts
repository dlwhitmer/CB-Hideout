import db from "@/db/connect";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  db.prepare("DELETE FROM products WHERE id = ?").run(id);

  return Response.json({ success: true });
}