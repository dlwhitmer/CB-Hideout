import { db } from "../../lib/db/db";
import { magicCards } from "../../lib/db/schema/magic_cards";
import { magicSingles } from "../../lib/db/schema/magic_singles";
// import { gundamCards } from "../../lib/db/schema";
// import { lorcanaCards } from "../../lib/db/schema";
// import { onePieceCards } from "../../lib/db/schema";
import { riftBoundCards } from "../../lib/db/schema";
import { eq, or, sql } from "drizzle-orm";
import BackButton from "../backButton";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";

  if (!q) {
    return (
      <div className="min-h-screen bg-red-500 mx-auto text-center">
        <h1 className="text-2xl font-bold">Search</h1>
        <p>Enter something to search for.</p>
      </div>
    );
  }

  const search = `%${q}%`;

  const lowerQ = q.toLowerCase();

  const isDFC =
    lowerQ === "dfc" ||
    lowerQ === "dfk" ||
    lowerQ === "double faced" ||
    lowerQ === "double-faced" ||
    lowerQ === "double face" ||
    lowerQ === "transform" ||
    lowerQ === "flip card";

  const magicResults = await db
    .select()
    .from(magicSingles)
    .where(
      or(
        sql`lower(${magicSingles.frontName}) LIKE lower(${search})`,
        sql`lower(${magicSingles.scryfallId}) LIKE lower(${search})`,
        sql`lower(${magicSingles.rarity}) LIKE lower(${search})`,
        sql`lower(${magicSingles.card_faces}) LIKE lower(${search})`,
        sql`lower(${magicSingles.setCode}) LIKE lower(${search})`,
        sql`lower(${magicSingles.setName}) LIKE lower(${search})`,
        sql`lower(${magicSingles.backColors}) LIKE lower(${search})`,
        sql`lower(${magicSingles.colorIdentity}) LIKE lower(${search})`,
        sql`lower(${magicSingles.frontManaCost}) LIKE lower(${search})`,
        sql`lower(${magicSingles.backManaCost}) LIKE lower(${search})`,
        sql`lower(${magicSingles.cmc}) LIKE lower(${search})`,
        sql`lower(${magicSingles.frontPower}) LIKE lower(${search})`,
        sql`lower(${magicSingles.backPower}) LIKE lower(${search})`,
        sql`lower(${magicSingles.frontToughness}) LIKE lower(${search})`,
        sql`lower(${magicSingles.backToughness}) LIKE lower(${search})`,
        sql`lower(${magicSingles.frontOracleText}) LIKE lower(${search})`,
        sql`lower(${magicSingles.backOracleText}) LIKE lower(${search})`,
        sql`lower(${magicSingles.artist}) LIKE lower(${search})`,
        sql`lower(${magicSingles.layout}) LIKE lower(${search})`,
      ),
    );

  const magicCardsResults = await db
    .select()
    .from(magicCards)
    .where(
      or(
        sql`lower(${magicCards.frontName}) LIKE lower(${search})`,
        sql`lower(${magicCards.scryfallId}) LIKE lower(${search})`,
        sql`lower(${magicCards.rarity}) LIKE lower(${search})`,

        // ⭐ REAL DFC DETECTION
        isDFC
          ? sql`${magicCards.backImageSmall} IS NOT NULL`
          : sql`lower(${magicCards.card_faces}) LIKE lower(${search})`,

        sql`lower(${magicCards.setCode}) LIKE lower(${search})`,
        sql`lower(${magicCards.setName}) LIKE lower(${search})`,
        sql`lower(${magicCards.backColors}) LIKE lower(${search})`,
        sql`lower(${magicCards.colorIdentity}) LIKE lower(${search})`,
        sql`lower(${magicCards.frontManaCost}) LIKE lower(${search})`,
        sql`lower(${magicCards.backManaCost}) LIKE lower(${search})`,
        sql`lower(${magicCards.cmc}) LIKE lower(${search})`,
        sql`lower(${magicCards.frontPower}) LIKE lower(${search})`,
        sql`lower(${magicCards.backPower}) LIKE lower(${search})`,
        sql`lower(${magicCards.frontToughness}) LIKE lower(${search})`,
        sql`lower(${magicCards.backToughness}) LIKE lower(${search})`,
        sql`lower(${magicCards.frontOracleText}) LIKE lower(${search})`,
        sql`lower(${magicCards.backOracleText}) LIKE lower(${search})`,
        sql`lower(${magicCards.artist}) LIKE lower(${search})`,
        sql`lower(${magicCards.layout}) LIKE lower(${search})`,
      ),
    );

  const riftBoundResults = await db
    .select()
    .from(riftBoundCards)
    .where(
      or(
        sql`lower(${riftBoundCards.name}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.riftboundId}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.rarity}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.type}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.energy}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.might}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.power}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.setName}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.supertype}) LIKE lower(${search})`,
        sql`lower(${riftBoundCards.artist}) LIKE lower(${search})`,
      ),
    );

  
  const total =
    magicResults.length + magicCardsResults.length + riftBoundResults.length;

  return (
    <div className="min-h-screen bg-[#ffd380] p-4">
      <div className=" flex justify-center p-3 ">
        <BackButton />
      </div>
      <h1 className=" text-2xl font-bold text-center mb-6">
        Search Results for {q}
      </h1>

        <p className="text-center mb-6">
          {total} result{total !== 1 ? "s" : ""}
        </p>

      {magicResults.length > 0 && (
        <section className=" bg-[#fbf2c4] mb-8">
          <div className="bg-black flex justify-center mb-2">
            <img
              src="/images/Magic-Logo.webp"
              alt="Magic Logo"
              width={220}
              height={70}
              className="h-auto"
            />
          </div>
          <div className="card-grid gap-6">
            {magicResults.map((card) => (
              <a
                key={card.id}
                href={`/magic/singles/${card.id}`}
                className="bg-gray-800 p-3 rounded shadow"
              >
                <img
                  src={card.frontImageSmall || "/placeholder.png"}
                  alt={card.frontName}
                  className="w-full rounded"
                />
                <h3 className="text-white text-center font-bold">
                  {card.frontName}
                </h3>
              </a>
            ))}
          </div>
        </section>
      )}
      {riftBoundResults.length > 0 && (
        <section className=" bg-[#fbf2c4] mb-8">
          <div className="bg-black flex justify-center mb-2">
            <img
              src="/images/RiftBound-Logo.webp"
              alt="RiftBound Logo"
              width={220}
              height={70}
              className="h-auto"
            />
          </div>
          <div className="card-grid gap-6">
            {riftBoundResults.map((card) => (
              <a
                key={card.id}
                href={`/magic/singles/${card.id}`}
                className="bg-gray-800 p-3 rounded shadow"
              >
                <img
                  src={card.imgUrl || "/placeholder.png"}
                  alt={card.name}
                  className="w-full rounded"
                />
                <h3 className="text-white text-center font-bold">
                  {card.name}
                </h3>
              </a>
            ))}
          </div>
        </section>
      )}
      {magicCardsResults.length > 0 && (
        <section className=" bg-[#fbf2c4] mb-8">
          <div className="bg-black flex justify-center mb-2">
            <img
              src="/images/Magic-Logo.webp"
              alt="magic Logo"
              width={220}
              height={70}
              className="h-auto"
            />
          </div>
          <div className="card-grid gap-6">
            {magicCardsResults.map((card) => (
              <a
                key={card.id}
                href={`/magic/cards/${card.id}`}
                className="bg-gray-800 p-3 rounded shadow"
              >
                <img
                  src={card.frontImageSmall || "/placeholder.png"}
                  alt={card.frontName}
                  className="w-full rounded"
                />
                <h3 className="text-white text-center font-bold">
                  {card.frontName}
                </h3>
              </a>
            ))}
          </div>
        </section> 
      )}

      {total === 0 && <p className="text-center">No cards found.</p>}
    </div>
  );
}
