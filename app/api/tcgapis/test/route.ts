import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.TCGAPIS_BASE_URL ?? "https://api.tcgapis.com";

const API_KEY = process.env.TCGAPIS_API_KEY;

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "TCGAPIS_API_KEY is missing from .env.local" },
      { status: 500 },
    );
  }

  // Enter an endpoint such as /api/v2/games
  const endpoint = request.nextUrl.searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json(
      {
        error: "Missing endpoint parameter",
        example: "/api/api/tcgapis/test?endpoint=%2Fapi%2Fv2%2Fgames",
      },
      { status: 400 },
    );
  }

  // Allow only documented API paths; prevent arbitrary URL requests.
  if (
    !/^\/api\/v[12]\/[a-zA-Z0-9/_-]+$/.test(endpoint) ||
    endpoint.includes("..")
  ) {
    return NextResponse.json(
      { error: "Invalid API endpoint path" },
      { status: 400 },
    );
  }

  const upstreamUrl = new URL(endpoint, BASE_URL);

  // Forward additional query parameters, such as limit and offset.
  request.nextUrl.searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      upstreamUrl.searchParams.set(key, value);
    }
  });

  try {
    const response = await fetch(upstreamUrl.toString(), {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const responseText = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    return NextResponse.json(
      {
        requestedEndpoint: endpoint,
        upstreamStatus: response.status,
        success: response.ok,
        data,
      },
      { status: response.ok ? 200 : 502 },
    );
  } catch (error) {
    console.error("TCGAPIs request failed:", error);

    return NextResponse.json(
      { error: "Unable to connect to TCGAPIs" },
      { status: 502 },
    );
  }
}
