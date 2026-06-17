import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("userId");

  return NextResponse.json({
    userId: cookie ? cookie.value : null,
  });
}
