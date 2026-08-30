import { db } from "../../../../lib/db/db";
import { pokemonProducts } from "../../../../lib/db/schema/pokemon_products";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await db.insert(pokemonProducts).values({
      productType: body.productType,
      setCode: body.setCode,
      setName: body.setName,
      productName: body.productName,
      releaseDate: body.releaseDate,
      cardsPerPack: body.cardsPerPack,
      packsPerBox: body.packsPerBox,
      marketPrice: body.marketPrice,
      imageUrl: body.imageUrl,
      description: body.description,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("MAGIC PRODUCT INSERT ERROR:", error);
    return Response.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}