"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    address: "",
    po_box: "",
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
    <div className="min-h-screen flex flex-col items-center bg-black text-red">
      <h1 className="text-[25px]">Create Account</h1>
      <div className="flex gap-2">
      <input
        className="w-[215px] p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="Username"
        onChange={(e) => update("username", e.target.value)}
      />

      <input
        className="w-[215px] p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="Password"
        onChange={(e) => update("password", e.target.value)}
      ></input>
      </div>

      <input
        className="w-[445px] p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="Full Name"
        onChange={(e) => update("name", e.target.value)}
      ></input>
      <div className="flex gap-2">
      <input
        className="w-[277px] p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="Address"
        onChange={(e) => update("address", e.target.value)}
      />
      <input
        className="w-[152px] p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="PO Box (optional)"
        onChange={(e) => update("po_box", e.target.value)}
      />
      </div>
      <div className="flex gap-2">
      <input
        className="w-[277px] p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="City"
        onChange={(e) => update("city", e.target.value)}
      />
      <input
        className="w-[152px] p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="State"
        onChange={(e) => update("state", e.target.value)}
      />
      </div>
      <input
        className="w-1/8 p-2 m-1 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-white"
        placeholder="Zip Code"
        onChange={(e) => update("zipcode", e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="w-[160px] bg-blue-600 py-2 rounded-md text-[#f8cc1b] font-semibold hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </div>
  );
}
