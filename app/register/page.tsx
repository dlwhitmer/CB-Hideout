"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  type FormField = keyof typeof form;

  function update(field: FormField, value: string) {
    setForm({ ...form, [field]: value });
  }

  async function handleRegister() {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/cart";
    } else {
      alert(data.error);
    }
  }

  return (
    <div>
      <h1>Create Account</h1>

      <input
        placeholder="Username"
        onChange={(e) => update("username", e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => update("password", e.target.value)}
      />
      <input
        placeholder="Full Name"
        onChange={(e) => update("name", e.target.value)}
      />
      <input
        placeholder="Address"
        onChange={(e) => update("address", e.target.value)}
      />
      <input
        placeholder="City"
        onChange={(e) => update("city", e.target.value)}
      />
      <input
        placeholder="State"
        onChange={(e) => update("state", e.target.value)}
      />
      <input
        placeholder="Zipcode"
        onChange={(e) => update("zipcode", e.target.value)}
      />

      <button onClick={handleRegister}>Sign Up</button>
    </div>
  );
}
