import { db } from "../../../../../lib/db/db";
import { onePieceSets } from "../../../../../lib/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  
  try {
    const sets = await db
      .select({
        setId: onePieceSets.setId,
        setName: onePieceSets.setName,
      })
      .from(onePieceSets)
      .orderBy(asc(onePieceSets.setId));

    return NextResponse.json(sets)
  } catch (error) {
    console.error("ONE PIECE SETS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load One Piece sets",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}