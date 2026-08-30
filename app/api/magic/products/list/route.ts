import { db } from "../../../../../lib/db/db";
import { magicProducts } from "../../../../../lib/db/schema/magic_products";
import { and, eq, like } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const productType = searchParams.get("productType") ?? "";
  const setCode = searchParams.get("setCode") ?? "";
  const setName = searchParams.get("setName") ?? "";
  const productName = searchParams.get("productName") ?? "";
  const releaseDate = searchParams.get("releaseDate") ?? "";
  const cardsPerPack = searchParams.get("cardsPerPack") ?? "";
  const packsPerBox = searchParams.get("packsPerBox") ?? "";
  const marketPrice = searchParams.get("marketPrice") ?? "";
  const ourPrice = searchParams.get("ourPrice") ?? "";
  const imageUrl = searchParams.get("imageUrl") ?? "";
  const description = searchParams.get("discription") ?? "";
  const quantity = searchParams.get("quantity") ?? "";

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 10;

  const conditions = [];

  if (productType) {
    conditions.push(like(magicProducts.productType, `%${productType}%`));
  }
  if (setCode) {
    conditions.push(like(magicProducts.setCode, `%${setCode}%`));
  }
  if (setName) {
    conditions.push(like(magicProducts.setName, `%${setName}%`));
  }
  if (productName) {
    conditions.push(like(magicProducts.productName, `%${productName}%`));
  }
  if (releaseDate) {
    conditions.push(like(magicProducts.releaseDate, `%${releaseDate}%`));
  }
  if (cardsPerPack) {
    conditions.push(eq(magicProducts.cardsPerPack, Number(cardsPerPack)));
  }
  if (quantity) {
    conditions.push(eq(magicProducts.quantity, Number(quantity)));
  }

  if (packsPerBox) {
    conditions.push(eq(magicProducts.packsPerBox, Number(packsPerBox)));
  }

  if (marketPrice) {
    conditions.push(eq(magicProducts.marketPrice, Number(marketPrice)));
  }

  if (ourPrice) {
    conditions.push(eq(magicProducts.ourPrice, Number(ourPrice)));
  }
  if (imageUrl) {
    conditions.push(like(magicProducts.imageUrl, `%${imageUrl}%`));
  }
  if (description) {
    conditions.push(like(magicProducts.description, `%${description}%`));
  }

  // const test = await db.select().from(magicProducts).limit(5);

  // console.log("FIRST MAGIC CARDS:", test);
  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(magicProducts)
    .where(where)
    .orderBy(magicProducts.releaseDate)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalCount = await db.select().from(magicProducts).where(where);

  return Response.json({
    data: rows,
    total: totalCount.length,
    pageSize,
  });
}
