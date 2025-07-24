"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://94.74.86.174:8080/api/login", {
        username,
        password,
      });

      const token = res.data.data.token;
      setToken(token);
      router.push("/home");
    } catch (err) {
      setError("Login gagal. Cek username/password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full pt-30">
      <div
        className="flex flex-col gap-6 border border-neutral-50"
        style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}
      >
        <div className="text-2xl">Login</div>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            className="border border-neutral-50"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            placeholder="Password"
            type="password"
            className="border border-neutral-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button
            className="cursor-pointer border border-neutral-50 rounded-2xl py-3 px-4"
            type="submit"
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
