
export const dynamic = "force-dynamic";
import { db } from "@/lib/db";


export async function GET() {

  const pageSize = 20;
  const page = 1;
  const offset = (page - 1) * pageSize;

 const result = await db.execute({
  sql: `
    SELECT id, scryfall_id, name, price, image_url
    FROM products
    ORDER BY id
    LIMIT ? OFFSET ?
  `,
  args: [pageSize, offset],
});

const products = result.rows;

  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, description } = body;

await db.execute({
  sql: `
    INSERT INTO products (name, price, description)
    VALUES (?, ?, ?)
  `,
  args: [name, price, description],
});

  return Response.json({ success: true });
}