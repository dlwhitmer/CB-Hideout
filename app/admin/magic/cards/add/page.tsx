"use client";

import { useState } from "react";

export default function AddMagicCardsPage() {
  const [form, setForm] = useState({
    name: "",
    setName: "",
    rarity: "",
    price: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/magic/cards", {
      method: "POST",
      body: JSON.stringify(form),
    });

    window.location.href = "/admin/magic/cards";
  }

  return (
    <div>
      <h1>Add Magic Single</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Set Name"
          value={form.setName}
          onChange={e => setForm({ ...form, setName: e.target.value })}
        />

        <input
          placeholder="Rarity"
          value={form.rarity}
          onChange={e => setForm({ ...form, rarity: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        />

        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}
