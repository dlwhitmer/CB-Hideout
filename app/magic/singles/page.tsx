console.log("SERVER COMPONENT");

import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  type?: string;
  rarity?: string;
  colors?: string;
  finishes?: string;
};

export default async function ProductsPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  // Next.js 16: searchParams is a Promise
  const sp = await props.searchParams;

  const page = parseInt(sp.page ?? "1");
  const type = sp.type ?? "";
  const rarity = sp.rarity ?? "";
  const colors = sp.colors ?? "";
  const finishes = sp.finishes ?? "";

  // Next.js 16: headers() is a Promise
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (type) params.set("type", type);
  if (rarity) params.set("rarity", rarity);
  if (colors) params.set("colors", colors);
  if (finishes) params.set("finishes", finishes);

  const response = await fetch(
    `${baseUrl}/api/magic/singles/list?${params.toString()}`,
    { cache: "no-store" },
  );

  const data = await response.json();
  const singles = data.data ?? [];
  const totalPages = Math.ceil(data.total / data.pageSize);

  return (
  <div className="min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">

    {/* GRID */}
    <div className="card-grid gap-6 pt-5">
      {singles.map((p: any) => {
        const faces = p.card_faces ? JSON.parse(p.card_faces) : null;

        return (
          <a
            key={p.id}
            href={`/magic/singles/${p.id}`}
            className="card-size bg-gray-800 p-3 rounded shadow hover:scale-105 transition mx-auto"
          >
            <div className="bg-[url('/card-bg.png')] bg-contain bg-no-repeat bg-center rounded">
              <img
                src={p.imageSmall || "/placeholder.png"}
                alt={p.name}
                className="w-full h-auto rounded shadow"
                loading="lazy"
              />
            </div>

            <h2 className="text-[12px] sm:text-[12px] md:text-13px lg:text-[15px] font-semibold text-white text-center">
              {p.name}
            </h2>

            <p className="text-white text-sm">
              {Number(p.price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </a>
        );
      })}
    </div>

    {/* PAGINATION */}
    <div className="flex justify-center items-center gap-4 mt-8 text-white">
      {page > 1 && (
        <a
          href={`/magic/singles?page=${page - 1}`}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Previous
        </a>
      )}

      <span className="px-4 py-2 bg-gray-800 rounded">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <a
          href={`/magic/singles?page=${page + 1}`}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Next
        </a>
      )}
    </div>
  </div>
);

}
