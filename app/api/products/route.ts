import { connectDB } from "@/db/connect";

export async function GET() {
  const db = await connectDB();
  const products = await db.all(
  "SELECT id, scryfall_id, name, price, image_url FROM products"
);
  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, description } = body;

  const db = await connectDB();
  await db.run(
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
    [name, price, description]
  );

  return Response.json({ success: true });
}