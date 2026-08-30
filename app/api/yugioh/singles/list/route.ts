import { db } from "../../../../../lib/db/db";
import {
  yugiohSingles,
  yugiohPrintings,
} from "../../../../../lib/db/schema/yugioh_singles";
import { eq, and, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 20);
    const offset = (page - 1) * limit;

    const set = searchParams.get("set");

    const rows = await db
      .select({
        id: yugiohSingles.id,
        yugiohId: yugiohSingles.yugiohId,
        name: yugiohSingles.name,
        quantity: yugiohSingles.quantity,
        type: yugiohSingles.type,
        race: yugiohSingles.race,
        price: yugiohSingles.price,
        imageSmall: yugiohSingles.imageSmall,

        setName: sql<string>`
      group_concat(DISTINCT ${yugiohPrintings.setName})
    `,
      })
      .from(yugiohSingles)
      .leftJoin(
        yugiohPrintings,
        set
          ? and(
              eq(yugiohSingles.yugiohId, yugiohPrintings.yugiohId),
              eq(yugiohPrintings.setName, set),
            )
          : eq(yugiohSingles.yugiohId, yugiohPrintings.yugiohId),
      )
      .groupBy(
        yugiohSingles.id,
        yugiohSingles.yugiohId,
        yugiohSingles.name,
        yugiohSingles.quantity,
        yugiohSingles.type,
        yugiohSingles.race,
        yugiohSingles.price,
        yugiohSingles.imageSmall,
      )
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({
        count: sql<number>`count(DISTINCT ${yugiohSingles.id})`,
      })
      .from(yugiohSingles)
      .leftJoin(
        yugiohPrintings,
        set
          ? and(
              eq(yugiohSingles.yugiohId, yugiohPrintings.yugiohId),
              eq(yugiohPrintings.setName, set),
            )
          : eq(yugiohSingles.yugiohId, yugiohPrintings.yugiohId),
      );

    const total = totalResult[0]?.count ?? 0;

    return Response.json({
      rows,
      total,
    });
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
