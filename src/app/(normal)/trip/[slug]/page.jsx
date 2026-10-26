export const dynamic = "force-static";

import HeroBG from "@/conponents/tripHero";
import { notFound } from "next/navigation";
import { getTripBySlug } from "../../../../../lib/tripHelper";
import { TripDetails } from "../tripDetails";
import { HotelSection } from "../hotelSection";

const Page = async ({ params }) => {
  const { slug } = await params;
  const [tripData] = await getTripBySlug(slug);

  if (!tripData) {
    notFound();
  }

  return (
    <div className="trip-page">
      <HeroBG
        text={tripData.title}
        img={tripData.bannerImage}
        eyebrow="Your next adventure"
      />
      <TripDetails tripData={tripData} />
      {tripData.hotels?.length > 0 && (
        <HotelSection hotelData={tripData.hotels} />
      )}
    </div>
  );
};

export default Page;
