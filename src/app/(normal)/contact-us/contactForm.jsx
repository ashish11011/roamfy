"use client";
import { useState } from "react";
import { insertContactDetail } from "lib";
import Input from "@/conponents/input";
import Textarea from "@/conponents/textArea";
import SubmitButton from "@/conponents/submitButton";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const update = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setNotification("");
    try {
      if (!(await insertContactDetail(form))) throw new Error();
      setNotification(
        "Thanks for reaching out. We’ll be in touch to plan your journey.",
      );
      setForm({ name: "", email: "", address: "", mobile: "", message: "" });
    } catch {
      setError(
        "We couldn’t send your message. Please try again or give us a call.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="site-panel space-y-6" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-medium tracking-tight">
          Tell us about your next escape.
        </h2>
        <p className="text-sm text-sub mt-2">
          Leave a few details. We’ll take it from here.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          title="Your name"
          placeholder="Full name"
          autoComplete="name"
          required
          value={form.name}
          onChange={update("name")}
        />
        <Input
          title="Email address"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={update("email")}
        />
        <Input
          title="Phone number"
          placeholder="Your contact number"
          type="tel"
          autoComplete="tel"
          required
          value={form.mobile}
          onChange={update("mobile")}
        />
        <Input
          title="Where are you based?"
          placeholder="Your city"
          autoComplete="address-level2"
          value={form.address}
          onChange={update("address")}
        />
      </div>
      <Textarea
        title="What’s the plan?"
        placeholder="Destination, dates, group size, or anything you’d love to include…"
        required
        value={form.message}
        onChange={update("message")}
      />
      <SubmitButton type="submit" loading={loading}>
        Let’s plan a trip
      </SubmitButton>
      {notification && (
        <p role="status" className="text-sm text-green-700">
          {notification}
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
