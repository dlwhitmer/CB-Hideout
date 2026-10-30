
"use client";

import BackButton from "../../../../../backButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type MagicCard = {
  id: number;
  scryfallId: string;
  name: string;
  setName: string | null;
  rarity: string | null;
  imageSmall: string | null;
  ourPrice: number | null;
};

export default function EditMagicSinglePage() {
  const { id } = useParams<{ id: string }>();

  const [card, setCard] = useState<MagicCard | null>(null);
  const [ourPrice, setOurPrice] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/magic/singles/${id}`);

        if (!res.ok) {
          throw new Error("Could not load card");
        }

        const json = await res.json();
        const data = json.data as MagicCard;

        setCard(data);
        setOurPrice(data.ourPrice == null ? "" : String(data.ourPrice));
      } catch (error) {
        console.error("Error loading card:", error);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/magic/singles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ourPrice: ourPrice === "" ? null : Number(ourPrice),
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.error ?? "Could not save price.");
      return;
    }

    window.location.href = "/admin/magic/singles";
  }

  if (!card) return <div>Loading card...</div>;

  return (
    <div className="min-h-screen w-full bg-[#ffd380]">
      <div className="mx-auto min-h-screen max-w-[400px] pt-3 text-center text-black">
        <h1 className="mb-4 text-[30px] font-bold">
          Edit Magic Card Price
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex max-w-sm flex-col gap-3 bg-[#fbf2c4] p-5"
        >
          <div className="flex justify-center">
            <BackButton />
          </div>

          <div className="flex justify-center">
            {card.imageSmall && (
              <img
                src={card.imageSmall}
                alt={card.name}
                width={180}
                height={250}
                className="rounded shadow"
              />
            )}
          </div>

          <p className="text-xl font-bold">{card.name}</p>
          <p>{card.setName}</p>
          <p>{card.rarity}</p>

          <p className="break-all text-sm text-gray-600">
            Scryfall ID: {card.scryfallId}
          </p>

          <label className="text-left text-lg font-semibold">
            Our Selling Price ($)
            <input
              className="mt-1 w-full rounded border p-2 text-xl"
              type="number"
              min="0"
              step="0.01"
              value={ourPrice}
              onChange={(e) => setOurPrice(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="mx-auto w-[120px] rounded bg-blue-600 p-2 text-xl text-white"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}