"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-5">
      <div className="site-panel w-full max-w-md">
        <Link href="/" aria-label="Roamify home">
          <img
            src="/logo-black.png"
            alt="Roamify Planners"
            className="w-36 h-auto mb-10"
          />
        </Link>
        <span className="site-eyebrow">Behind the adventures</span>
        <h1 className="site-title">Welcome back.</h1>
        <p className="mt-4 mb-8 text-sub text-sm">
          Sign in to manage trips, group tours, and the stories that make
          Roamify.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="site-button w-full"
        >
          Continue with Google <ArrowRight size={18} />
        </button>
        <Link href="/" className="block text-center text-sm text-sub mt-6">
          Back to the website
        </Link>
      </div>
    </main>
  );
}
