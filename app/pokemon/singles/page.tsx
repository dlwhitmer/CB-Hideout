// import { cardboard } from "@/lib/fonts";
import { headers } from "next/headers";
import Image from "next/image";

export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  type?: string;
  rarity?: string;
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
    `${protocol}://${host}/api/pokemon/singles/list?page=${page}&type=${type}&rarity=${rarity}&set=${set}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon cards: ${response.status}`);
  }

  const json = await response.json();

  const singles = json.data ?? []; // safe fallback
  const total = json.total ?? 0;
  const pageSize = json.pageSize ?? singles.length;

  return (
    <div className="min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* FILTER BAR */}
      <form className="flex gap-4 mb-4 pt-3 text-white">
        <select
          name="set"
          defaultValue={set}
          className="bg-gray-800 border border-gray-600 p-2 rounded"
        >
          <option value="">All Sets</option>
          {sets.map((s: any) => (
            <option key={s.set_code} value={s.set_code}>
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
          <option value="Creature">Creature</option>
          <option value="Instant">Instant</option>
          <option value="Sorcery">Sorcery</option>
          <option value="Artifact">Artifact</option>
          <option value="Enchantment">Enchantment</option>
          <option value="Planeswalker">Planeswalker</option>
          <option value="Land">Land</option>
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
          <option value="mythic">Mythic</option>
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
          const faces = p.card_faces ? JSON.parse(p.card_faces) : null;

          const img =
            p.imageSmall ??
            faces?.[0]?.image_uris?.small ??
            "/placeholder.png";

          return (
            <a
              key={p.id}
              href={`/pokemon/singles/${p.id}`}
              className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
            >
              <img
                src={img}
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
  );
}
