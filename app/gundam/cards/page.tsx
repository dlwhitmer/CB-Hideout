import Link from "next/link";
import MagicWord from "../../components/MagicWord";

export default async function GundamCardsPage({ searchParams }) {
  const card = await searchParams;

  const setCode = card.setCode ?? "";
  const cardType = card.cardType ?? "";
  const productID = card.productID ?? "";
  const rarity = card.rarity ?? "";
  const color = card.color ?? "";
  const imageUrl = card.imageUrl ?? "";
  const page = Number(card.page ?? "1");

  // Fetch sets (filtered by bucket)
  const setsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/gundam/sets/list`,
    {
      cache: "no-store",
    },
  );

  const sets = await setsRes.json();
  const selectedSetName =
    sets.find((s) => s.setCode === setCode)?.setName ?? "";

  // Fetch cards ONLY if a set is selected
  let cards = [];
  let total = 0;
  let totalPages = 1;
  if (setCode) {
    const params = new URLSearchParams({
      setCode,
      cardType,
      rarity,
      color,
      imageUrl,
      page: page.toString(),
    });
    console.log("PRODUCT ID:", card.productID);
    const cardsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/gundam/cards/list?${params}`,
      { cache: "no-store" },
    );
    console.log("cardsRes status:", cardsRes.status);
    console.log("cardsRes ok:", cardsRes.ok);

    const data = await cardsRes.json();
    cards = data.data;
    total = data.total;

    totalPages = Math.ceil(total / 30);
  }

  // ⭐ Remove duplicate cards by productID
  cards = Object.values(
    cards.reduce((acc, card) => {
      if (!acc[card.productID]) acc[card.productID] = card;
      return acc;
    }, {}),
  );
  return (
    <div className="min-h-screen bg-[url('/images/bg-23.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* Disclaimer + Bucket Buttons grouped together */}
      <div className="flex flex-col items-center text-white pt-4 space-y-4">
    <div className="flex justify-center bg-[#fbf2c4] border-6 border-[#e5c185] rounded-3xl w-[300px] mt-5 mx-auto">
        <img
          src="/images/Gundam-Logo.webp"
          alt="Lorcana Logo"
          width={220}
          height={70}
          className="h-auto"
        />
      </div>
        <p className="max-w-130 text-left text-[16px] text-green-600 bg-black/40 p-3 rounded">
          <span className="text-blue-600 text-[20px]">Note: </span>
          <span>
            Some card images may display a{" "}
            <span className="text-[#ff8531] ">SAMPLE</span> watermark due to
          </span>
          <span className=" block pl-13">
            {" "}
            Bandais image CDN. These cards are real retail cards
          </span>
          <span className="block pl-13">
            {" "}
            and fully playable. Card data is sourced from an unofficial API.
          </span>
        </p>
      </div>

      <form method="GET" className="mb-6 pt-5 text-center">
        <div className="text-[#ffffff] bg-[#03045e] w-74 mx-auto">
          <select
            name="setCode"
            defaultValue={setCode}
            className="bg-[#03045e] border-2 p-2  border-white rounded"
          >
            <option
              value=""
              className="bg-[#03045e] text-[#ffffff] hover:bg-gray-700 hover:text-white"
            >
              Select a Set
            </option>
            {sets.map((s) => (
              <option
                key={s.setCode}
                value={s.setCode}
                className="bg-[#03045e] text-[#ffffff] hover:bg-gray-700 hover:text-black"
              >
                {s.setName}
              </option>
            ))}
          </select>
        </div>

        {/* No set selected */}
        {!setCode && (
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
          <h2 className="text-[30px] sm:text-[30px] md:text-[40px] lg:text-[50px] text-white text-center">
            {selectedSetName}
          </h2>
        </MagicWord>
      )}

      {setCode && (
        <>
          <p className="text-center text-[18px] font-semibold text-yellow-400 mb-4">
            {total} result{total !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cards.map((card) => (
              <Link
                key={card.productID}
                href={`/gundam/cards/${card.productID}`}
                className="block"
              >
                <img
                  src={`/api/gundam/image?code=${card.productID}`}
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
                href={`/gundam/cards?page=${page - 1}&setCode=${setCode}`}
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
                href={`/gundam/cards?page=${page + 1}&setCode=${setCode}`}
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
