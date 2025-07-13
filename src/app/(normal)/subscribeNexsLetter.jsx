"use client";

import { useState } from "react";
const { insertSubscription } = require("lib");

function SubscribeNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!email) return;
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await insertSubscription(email);
      setSuccess("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      console.error("Subscription failed:", err);
      setError("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-7xl py-12 mx-auto px-4">
      <div
        className="rounded-2xl flex items-center justify-center px-4 h-96"
        style={{
          backgroundImage: "url('./newsletter.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="-translate-y-12 xl:translate-x-24 flex flex-col items-center">
          <p className="text-white text-center font-bold max-w-lg w-full text-3xl md:text-4xl">
            Subscribe newsletter & get company news.
          </p>

          <div className="bg-white py-1 px-1 justify-between w-full max-w-sm flex gap-2 rounded mt-6">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="pl-6 outline-none w-[60%] disabled:bg-gray-100"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`py-3 px-6 rounded-sm text-white ${
                loading
                  ? "bg-[#FF6B35]/50 cursor-not-allowed"
                  : "bg-[#FF6B35] hover:bg-[#e65c2f]"
              }`}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {success && (
            <p className="text-green-100 mt-4 font-medium">{success}</p>
          )}
          {error && <p className="text-red-200 mt-4 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SubscribeNewsletter;
