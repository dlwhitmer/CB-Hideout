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
        className="flex gap-4 mb-4 pt-3 text-white"
      >
        <select
          name="set"
          defaultValue={set}
          className="bg-gray-800 border border-gray-600 p-2 rounded"
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
          className="bg-gray-800 border border-gray-600 p-2 rounded"
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
          className="bg-gray-800 border border-gray-600 p-2 rounded"
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
          className="bg-gray-800 border border-gray-600 p-2 rounded"
        >
          <option value="">All Super Types</option>
          <option value="Pokemon">Pokemon</option>
          <option value="Trainer">Trainer</option>
          <option value="Energy">Energy</option>
        </select>
        <select
          name="price"
          defaultValue={price}
          className="bg-gray-800 border border-gray-600 p-2 rounded"
        >
          <option value="">All Prices</option>
          <option value=".01to5">$.01 - $5.00</option>
          <option value="5to20">$5.00 - $20.00</option>
          <option value="20plus">$20.00 +</option>
        </select>

        <select
          name="series"
          defaultValue={series}
          className="bg-gray-800 border border-gray-600 p-2 rounded"
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
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </form>

      {/* TITLE */}
      <div className="flex justify-center">
        <Image
          src="/images/pokemon.webp"
          alt="Pokemon"
          width={400}
          height={150}
          className="h-[80px] md:h-[90px] lg:h-[120px] object-contain"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-5">
        {singles.map((p: any) => {
          console.log("PUBLIC CARD:", p);

          return (
            <a
              key={p.id}
              href={`/pokemon/singles/${p.id}`}
              className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
            >
              <Image
                src={p.imageSmall}
                alt={p.name}
                width={600}
                height={600}
                className="rounded shadow"
                loading="lazy"
              />

              <h2 className="font-semibold text-sm text-white text-center">
                {p.name}
              </h2>

              <p className="text-gray-400 text-sm">${p.price}</p>
            </a>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8 text-white">
        <div className="flex justify-center gap-4 mt-8 text-white">
          {page > 1 && (
            <a
              href={`/pokemon/singles?page=${page - 1}`}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Previous
            </a>
          )}

          {page < total && (
            <a
              href={`/pokemon/singles?page=${page + 1}`}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
