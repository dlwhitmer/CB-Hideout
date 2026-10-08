import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { cardId } = params;

  const res = await fetch(
    `https://api.tcgapi.dev/v1/pricing/card/${cardId}`,
    {
      headers: {
        "X-API-Key": process.env.TCG_API_KEY,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
