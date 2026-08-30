// import { cardboard } from "@/lib/fonts";
import { headers } from "next/headers";
import MagicWord from "../../components/MagicWord";

export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  type?: string;
  rarity?: string;
  colors?: string;
  finishes: string;
  set?: string; // ⭐ add this
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const page = parseInt(sp.page ?? "1");
  const type = sp.type ?? "";
  const rarity = sp.rarity ?? "";
  const set = sp.set ?? "";
  const colors = sp.colors ?? "";
  const finishes = sp.finishes ?? "";

  // FIX: absolute URL required in server components
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const setsResponse = await fetch(
    `${protocol}://${host}/api/magic/sets/list`,
    {
      cache: "no-store",
    },
  );
  if (!setsResponse.ok) {
    const text = await setsResponse.text();
    console.log("SETS API FAILED:", setsResponse.status, text);
    throw new Error("Failed to load magic sets");
  }

  const sets = await setsResponse.json();

  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(
    `${base}/api/magic/singles/list?page=${page}&type=${type}&rarity=${rarity}&set=${set}&colors=${colors}&finishes=${finishes}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch magic cards: ${response.status}`);
  }

  const json = await response.json();

  console.log("MAGIC PUBLIC JSON:", json);

  const singles = json.data ?? [];
  const total = json.total ?? 0;
  const pageSize = json.pageSize ?? singles.length;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* FILTER BAR */}
      <form className="filter-stack text-white text-center">
        <select name="set" defaultValue={set} className="filter-center">
          <option value="">All Sets</option>
          {sets.map((s: any) => (
            <option key={s.set_code} value={s.set_code}>
              {s.set_name}
            </option>
          ))}
        </select>

        <select name="type" defaultValue={type} className="filter-center">
          <option value="">All Types</option>
          <option value="Creature">Creature</option>
          <option value="Instant">Instant</option>
          <option value="Sorcery">Sorcery</option>
          <option value="Artifact">Artifact</option>
          <option value="Enchantment">Enchantment</option>
          <option value="Planeswalker">Planeswalker</option>
          <option value="Land">Land</option>
          <option value="Battle">Battle</option>
          <option value="conspiracy">Conspiracy </option>
          <option value="dungeon">Dungeon </option>
          <option value="plane">Plane </option>
          <option value="phenomenom">Phenomenon </option>
          <option value="scheme">Scheme </option>
          <option value="vangaurd">Vangaurd </option>
          <option value="kindred">Kindred </option>
        </select>

        <select name="rarity" defaultValue={rarity} className="filter-center">
          <option value="">All Rarities</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic rare">Mythic Rare</option>
          <option value="basic lands">Basic Lands</option>
        </select>
        <select name="colors" defaultValue={colors} className="filter-center">
          <option value="">All Colors</option>
          <option value="W">White</option>
          <option value="U">Blue</option>
          <option value="B">Black</option>
          <option value="R">Red</option>
          <option value="G">Green</option>
        </select>

        <select
          name="finishes"
          defaultValue={finishes}
          className="filter-center"
        >
          <option value="">All Finishes</option>
          <option value="normal">Nonfoil</option>
          <option value="foil">Foil</option>
        </select>

        <button type="submit" className="filter-button">
          Filter
        </button>
      </form>

      {/* TITLE */}
      <h1 className="text-center leading-[1.1]">
        <MagicWord>
          <span
            className="
            magic-title 
              block 
              font-style: italic
              text-transparent 
              bg-clip-text 
              bg-gradient-to-b 
              from-[#cc3300] 
              to-[#ff9900]
            "
          >
            Magic
          </span>
        </MagicWord>

        <span
          className="
              block 
              gathering-title
              text-[#f17908] 
              [text-shadow:_2px_4px_6px_#000]
            "
        >
          The Gathering
        </span>
      </h1>

      {/* GRID */}
      <div className="card-grid gap-6 pt-5">
        {singles.map((p: any) => {
          const faces = p.card_faces ? JSON.parse(p.card_faces) : null;

          return (
            <a
              key={p.id}
              href={`/magic/singles/${p.id}`}
              className="card-size
                   bg-gray-800 p-3 rounded shadow hover:scale-105 transition mx-auto"
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
