import { db } from "../../../../lib/db/db";
import { Users } from "../../../../lib/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const all = await db.select().from(Users);
  return NextResponse.json(all);
}
