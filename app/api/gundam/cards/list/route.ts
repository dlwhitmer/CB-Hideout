import { db } from "../../../../../lib/db/db";
import { gundamCards } from "../../../../../lib/db/schema";
import { and, eq, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const setCode = searchParams.get("setCode") ?? "";
    const cardType = searchParams.get("cardType") ?? "";
    const rarity = searchParams.get("rarity") ?? "";
    const color = searchParams.get("color") ?? "";
    const productID = searchParams.get("productID") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = 20;

    const conditions = [];

    if (setCode) {
      conditions.push(eq(gundamCards.setCode, setCode));
    }

    if (cardType) {
      conditions.push(like(gundamCards.cardType, `%${cardType}%`));
    }

    if (color) {
      conditions.push(like(gundamCards.color, `%${color}%`));
    }

    if (productID) {
      conditions.push(eq(gundamCards.productID, productID));
    }

    if (rarity) {
      conditions.push(eq(gundamCards.rarity, rarity));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const allRows = await db
      .select()
      .from(gundamCards)
      .where(where)
      .orderBy(gundamCards.productID);

    const uniqueCards = Object.values(
      allRows.reduce((acc, card) => {
        if (!acc[card.productID]) acc[card.productID] = card;
        return acc;
      }, {}),
    );

    const total = uniqueCards.length;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedCards = uniqueCards.slice(start, end);
    console.log("ALL ROWS:", allRows.length);
    console.log("UNIQUE:", uniqueCards.length);
    console.log("PAGE:", page);
    console.log("START:", start, "END:", end);
    console.log("PAGINATED:", paginatedCards.length);
    console.log("RAW CARD:", paginatedCards[0]);

    return NextResponse.json({
      data: paginatedCards,
      total,
      pageSize,
    });
  } catch (err) {
    console.error("GUNDAM CARDS ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Route crashed", details: String(err) },
      { status: 500 },
    );
  }
}
