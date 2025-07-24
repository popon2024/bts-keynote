"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, logout } from "@/lib/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <nav className="flex justify-between p-4 items-center border-b mb-10 border-amber-200">
        <div>
          <strong>My Keynote</strong>
        </div>
        <button
          className="cursor-pointer border border-neutral-50 rounded-2xl py-3 px-4"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </nav>
      <div className="flex justify-center">
        <div className="container ">{children}</div>
      </div>
    </>
  );
}
