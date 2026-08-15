// import { cardboard } from "@/lib/fonts";
import { headers } from "next/headers";
import Image from "next/image";

export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  type?: string;
  rarity?: string;
  set?: string;
  supertype?: string;
  price?: string;
  series?: string;
};

function formatPrice(price: number | string | null | undefined) {
  if (price === null || price === undefined || price === "") {
    return "$0.00";
  }

  return Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

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
  const supertype = sp.supertype ?? "";
  const price = sp.price ?? "";
  const series = sp.series ?? "";

  // FIX: absolute URL required in server components
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const setsResponse = await fetch(
    `${protocol}://${host}/api/pokemon/sets/list`,
    {
      cache: "no-store",
    },
  );
  const sets = await setsResponse.json();

  const response = await fetch(
    `${protocol}://${host}/api/pokemon/singles/list?page=${page}&type=${type}&rarity=${rarity}&set=${set}&supertype=${supertype}&price=${price}&series=${series}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon cards: ${response.status}`);
  }

  const json = await response.json();
  console.log("PUBLIC JSON:", json);
  const singles = json.data ?? [];
  console.log("PUBLIC SINGLES:", singles[0]);
  const total = json.total ?? 0;
  const pageSize = json.pageSize ?? singles.length;
  const totalPages = Math.ceil(total / pageSize);
  const uniqueSets = Array.from(
    new Map(sets.map((s: any) => [`${s.set_code}-${s.set_name}`, s])).values(),
  );

  return (
    <div className="min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* FILTER BAR */}
      <form
        method="GET"
        action="/pokemon/singles"
        className="filter-stack text-white text-center">
        <select
          name="set"
          defaultValue={set}
          className="filter-center"
        >
          <option value="">All Sets</option>
          {uniqueSets.map((s: any) => (
            <option key={`${s.set_code}-${s.set_name}`} value={s.set_name}>
              {s.set_name}
            </option>
          ))}
        </select>

        <select
          name="type"
          defaultValue={type}
          className="filter-center"
        >
          <option value="">All Types</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Grass">Grass</option>
          <option value="Lightning">Lightning</option>
          <option value="Darkness">Darkness</option>
          <option value="Metal">Metal</option>
          <option value="Dragon">Dragon</option>
          <option value="Colorless">Colorless</option>
        </select>

        <select
          name="rarity"
          defaultValue={rarity}
          className="filter-center"
        >
          <option value="">All Rarities</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="rare holo">Rare Holo</option>
          <option value="ultra rare">Ultra Rare</option>
          <option value="Illustration Rare">Illustration Rare</option>
          <option value="Special Illustration Rare">
            Special Illustration Rare
          </option>
        </select>

        <select
          name="supertype"
          defaultValue={supertype}
          className="filter-center"
        >
          <option value="">All Super Types</option>
          <option value="Pokemon">Pokemon</option>
          <option value="Trainer">Trainer</option>
          <option value="Energy">Energy</option>
        </select>
        <select
          name="price"
          defaultValue={price}
          className="filter-center"
        >
          <option value="">All Prices</option>
          <option value=".01to5">$.01 - $5.00</option>
          <option value="5to20">$5.00 - $20.00</option>
          <option value="20plus">$20.00 +</option>
        </select>

        <select
          name="series"
          defaultValue={series}
          className="filter-center"
        >
          <option value="">All Set Series</option>
          <option value="Base">Base</option>
          <option value="gym">Gym</option>
          <option value="e-card">E-Card</option>
          <option value="other">Other</option>
          <option value="neo">Neo</option>
          <option value="ex">EX</option>
          <option value="np">NP</option>
          <option value="pop">POP</option>
          <option value="diamond & pearl">Diamond & Pearl</option>
          <option value="platinum">Platinum</option>
          <option value="heartgold & soulsilver">HeartGold & SoulSilver</option>
          <option value="black & white">Black & White</option>
          <option value="xy">XY</option>
          <option value="sun & moon">Sun & Moon</option>
          <option value="sword & shield">Soward & Shield</option>
          <option value="scarlet & violet">Scarlet & Violet</option>
          <option value="mega evolution">Mega Evolution</option>
        </select>

        <button
          type="submit"
          className=" w-[100px] bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mx-auto"
        >
          Filter
        </button>
      </form>

      {/* TITLE */}
      <div className="flex justify-center">
        <img
          src="/images/pokemon.webp"
          alt="Pokemon"
          className="pokemon-title object-contain"
        />
      </div>

      {/* GRID */}
      <div className="card-grid gap-6 pt-5">
        {singles.map((p: any) => {
          const faces = p.card_faces ? JSON.parse(p.card_faces) : null;

          return (
            <a
              key={p.id}
              href={`/pokemon/singles/${p.id}`}
              className="w-[160px] sm:w-[160px] md:w-[225px] lg:w-[250px]
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

              <h2 className=" text-[12px] sm:text-[12px] md:text-[15px] lg:text-[18px]   font-semibold  text-white text-center">
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
            href={`/pokemon/singles?page=${page - 1}&type=${type}&rarity=${rarity}&set=${set}&supertype=${supertype}&price=${price}&series=${series}`}
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
            href={`/pokemon/singles?page=${page + 1}&type=${type}&rarity=${rarity}&set=${set}&supertype=${supertype}&price=${price}&series=${series}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
