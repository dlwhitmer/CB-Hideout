"use client";

import { useEffect, useState } from "react";

export default function OnePieceSTPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/onepiece/cards/st");
        const data = await res.json();

        setCards(data.cards || []);
      } catch (err) {
        console.error("Failed to load ST cards:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl font-bold mt-10">
        Loading Starter Deck Cards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf2c4] text-black p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        One Piece – Starter Deck Cards
      </h1>

      {cards.length === 0 && (
        <p className="text-center text-lg font-semibold">
          No Starter Deck cards found.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card: any) => (
          <div
            key={card.id}
            className="bg-white rounded shadow p-4 text-center border border-gray-300"
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-auto rounded mb-3"
            />

            <h2 className="font-bold text-lg">{card.name}</h2>

            <p className="text-sm text-gray-700">
              <strong>Set:</strong> {card.cardSetId}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Type:</strong> {card.type}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Rarity:</strong> {card.rarity}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Cost:</strong> {card.cost}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Power:</strong> {card.power}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
