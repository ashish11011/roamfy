"use client";
import { useState } from "react";
import { submitBlogForm } from "lib";
import Input from "@/conponents/input";
import Textarea from "@/conponents/textArea";
import SubmitButton from "@/conponents/submitButton";

export function QueryForm({ slug }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const update = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await submitBlogForm({ ...form, slug: slug || "" });
      if (!response) throw new Error();
      setMessage("Thanks for reaching out. We’ll be in touch soon.");
      setForm({ name: "", email: "", message: "", number: "" });
    } catch {
      setError("We couldn’t send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="site-panel space-y-4" onSubmit={submit}>
      <span className="site-eyebrow">Inspired to go?</span>
      <h2 className="text-2xl font-medium tracking-tight">
        Let’s make a plan.
      </h2>
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
      <Input
        title="Phone number"
        placeholder="Your contact number"
        type="tel"
        value={form.number}
        onChange={update("number")}
        required
        autoComplete="tel"
      />
      <Textarea
        title="Your message"
        placeholder="Where would you love to go?"
        value={form.message}
        onChange={update("message")}
      />
      <SubmitButton type="submit" loading={loading} className="w-full">
        Let’s talk travel
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
  );
}
