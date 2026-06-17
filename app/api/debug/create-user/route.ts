import { db } from "@/lib/db";
import { Users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const hash = await bcrypt.hash("Love2Code!", 10);

  const result = await db.insert(Users).values({
    username: "dwhitmer",
    passwordHash: hash,
    name: "Dan Whitmer",
  });

  return NextResponse.json({ inserted: true, result });
}
