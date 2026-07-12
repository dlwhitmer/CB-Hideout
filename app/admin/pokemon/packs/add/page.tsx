"use client";

import { useState } from "react";

export default function AddPokemonPacksPage() {
  const [form, setForm] = useState({
    packName: "",
    quantity: "",
    price: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/pokemon/packs", {
      method: "POST",
      body: JSON.stringify(form),
    });

    window.location.href = "/admin/pokemon/packs";
  }

  return (
    <div>
      <h1>Add Pokemon Packs</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.packName}
          onChange={e => setForm({ ...form, packName: e.target.value })}
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
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
