import { db } from "../../../../../lib/db/db";
import { yugiohSingles } from "../../../../../lib/db/schema/yugioh";
import { eq, and, like } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const set = searchParams.get("set");
    const type = searchParams.get("type");
    const race = searchParams.get("race");
    const attribute = searchParams.get("attribute");

    console.log("FILTER SET:", set);

    const rows = await db
      .select()
      .from(yugiohSingles)
      .where(
        and(
          set ? eq(yugiohSingles.setCode, set) : undefined,
          type ? like(yugiohSingles.type, `%${type}%`) : undefined,
          race ? eq(yugiohSingles.race, race) : undefined,
          attribute ? eq(yugiohSingles.attribute, attribute) : undefined,
        ),
      );

    return Response.json({
      data: rows,
      total: rows.length,
    });
  } catch (err: any) {
    console.error(err);

    return Response.json({ error: err.message }, { status: 500 });
  }
}
