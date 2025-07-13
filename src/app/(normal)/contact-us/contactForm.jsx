"use client";

import { insertContactDetail } from "lib";
import { useEffect, useState } from "react";

const { default: Input } = require("@/conponents/input");
const { default: SubmitButton } = require("@/conponents/submitButton");
const { default: Textarea } = require("@/conponents/textArea");

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(name, email, address, mobile, message);
  }, [name, email, address, mobile, message]);

  async function handleSubmit() {
    setLoading(true);
    await insertContactDetail({
      name,
      email,
      address,
      mobile,
      message,
    });
    setLoading(false);
  }
  return (
    <div className=" px-6 py-12 w-full">
      <div className=" max-w-5xl mx-auto w-full shadow-md py-10 border border-gray-100 px-12 flex flex-col">
        <h3 className=" text-lg text-emerald-600 italic mb-2 font-medium text-center">
          Contact Us
        </h3>
        <h2 className="mb-6 capitalize text-center text-5xl font-medium font-playfair">
          get in touch
        </h2>
        <p className=" text-center mb-12 text-gray-600">
          We are at your door disposal 7 days a week
        </p>
        <div className=" flex flex-col gap-4 w-full">
          <div className=" flex flex-col md:flex-row gap-6 items-center">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              title={"Name"}
              placeholder="Enter full name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title={"Email"}
              placeholder="Email"
            />
          </div>
          <div className=" flex flex-col md:flex-row gap-6 items-center">
            <Input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              title={"Phone"}
              placeholder="Enter your phone number"
            />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              title={"Location"}
              placeholder="Enter your location"
            />
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            title={"Message"}
            placeholder="Message"
          />

          <div className=" mt-4 w-full">
            <SubmitButton
              onClick={handleSubmit}
              loading={loading}
              className=" ml-auto w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
