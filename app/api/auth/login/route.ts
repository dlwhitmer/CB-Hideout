import { db } from "@/lib/db";
import { Admins } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // 1. Find admin
  const admin = await db
    .select()
    .from(Admins)
    .where(eq(Admins.username, username))
    .get();

  if (!admin) {
    return NextResponse.json({ error: "Invalid username" }, { status: 401 });
  }

  // 2. Check password
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // 3. Create redirect response
  const response = NextResponse.redirect(new URL("/admin", request.url));

  // 4. Set cookie
  response.cookies.set("role", "admin", {
    httpOnly: true,
    path: "/",
  });

  return response;
}
