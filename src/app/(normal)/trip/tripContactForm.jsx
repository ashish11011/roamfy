"use client";
import Input from "@/conponents/input";
import Textarea from "@/conponents/textArea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { insertContactDetail } from "lib";

function TripContactFrom({ slug }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [resMessage, setResMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      await insertContactDetail({
        name,
        email,
        address,
        mobile,
        message,
        slug,
      });

      setResMessage("Form Submitted Successfully");
    } catch (error) {
      console.log(error);
      setResMessage("Form Submit Failed, Please Try Again");
    } finally {
      setName("");
      setEmail("");
      setAddress("");
      setMobile("");
      setMessage("");
    }

    setLoading(false);
  };
  return (
    <div className=" relative py-6 px-4 md:px-6 rounded-2xl h-fit bg-green-50 ring-2 ring-green-700/20 w-full md:max-w-sm flex flex-col gap-4">
      <h3 className=" text-3xl text-center font-medium">Book Your Trip</h3>
      <p className=" text-center text-gray-600">
        Travel is less about destination and more about memories made along the
        way.
      </p>
      <Input
        title={"Name"}
        placeholder="Enter full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        title={"Email"}
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        title={"Address"}
        placeholder="Enter Your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        title={"Mobile"}
        placeholder="Enter Your Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <Textarea
        title="Message"
        placeholder="Enter Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {resMessage && (
        <p className=" text-center text-green-600 font-semibold">
          {resMessage}
        </p>
      )}
      <SubmitButton onClick={handleSubmit} loading={loading} />
      <input
        type="text"
        className="opacity-0 absolute"
        name="slug"
        onChange={(e) => {}}
        value={slug ?? ""}
      />
    </div>
  );
}

export default TripContactFrom;

function SubmitButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn(
        " w-full font-semibold text-lg cursor-pointer text-center py-2 px-4 rounded-full bg-primary  hover:!bg-orange-700 duration-200 text-white",
        loading && " opacity-50 cursor-not-allowed"
      )}
    >
      Send Message
    </button>
  );
}
