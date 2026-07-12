import { db } from "../../../../lib/db/db";
import { Admins } from "../../../../lib/db/schema/admins";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // 1. Find admin
  const admins = await db
    .select()
    .from(Admins)
    .where(eq(Admins.username, username))
    .limit(1);

  if (admins.length === 0) {
    return NextResponse.json({ error: "Invalid username" }, { status: 401 });
  }

  const user = admins[0];

  // 2. Check password
  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // 3. Create redirect response
  const response = NextResponse.redirect(new URL("/admin", request.url));

  // 4. Set cookies
  response.cookies.set("role", "admin", {
    httpOnly: true,
    path: "/",
  });

  response.cookies.set("userId", user.id.toString(), {
    httpOnly: true,
    path: "/",
  });

  return response;
}
