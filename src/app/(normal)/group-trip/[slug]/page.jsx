import HeroBG from "@/conponents/tripHero";
import { getGroupTripBySlug } from "lib/groupTripHelper";
import { notFound } from "next/navigation";
import { TripDetails } from "../../trip/tripDetails";
import { HotelSection } from "../../trip/hotelSection";

export default async function GroupTripPage({ params }) {
  const { slug } = await params;
  const [groupTrip] = await getGroupTripBySlug(slug);
  if (!groupTrip) notFound();

  return (
    <div className="text-gray-900 tracking-wide leading-7 w-full space-y-16">
      <HeroBG text={groupTrip.title} />
      <TripDetails tripData={groupTrip} isGroupTour />
      {groupTrip.hotels?.length > 0 && <HotelSection hotelData={groupTrip.hotels} />}
      <div className="h-10" />
    </div>
  );
}
