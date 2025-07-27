"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      // Set cookie with expiry
      document.cookie = `admin-auth=${password}; path=/admin; max-age=3600`; // 1 hour
      router.push(from);
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          type="password"
          className="w-full border rounded p-2 mb-4"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && (
          <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
