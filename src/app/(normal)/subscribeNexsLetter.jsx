"use client";
import { useState } from "react";
import { insertSubscription } from "lib";
import { ArrowUpRight } from "lucide-react";

export default function SubscribeNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await insertSubscription(email);
      setMessage("You’re on the list. Here’s to your next adventure!");
      setEmail("");
    } catch {
      setError("We couldn’t subscribe you. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="site-container pb-12 md:pb-20">
      <div className="newsletter-panel">
        <div>
          <span className="site-eyebrow">A little wanderlust, delivered</span>
          <h2 className="site-title">Postcards for your inbox.</h2>
          <p className="text-sub text-sm mt-4">
            Fresh travel inspiration and Roamify updates, ready when you are.
          </p>
        </div>
        <div>
          <form onSubmit={submit} className="newsletter-form">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address for newsletter
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
            />
            <button className="site-button shrink-0" disabled={loading}>
              {loading ? (
                "Joining…"
              ) : (
                <>
                  Count me in <ArrowUpRight size={16} />
                </>
              )}
            </button>
          </form>
          {message && (
            <p role="status" className="text-sm text-green-700 mt-3">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm text-red-700 mt-3">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
