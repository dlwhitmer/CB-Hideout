import { connectDB } from "@/db/connect";

export function GET() {
  const db = connectDB();

  const pageSize = 20;
  const page = 1;
  const offset = (page - 1) * pageSize;

  const products = db
    .prepare("SELECT id, scryfall_id, name, price, image_url FROM products ORDER BY id LIMIT ? OFFSET ?")
    .all(pageSize, offset);

  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, description } = body;

  const db = connectDB();

  db.prepare(
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)"
  ).run(name, price, description);

  return Response.json({ success: true });
}