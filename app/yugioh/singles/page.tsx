import Image from "next/image";
import { db } from "../../../lib/db/db";
import {
  yugiohSingles,
  yugiohSets,
  yugiohPrintings,
} from "../../../lib/db/schema/yugioh";

import { eq, like, and, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    type?: string;
    race?: string;
    attribute?: string;
    set?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const type = params.type ?? "";
  const race = params.race ?? "";
  const attribute = params.attribute ?? "";
  const set = params.set ?? "";

  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  // ---------------------------
  // DATA QUERY (SINGLES)
  // ---------------------------

  const rows = await db
    .select({
      yugioh_singles: yugiohSingles,
    })
    .from(yugiohSingles)
    .leftJoin(
      yugiohPrintings,
      eq(yugiohSingles.yugiohId, yugiohPrintings.yugiohId),
    )
    .where(
      and(
        set ? eq(yugiohPrintings.setName, set) : undefined,
        type ? like(yugiohSingles.type, `%${type}%`) : undefined,
        race ? eq(yugiohSingles.race, race) : undefined,
        attribute ? eq(yugiohSingles.attribute, attribute) : undefined,
      ),
    )
    .groupBy(yugiohSingles.id) // ⭐ THIS removes duplicates
    .limit(pageSize)
    .offset(offset)
    .all();

  const debug = await db
    .select({
      code: yugiohPrintings.setCode,
      name: yugiohPrintings.setName,
    })
    .from(yugiohPrintings)
    .limit(50);

  console.log(debug);
  // ---------------------------
  // SET LIST FOR DROPDOWN
  // ---------------------------
  const sets = await db
    .select({
      id: yugiohSets.id,
      setName: yugiohSets.setName,
      setCode: yugiohSets.setCode,
    })
    .from(yugiohSets)
    .all();

  // ---------------------------
  // COUNT QUERY
  // ---------------------------
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(yugiohSingles);

  const total = totalResult[0]?.count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="min-h-screen bg-[url('/images/bg-28.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* FILTER BAR */}
      <form className="filter-stack text-white text-center">
        {/* SETS */}
        <select name="set" defaultValue={set} className="filter-center">
          <option value="">All Sets</option>
          {sets.map((s) => (
            <option key={s.id} value={s.setName}>
              {s.setName}
            </option>
          ))}
        </select>

        {/* TYPE */}
        <select name="type" defaultValue={type} className="filter-center">
          <option value="">All Types</option>
          <option value="Effect Monster">Effect Monster</option>
          <option value="Normal Monster">Normal Monster</option>
          <option value="Fusion Monster">Fusion Monster</option>
          <option value="Synchro Monster">Synchro Monster</option>
          <option value="XYZ Monster">XYZ Monster</option>
          <option value="Link Monster">Link Monster</option>
          <option value="Spell Card">Spell Card</option>
          <option value="Trap Card">Trap Card</option>
        </select>

        {/* RACE */}
        <select name="race" defaultValue={race} className="filter-center">
          <option value="">All Races</option>
          <option value="Insect">Insect</option>
          <option value="Dragon">Dragon</option>
          <option value="Warrior">Warrior</option>
          <option value="Spellcaster">Spellcaster</option>
          <option value="Fiend">Fiend</option>
          <option value="Psychic">Psychic</option>
          <option value="Fairy">Fairy</option>
          <option value="Machine">Machine</option>
          <option value="Divine-Beast">Divine-Beast</option>
          <option value="Creator God">Creator God</option>
          <option value="Beast">Beast</option>
          <option value="Zombie">Zombie</option>
          <option value="Fish">Fish</option>
          <option value="Aqua">Aqua</option>
          <option value="Pyro">Pyro</option>
          <option value="Thunder">Thunder</option>
          <option value="Rock">Rock</option>
          <option value="Plant">Plant</option>
          <option value="Reptile">Reptile</option>
          <option value="Sea Serpent">Sea Serpent</option>
          <option value="Winged Beast">Winged Beast</option>
          <option value="Dinosaur">Dinosaur</option>
          <option value="Insect">Insect</option>
          <option value="Cyberse">Cyberse</option>
          <option value="Normal">Normal</option>
          <option value="Quick-Play">Quick-Play</option>
          <option value="Continuous">Continuous</option>
          <option value="Equip">Equip</option>
          <option value="Field">Field</option>
          <option value="Ritual">Ritual</option>
          <option value="Counter">Counter</option>
        </select>

        {/* ATTRIBUTE */}
        <select
          name="attribute"
          defaultValue={attribute}
          className="filter-center"
        >
          <option value="">All Attributes</option>
          <option value="LIGHT">LIGHT</option>
          <option value="DARK">DARK</option>
          <option value="FIRE">FIRE</option>
          <option value="WATER">WATER</option>
          <option value="EARTH">EARTH</option>
          <option value="WIND">WIND</option>
          <option value="DIVINE">DIVINE</option>
        </select>

        <button type="submit" className=" filter-button">
          Filter
        </button>
      </form>

      {/* TITLE */}
      <div className="flex justify-center">
        <img
          src="/images/yugioh_logo.webp"
          alt="Yu-Gi-Oh"
          className="yugioh-title object-contain"
        />
      </div>

      {/* GRID */}
      <div className=" card-grid gap-6 pt-5">
        {rows.map((row) => {
          const single = row.yugioh_singles;
          // const printing = row.yugioh_printings;

          const small = single?.imageSmall;
          console.log(
            "CARD:",
            single.name,
            "DB ID:",
            single.id,
            "YuGiOh ID:",
            single.yugiohId,
          );
          return (
            <a
              key={single.id}
              href={`/yugioh/singles/${single.id}`}
              className="w-[170px] sm:w-[170px] md:w-[225px] lg:w-[250px]
                   bg-gray-800 p-3 rounded shadow hover:scale-105 transition mx-auto"
            >
              <div className="bg-[url('/card-bg.png')] bg-contain bg-no-repeat bg-center rounded">
                <img
                  src={small || "/placeholder.png"}
                  alt={single.name}
                  className="w-full h-auto rounded shadow"
                  loading="lazy"
                />
              </div>

              <h2 className="font-semibold text-lg text-white text-center">
                {single.name}
              </h2>

              <p className="text-white text-sm">
                {Number(single.price).toLocaleString("en-US", {
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
            href={`/yugioh/singles?page=${page - 1}`}
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
            href={`/yugioh/singles?page=${page + 1}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
