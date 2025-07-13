"use client";
import Input from "@/conponents/input";
import SubmitButton from "@/conponents/submitButton";
import Textarea from "@/conponents/textArea";
import HeroBG from "@/conponents/tripHero";
import { Checkbox } from "antd";
import { ArrowUpRight, Mail, PhoneIcon } from "lucide-react";
import React from "react";
import { ContactForm } from "./contactForm";

const Page = () => {
  return (
    <div className=" space-y-8">
      <HeroBG text="Contact Us" img={"./contact-us.jpg"} />
      <Contacts />
      <ContactForm />
    </div>
  );
};

export default Page;

function Contacts() {
  return (
    <div className=" w-full flex-col sm:flex-row max-w-7xl mx-auto p-4 flex items-center justify-center gap-4">
      <div className=" h-full w-full sm:max-w-lg items-center bg-[#f6efe6] px-6 py-12 rounded-2xl flex flex-col gap-4 ">
        <div className=" bg-white p-4 rounded-full w-fit">
          <PhoneIcon className="w-9 h-9" fill="#084d2b" stroke="#084d2b" />
        </div>
        <p className=" text-4xl font-semibold">Phone Number</p>
        <div className=" space-y-2">
          <p className=" text-lg">+916239565852</p>
          <p className=" text-lg">+916239565852</p>
        </div>
      </div>
      <div className=" h-full w-full sm:max-w-lg items-center bg-[#f6efe6] px-6 py-12 rounded-2xl flex flex-col gap-4 ">
        <div className=" bg-white p-4 rounded-full w-fit">
          <Mail className="w-9 h-9" fill="#084d2b" stroke="white" />
        </div>
        <p className=" text-4xl font-semibold">Email Address</p>
        <div className=" space-y-2">
          <p className=" text-lg">email@gmail.com</p>
          <p className=" text-lg">email@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
