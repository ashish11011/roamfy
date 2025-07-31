import HeroBG from "@/conponents/tripHero";
import { Mail, PhoneIcon } from "lucide-react";
import React from "react";
import { ContactForm } from "./contactForm";
import Link from "next/link";

export const metadata = {
  title: {
    absolute: "Contact Us | Roamify Planners",
  },
  description:
    "Get in touch with Roamify Planners for personalized travel assistance, bookings, and trip planning. Contact us via phone, email, or our online form to plan your next corporate tour, school trip, or honeymoon effortlessly.",
  alternates: {
    canonical: "https://www.roamifyplanners.in/contact-us",
  },
  keywords: [
    "Contact Roamify Planners",
    "travel agency contact",
    "trip planning support",
    "honeymoon bookings",
    "corporate travel help",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us | Roamify Planners",
    description:
      "Reach out to Roamify Planners for travel assistance, bookings, and custom trip planning. We’re here to make your journey seamless and memorable.",
    url: "https://www.roamifyplanners.in/contact-us",
    siteName: "Roamify Planners",
    type: "website",
  },
};

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
          <Link href={"tel:+918239002370"} className=" text-lg">
            +91 8239002370
          </Link>
          {/* <p className=" text-lg">+916239565852</p> */}
        </div>
      </div>
      <div className=" h-full w-full sm:max-w-lg items-center bg-[#f6efe6] px-6 py-12 rounded-2xl flex flex-col gap-4 ">
        <div className=" bg-white p-4 rounded-full w-fit">
          <Mail className="w-9 h-9" fill="#084d2b" stroke="white" />
        </div>
        <p className=" text-4xl font-semibold">Email Address</p>
        <div className=" space-y-2">
          <Link href={"mailto:roamifyplanners@gmail.com"} className=" text-lg">
            roamifyplanners@gmail.com
          </Link>
          {/* <p className=" text-lg">email@gmail.com</p> */}
        </div>
      </div>
    </div>
  );
}
