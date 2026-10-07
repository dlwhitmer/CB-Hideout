import Link from "next/link";
import MagicWord from "../../components/MagicWord";

export default async function RiftBoundCardsPage({ searchParams }) {
  // Next.js 16: searchParams is a Promise
  const params = await searchParams;

  const setApiId = params?.set || "";
  const page = Number(params?.page ?? "1");

  // Fetch all sets
  const setsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/riftbound/sets/list`,
    { cache: "no-store" },
  );
  const sets = await setsRes.json();

  // Find the selected set object
  const selectedSet = sets.find((s) => s.setCode === setApiId) ?? null;

  // Extract set fields (camelCase from your schema)
  const apiId = selectedSet?.setCode ?? "";
  const name = selectedSet?.setName ?? "";

  // Fetch cards ONLY if a set is selected
  let cards = [];
  let total = 0;
  let totalPages = 1;

  if (apiId) {
    const params = new URLSearchParams({
      set: apiId,
      page: page.toString(),
    });

    const cardsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/riftbound/cards/list?${params}`,
      { cache: "no-store" },
    );

    const data = await cardsRes.json();
    cards = data.data;
    total = data.total;
    totalPages = Math.ceil(total / 30);
  }

  // Remove duplicate cards by riftboundID
  cards = Object.values(
    cards.reduce((acc, card) => {
      if (!acc[card.riftboundId]) acc[card.riftboundId] = card;
      return acc;
    }, {}),
  );

  return (
    <div className="min-h-screen pt-5 bg-[url('/images/bg-23.webp')] bg-no-repeat bg-[length:100%_100%]">
      <div className="flex justify-center bg-[#fbf2c4] border-6 border-[#e5c185] rounded-3xl w-[275px] mt-5 mx-auto">
        <img
          src="/images/RiftBound-Logo.webp"
          alt="Lorcana Logo"
          width={220}
          height={70}
          className="h-auto"
        />
      </div>
      <form method="GET" action="/riftbound/cards">
        <div className="text-blue-900 pt-7 text-center  mx-auto">
          <select
            name="set"
            className="bg-[#03045e]  text-white border-2 border-yellow-400 rounded px-4 py-2 text-lg"
            defaultValue={setApiId}
          >
            <option value="" className=" bg-white">
              Select a Set
            </option>

            {sets.map((s) => (
              <option
                key={s.setCode}
                value={s.setCode}
                className="bg-[#03045e]  text-[#ffffff]"
              >
                {s.setName}
              </option>
            ))}
          </select>
          <div>
            <button
              type="submit"
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Load Cards
            </button>
            <div className="text-center text-white pt-3 text-[16px] font-semibold">
              <p>Choose a set to load cards.</p>
            </div>
          </div>
        </div>
      </form>

      {/* Set Title */}
      {selectedSet && (
        <MagicWord>
          <h2 className="text-[30px] md:text-[40px] lg:text-[35px] text-blue-400 text-center">
            {selectedSet.setName}
          </h2>
        </MagicWord>
      )}

      {/* Cards Grid */}
      {apiId && (
        <>
          <p className="text-center text-[18px] font-semibold text-yellow-400 mb-4">
            {total} result{total !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cards.map((card) => (
              <Link
                key={card.id}
                href={`/riftbound/cards/${card.id}`}
                className="block"
              >
                <img
                  src={card.imgUrl}
                  alt={card.name}
                  width={200}
                  height={250}
                  className="rounded pt-4 w-full"
                />
                <p className="mt-2 text-[18px] hover:scale-110 font-semibold text-yellow-300 text-center">
                  {card.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8 text-white">
            {page > 1 && (
              <a
                href={`/riftbound/cards?page=${page - 1}&set=${setApiId}`}
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
                href={`/riftbound/cards?page=${page + 1}&set=${setApiId}`}
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
