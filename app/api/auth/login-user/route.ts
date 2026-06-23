import { db } from "@/lib/db";
import { Users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // 1. Find user
  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.username, username))
    .limit(1);

  if (user.length === 0) {
    return NextResponse.json({ error: "Invalid username" }, { status: 401 });
  }

  const u = user[0];

  // 2. Check password
  const valid = await bcrypt.compare(password, u.passwordHash);

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // 3. Create redirect response
  const response = NextResponse.redirect(new URL("/", request.url));

  // 4. Set cookie
  response.cookies.set("userId", u.id.toString(), {
    httpOnly: true,
    path: "/",
  });

  response.cookies.set("role", "user", {
    httpOnly: true,
    path: "/",
  });

  return response;
}
