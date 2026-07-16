"use client";


import { useState } from "react";

export default function AddYougiohSetPage() {
  const [form, setForm] = useState({
    imageUrl: "",
    setName: "",
    setCode: "",
    totalCards: "",
    quantity: "",
    releaseDate: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/yugioh/sets", {
      method: "POST",
      body: JSON.stringify(form),
    });

    window.location.href = "/admin/yugioh/sets";
  }

  return (
    <div>
      <h1>Add Yugioh Set</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.setName}
          onChange={e => setForm({ ...form, setName: e.target.value })}
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />

        <button type="submit">Add Set</button>
      </form>
    </div>
  );
}
