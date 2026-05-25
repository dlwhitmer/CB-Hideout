import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  const db = getDb();
  const url = new URL(req.url);

  // pagination
  const page = Number(url.searchParams.get("page") ?? 1);
  const limit = Number(url.searchParams.get("limit") ?? 20);
  const offset = (page - 1) * limit;

  // filters
  const type = url.searchParams.get("type");
  const rarity = url.searchParams.get("rarity");

  // sorting (SAFE)
  const allowedSorts = ["name", "price", "cmc", "rarity", "released_at"];
  const sortParam = url.searchParams.get("sort") ?? "name";
  const sort = allowedSorts.includes(sortParam) ? sortParam : "name";

  const order = url.searchParams.get("order") === "desc" ? "DESC" : "ASC";

  const where: string[] = [];
  const args: any = {
    limit,
    offset,
  };

  if (type && type.trim() !== "") {
    where.push(`type_line LIKE :type`);
    args.type = `%${type}%`;
  }

  if (rarity && rarity.trim() !== "") {
    where.push(`rarity = :rarity`);
    args.rarity = rarity;
  }

  const whereSQL = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const result = await db.execute({
    sql: `
    SELECT *
    FROM products
    ${whereSQL}
    ORDER BY ${sort} ${order}
    LIMIT :limit OFFSET :offset
  `,
    args,
  });

  const countArgs: any = {};

  if (type) {
    countArgs.type = `%${type}%`;
  }

  if (rarity) {
    countArgs.rarity = rarity;
  }

  const countResult = await db.execute({
    sql: `
    SELECT COUNT(*) as count
    FROM products
    ${whereSQL}
  `,
    args: countArgs,
  });
  const total = Number((countResult.rows?.[0] as any)?.count ?? 0);

  return Response.json({
    rows: result.rows,
    page,
    limit,
    total,
  });
}
