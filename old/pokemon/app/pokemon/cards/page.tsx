import Link from "next/link";
import ImportBackButton from "../../importBackButton";
export default async function PokemonCardsPage({ searchParams }) {
  const sp = await searchParams;

  // Bucket defaults to A–D
  const bucket = sp.bucket ?? "A-D";

  // Filters
  const set = sp.set ?? "";
  const rarity = sp.rarity ?? "";
  const type = sp.type ?? "";
  const page = Number(sp.page ?? "1");

  // Bucket helper
  function inBucket(code, bucket) {
    const [start, end] = bucket.split("-");
    const first = code[0].toUpperCase();
    return first >= start && first <= end;
  }

  // Fetch sets (filtered by bucket)
  const setsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pokemon/sets/list?bucket=${bucket}`,
    { cache: "no-store" },
  );
  const sets = await setsRes.json();

  const filteredSets = sets.filter((s) => inBucket(s.setName, bucket));

  const selectedSetName = sets.find((s) => s.set_id === set)?.setName ?? "";

  // Fetch cards ONLY if a set is selected
  let cards = [];
  let total = 0;
  let totalPages = 1;

  if (set) {
    const params = new URLSearchParams({
      bucket,
      set,
      type,
      rarity,
      page: page.toString(),
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL;

    const cardsRes = await fetch(`${base}/api/pokemon/cards/list?${params}`, {
      cache: "no-store",
    });

    const data = await cardsRes.json();
    cards = data.data;
    total = data.total;

    // ⭐ ADD THIS
    totalPages = Math.ceil(total / 30); // because your pageSize = 30
  }

  if (set) {
    const params = new URLSearchParams({
      bucket,
      set,
      type,
      rarity,
      page: page.toString(),
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL;

    const cardsRes = await fetch(`${base}/api/pokemon/cards/list?${params}`, {
      cache: "no-store",
    });

    const data = await cardsRes.json();
    cards = data.data;
    total = data.total;
  }
  return (
    <div className="min-h-screen  bg-[url('/images/bg-47.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* Bucket Buttons */}
      <div className="flex pb-3 flex-wrap gap-3 justify-center pt-4 ">
        <Link
          href="/pokemon/cards?bucket=A-D"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          A–D
        </Link>
        <Link
          href="/pokemon/cards?bucket=E-G"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          E–G
        </Link>
        <Link
          href="/pokemon/cards?bucket=H-L"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          H–L
        </Link>
        <Link
          href="/pokemon/cards?bucket=M-P"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          M–P
        </Link>
        <Link
          href="/pokemon/cards?bucket=Q-T"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          Q–T
        </Link>
        <Link
          href="/pokemon/cards?bucket=U-Z"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          U–Z
        </Link>
        <div>
          <ImportBackButton />
        </div>
      </div>

      <form className="mb-6  text-center">
        <div className="w-64  mx-auto">
          <select
            name="set"
            defaultValue={set}
            className="appearance-none mx-auto text-white bg-[#03045e] border-2 border-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="" className="bg-[#03045e] text-white">
              Select a Set
            </option>

            {filteredSets.map((s) => (
              <option
                key={s.set_id}
                value={s.set_id}
                className="bg-[#03045e] text-[#ffffff] hover:bg-yellow-300 hover:text-black"
              >
                {s.setName}
              </option>
            ))}
          </select>
        </div>

        {/* No set selected */}
        {!set && (
          <p className="text-center pt-3 text-white text-[16px] font-semibold">
            Choose a set to load cards.
          </p>
        )}
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Load Cards
        </button>
      </form>

      {/* Cards Grid */}
      {selectedSetName && (
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          {selectedSetName}
        </h2>
      )}

      {set && (
        <>
          <p className="text-center text-[18px] font-semibold text-yellow-400 mb-4">
            {total} result{total !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cards.map((card) => (
              <Link
                key={card.id}
                href={`/pokemon/cards/${card.id}`}
                className="block"
              >
                <img
                  src={card.imageSmall || "/placeholder.png"}
                  alt={card.name}
                  className="rounded pt-4 w-full"
                />
                <p className="mt-2 text-[18px] hover:scale-110 font-semibold text-yellow-300 text-shadow-white-800 underline decoration-3 decoration-yellow-400 text-center">
                  {card.name}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8 text-white">
            {page > 1 && (
              <a
                href={`/pokemon/cards?page=${page - 1}&set=${set}`}
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
                href={`/pokemon/cards?page=${page + 1}&set=${set}`}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Next
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}
