"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold">Login with Google</h2>

      <button
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}
