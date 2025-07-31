import { TripImageCousel } from "@/conponents/tirpImagesCrousel";
import HeroBG from "@/conponents/tripHero";
import { TripDetails } from "./tripDetails";
import { HotelSection } from "./hotelSection";
import { getTripBySlug } from "../../../../lib/tripHelper";
import RedirectHome from "@/conponents/RedirectHome";

const Page = async ({ params, searchParams }) => {
  let tripData;
  const data = await searchParams;
  const tripSlug = data.tripId;
  if (tripSlug) {
    const [data] = await getTripBySlug(tripSlug);
    tripData = data;
  } else {
    return <RedirectHome title="Trip not found" />;
  }

  return (
    <div className=" text-gray-900 tracking-wide leading-7 w-full space-y-16">
      <HeroBG text={tripData?.title} />
      <TripImageCousel imagesArray={tripData?.images} />
      <TripDetails tripData={tripData} />
      {tripData?.hotels?.length > 0 && (
        <HotelSection hotelData={tripData?.hotels} />
      )}
      <div className=" h-10"></div>
    </div>
  );
};

export default Page;
