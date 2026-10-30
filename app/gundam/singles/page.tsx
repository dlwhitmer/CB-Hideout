
import RefreshButton from "../../refreshbtn";
import Image from "next/image";


import { headers } from "next/headers";
export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  cardType?: string;
  rarity?: string;
  color?: string;

  search?: string;
};

export default async function GundamProductsPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  // Next.js 16: searchParams is a Promise
  const sp = await props.searchParams;

  const search = sp.search ?? "";
  const page = parseInt(sp.page ?? "1");
  const cardType = sp.cardType ?? "";
  const rarity = sp.rarity ?? "";
  const cardColor = sp.color ?? "";


  // Next.js 16: headers() is a Promise
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (search) params.set("search", search);
  if (cardType) params.set("cardType", cardType);
  if (rarity) params.set("rarity", rarity);
  if (cardColor) params.set("cardColor", cardColor);


  const response = await fetch(
    `${baseUrl}/api/gundam/singles/list?${params.toString()}`,
    { cache: "no-store" },
  );
  console.log("API status:", response.status);
  console.log("API content type:", response.headers.get("content-type"));

  const responseText = await response.text();
  console.log("API response:", responseText.slice(0, 500));

  const data = JSON.parse(responseText);
  const singles = data.data ?? [];
  const totalPages = Math.ceil(data.total / data.pageSize);
  const currentGame = "gundam";
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-[1600px] px-5 py-6">
        {/* PAGE HEADING */}
       
        <h1 className="mb-2 text-2xl font-bold">Trading Card Singles</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_minmax(0,1fr)]">
          {/* LEFT FILTER SIDEBAR */}
          <aside className="border-r border-gray-200 pr-5">
            {/* SELLERS */}
            <section className="border-b border-gray-200 pb-5">
              <h2 className="mb-3 text-lg font-bold">Sellers</h2>

              <label className="mb-2 flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" />
                Hideout
              </label>
            </section>

            {/* PRODUCT LINE */}

            <section className="border-b border-gray-200 py-5">
              <h2 className="mb-3 text-lg font-bold">Product Line Name</h2>
              {[
                { label: "Magic: The Gathering", value: "magic" },
                { label: "One Piece", value: "onepiece" },
                { label: "Gundam", value: "gundam" },
                { label: "Lorcana", value: "lorcana" },
                { label: "Riftbound", value: "riftbound" },
              ].map((game) => (
                <a
                  key={game.value}
                  href={`/${game.value}/singles`}
                  className="mb-3 flex items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    name="productLine"
                    className="accent-blue-600 h-4 w-4"
                    checked={game.value === currentGame}
                    readOnly
                  />
                  {game.label}
                </a>
              ))}
            </section>

            <section className="border-b border-gray-200 py-5">
              <h2 className="mb-3 text-lg font-bold">Browse Sets</h2>
              {[
                { label: "Magic: The Gathering", value: "magic" },
                { label: "One Piece", value: "onepiece" },
                { label: "Gundam", value: "gundam" },
                { label: "Lorcana", value: "lorcana" },
                { label: "Riftbound", value: "riftbound" },
              ].map((game) => (
                <a
                  key={game.value}
                  href={`/${game.value}/cards`}
                  className="mb-3 flex items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    name="browseSets"
                    className="h-4 w-4"
                    checked={game.value === currentGame}
                    readOnly
                  />
                  {game.label}
                </a>
              ))}
            </section>

            {/* MORE FILTERS */}
            <section className="py-5">
              <h2 className="mb-3 text-lg font-bold">Rarity</h2>

              {["Common", "Uncommon", "Rare", "Mythic"].map((rarity) => (
                <label
                  key={rarity}
                  className="mb-3 flex items-center gap-2 text-sm"
                >
                  <input type="checkbox" className="h-4 w-4" />
                  {rarity}
                </label>
              ))}
            </section>
          </aside>

          {/* RIGHT PRODUCT AREA */}
          <main className="min-w-0">
            {/* SEARCH AND SORT */}
            <form
              action="/gundam/singles"
              method="GET"
              className="mb-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="search"
                name="search"
                defaultValue={sp.search ?? ""}
                placeholder="Search cards by name..."
                className="min-w-0 flex-1 rounded-md border border-gray-300 px-4 py-3"
              />

              <button
                type="submit"
                className="rounded-md border border-gray-300 px-5 py-3 hover:bg-gray-100"
              >
                Search
              </button>
            </form>

            {search && 
            <RefreshButton/>
             }
            <p className="mb-4 text-sm text-gray-500">
              Showing {singles.length} cards
            </p>
            {/* FOUR-COLUMN PRODUCT GRID */}
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {singles.map((p: any) => (
                <article
                  key={p.id}
                  className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
                >
                  {/* LARGE CARD IMAGE */}
                  <a href={`/gundam/singles/${p.id}`}>
                    <div className="flex items-center justify-center">
                      <img
                        src={`/api/gundam/image?code=${p.productId}`}
                        alt={p.cardName}
                        className="h-auto max-h-50 w-full rounded object-contain"
                        loading="lazy"
                      />
                    </div>
                  </a>

                  {/* CARD NAME */}
                  <h2 className="mt-3 min-h-10 text-center text-sm font-semibold">
                    {p.cardName}
                  </h2>
                  <h2 className="min-h-10 text-center text-sm font-semibold">
                    {p.setName}
                  </h2>

                  {/* PRICE */}
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {p.ourPrice != null
                      ? Number(p.ourPrice).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "Price unavailable"}
                  </p>

                  {/* PRODUCT ACTIONS */}
                  <div className="mt-auto flex flex-col gap-2 pt-2">
                    <a
                      href={`/gundam/singles/${p.id}`}
                      className="rounded-md border border-gray-400 px-3 py-2 text-center text-sm hover:bg-gray-100"
                    >
                      More Info
                    </a>

                    <button
                      type="button"
                      disabled
                      className="rounded-full bg-amber-300 px-3 py-2 text-sm font-semibold text-gray-900 opacity-70"
                      title="Cart functionality will be added later"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {/* PAGINATION */}
            <div className="mt-8 flex items-center justify-center gap-4 pb-6">
              {page > 1 && (
                <a
                  href={`/gundam/singles?page=${page - 1}`}
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                >
                  Previous
                </a>
              )}

              <span className="text-sm">
                Page {page} of {totalPages || 1}
              </span>

              {page < totalPages && (
                <a
                  href={`/gundam/singles?page=${page + 1}`}
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                >
                  Next
                </a>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
