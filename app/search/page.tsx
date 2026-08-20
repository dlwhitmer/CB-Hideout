import { db } from "../../lib/db/db";
import { magicSingles } from "../../lib/db/schema/magic";
import { pokemonSingles } from "../../lib/db/schema/pokemon";
import { yugiohSingles, yugiohPrintings } from "../../lib/db/schema/yugioh";
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
  let magicSearch = search;

  if (
    lowerQ === "dfc" ||
    lowerQ === "dfk" ||
    lowerQ === "double faced" ||
    lowerQ === "double-faced" ||
    lowerQ === "double face"
  ) {
    magicSearch = "%card_face%";
  }

  const magicResults = await db
    .select()
    .from(magicSingles)
    .where(
      or(
        sql`lower(${magicSingles.frontName}) LIKE lower(${search})`,
        sql`lower(${magicSingles.scryfallId}) LIKE lower(${search})`,
        sql`lower(${magicSingles.rarity}) LIKE lower(${search})`,
        sql`lower(${magicSingles.card_faces}) LIKE lower(${magicSearch})`,
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

  const pokemonResults = await db
    .select()
    .from(pokemonSingles)
    .where(
      or(
        sql`lower(${pokemonSingles.name}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.pokemonId}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.rarity}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.types}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.abilities}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.attacks}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.setCode}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.setName}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.supertype}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.subtypes}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.weaknesses}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.resistances}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.retreatCost}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.artist}) LIKE lower(${search})`,
        sql`lower(${pokemonSingles.hp}) LIKE lower(${search})`,
      ),
    );

  const yugiohResults = await db
    .select()
    .from(yugiohSingles)
    .leftJoin(
      yugiohPrintings,
      eq(yugiohSingles.yugiohId, yugiohPrintings.yugiohId),
    )
    .where(
      or(
        sql`lower(${yugiohSingles.name}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.yugiohId}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.type}) LIKE lower(${search})`,
        sql`lower(${yugiohPrintings.setCode}) LIKE lower(${search})`,
        sql`lower(${yugiohPrintings.setName}) LIKE lower(${search})`,
        sql`lower(${yugiohPrintings.setRarity}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.attribute}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.level}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.linkval}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.atk}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.def}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.desc}) LIKE lower(${search})`,
        sql`lower(${yugiohSingles.archetype}) LIKE lower(${search})`,
      ),
    );
  const total =
    magicResults.length + pokemonResults.length + yugiohResults.length;

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
              alt="Yu-Gi-Oh Logo"
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
                  src={card.imageSmall || "/placeholder.png"}
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

      {pokemonResults.length > 0 && (
        <section className="mb-8">
          <div className="bg-black flex justify-center mb-2">
            <img
              src="/images/pokemon.webp"
              alt="Yu-Gi-Oh Logo"
              width={220}
              height={70}
              className="h-auto"
            />
          </div>

          <div className=" bg-[#fbf2c4] card-grid gap-6">
            {pokemonResults.map((card) => (
              <a
                key={card.id}
                href={`/pokemon/singles/${card.id}`}
                className="bg-gray-800 p-3 rounded shadow"
              >
                <img
                  src={card.imageSmall || "/placeholder.png"}
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

      {yugiohResults.length > 0 && (
        <section className=" bg-[#fbf2c4]  mb-8">
          <div className="bg-black flex justify-center mb-2">
            <img
              src="/images/yugioh_logo.webp"
              alt="Yu-Gi-Oh Logo"
              width={220}
              height={70}
              className="h-auto"
            />
          </div>

          <div className="card-grid gap-6">
            {yugiohResults.map((card) => (
              <a
                key={card.yugioh_singles.id}
                href={`/yugioh/singles/${card.yugioh_singles.id}`}
                className="bg-gray-800 p-3 rounded shadow"
              >
                <img
                  src={card.yugioh_singles.imageSmall || "/placeholder.png"}
                  alt={card.yugioh_singles.name}
                  className="w-full rounded"
                />
                <h3 className="text-white text-center font-bold">
                  {card.yugioh_singles.name}
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
