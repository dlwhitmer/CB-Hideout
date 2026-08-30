"use client";

import React, { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // success → redirect manually
    window.location.href = "/admin";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[300px] bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            className="p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
