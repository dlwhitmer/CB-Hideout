import Link from "next/link";
import MagicWord from "../../components/MagicWord";

export default async function MagicCardsPage({ searchParams }) {
  const sp = await searchParams;

  // Bucket defaults to A–D
  const bucket = sp.bucket ?? "A-D";

  // Filters
  const set = sp.set ?? "";
  const type = sp.type ?? "";
  const rarity = sp.rarity ?? "";
  const colors = sp.colors ?? "";
  const finishes = sp.finishes ?? "";
  const page = Number(sp.page ?? "1");

  // Bucket helper
  function inBucket(code, bucket) {
    const [start, end] = bucket.split("-");
    const first = code[0].toUpperCase();
    return first >= start && first <= end;
  }

  // Fetch sets (filtered by bucket)
  const setsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/magic/sets/list?bucket=${bucket}`,
    { cache: "no-store" },
  );
  const sets = await setsRes.json();

  const filteredSets = sets.filter((s) => inBucket(s.setCode, bucket));
  const selectedSetName = sets.find((s) => s.setCode === set)?.setName ?? "";

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
      colors,
      finishes,
      page: page.toString(),
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL;

    const cardsRes = await fetch(`${base}/api/magic/cards/list?${params}`, {
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
      colors,
      finishes,
      page: page.toString(),
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL;

    const cardsRes = await fetch(`${base}/api/magic/cards/list?${params}`, {
      cache: "no-store",
    });

    const data = await cardsRes.json();
    cards = data.data;
    total = data.total;
  }

  return (
    <div className="min-h-screen bg-[url('/images/bg-23.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* Bucket Buttons */}
      <div className="flex flex-wrap gap-3 justify-center pt-4 ">
        <Link
          href="/magic/cards?bucket=A-D"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          A–D
        </Link>
        <Link
          href="/magic/cards?bucket=E-G"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          E–G
        </Link>
        <Link
          href="/magic/cards?bucket=H-L"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          H–L
        </Link>
        <Link
          href="/magic/cards?bucket=M-P"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          M–P
        </Link>
        <Link
          href="/magic/cards?bucket=Q-T"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          Q–T
        </Link>
        <Link
          href="/magic/cards?bucket=U-Z"
          className="px-3 py-2 bg-gray-700 rounded text-white"
        >
          U–Z
        </Link>
      </div>

      <form className="mb-6 text-center">
        <div className="w-64 mx-auto">
          <select
            name="set"
            defaultValue={set}
            className=" text-white bg-black border-2 p-2 border-white rounded w-full"
          >
            <option value="">Select a Set</option>
            {filteredSets.map((s) => (
              <option key={s.setCode} value={s.setCode}>
                {s.setName}
              </option>
            ))}
          </select>
        </div>

        {/* No set selected */}
        {!set && (
          <p className="text-center text-white pt-3 text-[16px] font-semibold">
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
        <MagicWord>
          <h2 className="text-[30px] sm:text-[30px] md:text-[40px] lg:text-[50px] text-white  text-center">
            {selectedSetName}
          </h2>
        </MagicWord>
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
                href={`/magic/cards/${card.id}`}
                className="block"
              >
                <img
                  src={card.frontImageSmall || "/placeholder.png"}
                  alt={card.frontName}
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
                href={`/magic/cards?page=${page - 1}&set=${set}`}
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
                href={`/magic/cards?page=${page + 1}&set=${set}`}
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
