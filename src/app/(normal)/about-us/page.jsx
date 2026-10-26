import HeroBG from "@/conponents/tripHero";
import TravellerGallery from "./TravelGallary";
import Link from "next/link";
import { ArrowUpRight, Compass, Heart, Users } from "lucide-react";
import { TravelBenefits } from "@/components/site/homeSections";

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
    <>
      <HeroBG
        text="For the places. For the people. For the memories."
        eyebrow="Our story"
        img="/hero3.jpg"
      />
      <div className="site-container site-section planning-grid">
        <div>
          <span className="site-eyebrow">Hello, we’re Roamify</span>
          <h2 className="site-title">
            A little curiosity can take you a long way.
          </h2>
          <p className="mt-6 text-sub">
            At Roamify Planners, we bring people and places together through
            thoughtfully planned trips. From corporate retreats and college
            adventures to school excursions and honeymoons, we make room for the
            things that make travel special.
          </p>
          <p className="mt-4 text-sub">
            The stays, the transport, the sightseeing, the little details. We
            take care of the plan, so you can be there for the experience.
          </p>
          <Link href="/contact-us" className="site-button mt-8">
            Let’s plan something memorable <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <img
            src="/about-us-1.jpeg"
            alt="A traveller discovering a new destination"
            className="rounded-[24px] h-80 md:h-[460px] w-full object-cover"
          />
          <img
            src="/about-us-2.png"
            alt="Taking in the view on an island escape"
            className="rounded-[24px] h-64 md:h-96 w-full object-cover mt-16"
          />
        </div>
      </div>
      <TravelBenefits />
      <TravellerGallery />
    </>
  );
}
