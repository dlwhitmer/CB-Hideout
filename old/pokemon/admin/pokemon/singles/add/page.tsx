"use client";

import { useState } from "react";

export default function AddPokemonSinglePage() {
  const [form, setForm] = useState({
    setName: "",
    setCode: "",
    flavorText: "",
    price: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/pokemon/singles", {
      method: "POST",
      body: JSON.stringify(form),
    });

    window.location.href = "/admin/pokemon/singles";
  }

  return (
    <div>
      <h1>Add Pokemon Single</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.setName}
          onChange={e => setForm({ ...form, setName: e.target.value })}
        />

        <input
          placeholder="Set Name"
          value={form.setCode}
          onChange={e => setForm({ ...form, setCode: e.target.value })}
        />

        <input
          placeholder="Rarity"
          value={form.flavorText}
          onChange={e => setForm({ ...form, flavorText: e.target.value })}
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
