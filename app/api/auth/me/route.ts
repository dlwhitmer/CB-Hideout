import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ user: null });
  }

  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.id, Number(userId)))
    .limit(1);

  return NextResponse.json({
    user: user[0] || null,
  });
}
