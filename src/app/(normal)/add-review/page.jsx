"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import HeroBG from "@/conponents/tripHero";
import Input from "@/conponents/input";
import Textarea from "@/conponents/textArea";
import SubmitButton from "@/conponents/submitButton";
import { addReview } from "../../../../lib/tripHelper";

export default function ReviewPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const update = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  async function submit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!rating) {
      setError("Choose a star rating before sending your review.");
      return;
    }
    setLoading(true);
    try {
      await addReview({ ...form, rating });
      setMessage(
        "Thank you for sharing your story. Your review has been submitted for approval.",
      );
      setForm({ name: "", email: "", message: "" });
      setRating(0);
      setHover(0);
    } catch {
      setError("We couldn’t send your review. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <HeroBG
        text="Every journey has a story."
        eyebrow="We’d love to hear yours"
        img="/hero3.jpg"
      />
      <div className="site-container site-section">
        <form
          className="site-panel max-w-2xl mx-auto space-y-6"
          onSubmit={submit}
        >
          <div>
            <span className="site-eyebrow">A memory worth sharing</span>
            <h2 className="site-title">How was your adventure?</h2>
            <p className="text-sub mt-4">
              The highlights, the little surprises, the moments that stayed with
              you. Tell us about your Roamify experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              title="Your name"
              placeholder="Full name"
              value={form.name}
              onChange={update("name")}
              required
              autoComplete="name"
            />
            <Input
              title="Email address"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={update("email")}
              required
              autoComplete="email"
            />
          </div>
          <fieldset>
            <legend className="text-sm font-medium mb-3">
              Rate your experience
            </legend>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-label={`Rate ${value} ${value === 1 ? "star" : "stars"}`}
                  aria-pressed={rating === value}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  onFocus={() => setHover(value)}
                  onBlur={() => setHover(0)}
                  onClick={() => setRating(value)}
                  className="p-1 text-primary"
                >
                  <Star
                    size={28}
                    strokeWidth={1.5}
                    fill={(hover || rating) >= value ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </fieldset>
          <Textarea
            title="Your travel story"
            placeholder="What made your trip memorable?"
            value={form.message}
            onChange={update("message")}
            required
          />
          <SubmitButton type="submit" loading={loading}>
            Share your experience
          </SubmitButton>
          {message && (
            <p role="status" className="text-sm text-green-700">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
