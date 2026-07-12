import { db } from "../../../../../lib/db/db";
import { pokemonSingles } from "../../../../../lib/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inserted = await db.insert(pokemonSingles).values(body).returning();

    return Response.json({
      success: true,
      message: "Pokémon card imported!",
      data: inserted[0],
    });
  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}

