export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const url = `https://www.gundam-gcg.com/en/images/cards/card/${code}.webp`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "https://www.gundam-gcg.com/",
    },
  });

  if (!res.ok) {
    return new Response("Image not found", { status: 404 });
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
