"use client";

import { useState } from "react";

export default function AddMagicPacksPage() {
  const [form, setForm] = useState({
    packName: "",
    quantity: "",
    price: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/magic/packs", {
      method: "POST",
      body: JSON.stringify(form),
    });

    window.location.href = "/admin/magic/packs";
  }

  return (
    <div>
      <h1>Add Magic Single</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.packName}
          onChange={e => setForm({ ...form, packName: e.target.value })}
        />

        <input
          placeholder="Rarity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        />

        <button type="submit">Add Pack</button>
      </form>
    </div>
  );
}
