import { db } from "@/lib/db";
import { Users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, name, address, city, state, zipcode } = body;

  if (!username || !password) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  // Check if username already exists
  const existing = await db.select().from(Users).where(Users.username.eq(username));
  if (existing.length > 0) {
    return Response.json({ error: "Username already taken" }, { status: 400 });
  }

  // Hash password
  const hash = await bcrypt.hash(password, 10);

  // Insert user
  const result = await db.insert(Users).values({
    username,
    passwordHash: hash,
    name,
    address,
    city,
    state,
    zipcode,
  }).returning();

  const user = result[0];

  // Auto-login after signup
  const cookieStore = await cookies();
  await cookieStore.set("userId", String(user.id), {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
  });

  return Response.json({ success: true, userId: user.id });
}
