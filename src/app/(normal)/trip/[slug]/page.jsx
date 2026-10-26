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
    <div className=" text-gray-900 tracking-wide leading-7 w-full space-y-16">
      <HeroBG text={tripData.title} />
      <TripDetails tripData={tripData} />
      {tripData.hotels?.length > 0 && (
        <HotelSection hotelData={tripData.hotels} />
      )}
      <div className=" h-10"></div>
    </div>
  );
};

export default Page;
