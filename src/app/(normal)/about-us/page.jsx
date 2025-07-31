import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroBG from "@/conponents/tripHero";
import TravellerGallery from "./TravelGallary";
import Link from "next/link";

export const metadata = {
  title: {
    absolute: "About Us | Roamify Planners",
  },
  description:
    "Learn more about Roamify Planners – your trusted travel partner for corporate trips, school tours, honeymoons, and curated travel experiences. Discover our story, values, and mission to make every journey memorable.",
  alternates: {
    canonical: "https://www.roamifyplanners.in/about-us",
  },
  keywords: [
    "About Roamify Planners",
    "Roamify travel agency",
    "corporate tours India",
    "honeymoon trips planner",
    "custom travel packages",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Us | Roamify Planners",
    description:
      "Roamify Planners is your go-to travel partner for corporate trips, honeymoons, school excursions, and customized tours. Explore our journey and mission to make travel seamless and unforgettable.",
    url: "https://www.roamifyplanners.in/about-us",
    siteName: "Roamify Planners",
    type: "website",
  },
};

export default function AboutUsSection() {
  return (
    <section className="w-full ">
      <HeroBG text="About Us" />

      <div className=" py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm text-gray-500 mb-2">About Us</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Curating Memorable Trips <br /> Across India & Beyond
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            At Roamify Planners, we specialize in crafting unforgettable group
            tours for colleges, schools, corporates, and honeymooners. From
            transport and hotels to sightseeing and special events—we take care
            of everything so you can just pack and go!
          </p>

          <Link
            href={"/contact-us"}
            className="mt-8 inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Right Images */}
        <div className="flex space-x-4 justify-center">
          <div className="w-1/2">
            <Image
              src="/about-us-1.jpeg"
              alt="Traveler with backpack"
              width={500}
              height={600}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
          <div className="w-1/2">
            <Image
              src="/about-us-2.png"
              alt="Woman in yellow dress on island"
              width={500}
              height={600}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      <TravellerGallery />
    </section>
  );
}
