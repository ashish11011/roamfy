"use client";
import { useState } from "react";
import Input from "@/conponents/input";
import Textarea from "@/conponents/textArea";
import SubmitButton from "@/conponents/submitButton";
import { insertContactDetail } from "lib";

export default function TripContactFrom({ slug, isGroupTour = false }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    message: "",
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
      if (!(await insertContactDetail({ ...form, slug }))) throw new Error();
      setMessage("Your enquiry is on its way. We’ll be in touch soon.");
      setForm({ name: "", email: "", address: "", mobile: "", message: "" });
    } catch {
      setError("We couldn’t send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="trip-enquiry" onSubmit={submit}>
      <span className="site-eyebrow mb-0">Let’s make it happen</span>
      <h2>{isGroupTour ? "Book your group tour" : "Make this trip yours."}</h2>
      <p>Leave your details and we’ll help you plan the next step.</p>
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
        value={form.mobile}
        onChange={update("mobile")}
        required
        autoComplete="tel"
      />
      <Input
        title="Your city"
        placeholder="Where are you based?"
        value={form.address}
        onChange={update("address")}
      />
      <Textarea
        title="Anything you have in mind?"
        placeholder="Dates, group size, or a question for us…"
        value={form.message}
        onChange={update("message")}
      />
      <SubmitButton type="submit" loading={loading} className="w-full">
        Enquire about this trip
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
