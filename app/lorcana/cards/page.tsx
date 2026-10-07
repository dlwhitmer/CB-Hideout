import Link from "next/link";
import AliceFont from "../../components/Alice";
import MedievalFont from "../../components/Medieval";

export default async function LorcanaCardsPage({ searchParams }) {
  const sp = await searchParams;

  // Filters
  const SetID = sp.SetID ?? "";
  const Type = sp.Type ?? "";
  const Rarity = sp.Rarity ?? "";
  const Color = sp.Color ?? "";
  const Image = sp.Image ?? "";
  const CardNum = sp.CardNum ?? "";
  const page = Number(sp.page ?? "1");

  // Fetch sets (filtered by bucket)
  const setsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/lorcana/sets/list`,
    { cache: "no-store" },
  );
  const sets = await setsRes.json();

  const selectedSetName = sets.find((s) => s.SetID === SetID)?.SetName ?? "";

  // Fetch cards ONLY if a set is selected
  let cards = [];
  let total = 0;
  let totalPages = 1;

  if (SetID) {
    const params = new URLSearchParams({
      SetID,
      Type,
      Rarity,
      Color,
      Image,
      CardNum,
      page: page.toString(),
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL;

    const cardsRes = await fetch(`${base}/api/lorcana/cards/list?${params}`, {
      cache: "no-store",
    });

    const data = await cardsRes.json();
    cards = data.data;
    total = data.total;

    totalPages = Math.ceil(total / 30);
  }

  // ⭐ Remove duplicate cards by cardNum
  cards = Object.values(
    cards.reduce((acc, card) => {
      if (!acc[card.CardNum]) acc[card.CardNum] = card;
      return acc;
    }, {}),
  );

  return (
    <div className="min-h-screen bg-[url('/images/bg-23.webp')] bg-no-repeat bg-[length:100%_100%]">
   
      <div className="flex flex-col items-center text-white pt-4 space-y-4"></div>

      <div className="flex justify-center bg-[#fbf2c4] border-6 border-[#e5c185] rounded-3xl w-[300px] mt-5 mx-auto">
        <img
          src="/images/Lorcana-Logo.webp"
          alt="Lorcana Logo"
          width={220}
          height={70}
          className="h-auto"
        />
      </div>
      <form className="mb-6 pt-5 text-center">
        <div className="text-[#ffffff] bg-[#03045e] w-69 mx-auto">
          <select
            name="SetID"
            defaultValue={SetID}
            className="bg-[#03045e] border-2 p-2  border-white rounded"
          >
            <option
              value=""
              className="bg-[#03045e] text-[#ffffff] hover:bg-gray-700 hover:text-white"
            >
              Select a Set
            </option>
            {sets.map((s) => (
              <option key={s.SetID} value={s.SetID}>
                {s.Name}
              </option>
            ))}
          </select>
        </div>

        {/* No set selected */}
        {!SetID && (
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
        <AliceFont>
          <h2 className="text-4xl text-white text-center">{selectedSetName}</h2>
        </AliceFont>
      )}

      {SetID && (
        <>
          <p className="text-center text-[18px] font-semibold text-yellow-400 mb-4">
            {total} result{total !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cards.map((card) => (
              <Link
                key={card.id}
                href={`/lorcana/cards/${card.id}`}
                className="block"
              >
                <img
                  src={card.Image}
                  alt={card.Name}
                  className="rounded pt-4 w-full"
                />
                <MedievalFont>
                  <p className="mt-2 text-[18px] hover:scale-110 font-semibold text-[#fbf2c4] text-shadow-white-800 underline decoration-3 decoration-yellow-400 text-center">
                    {card.Name}
                  </p>
                </MedievalFont>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8 text-white">
            {page > 1 && (
              <a
                href={`/lorcana/cards?page=${page - 1}&set_id=${SetID}`}
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
                href={`/lorcana/cards?page=${page + 1}&Set_ID=${SetID}`}
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
