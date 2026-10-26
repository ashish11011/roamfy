export const dynamic = "force-static";

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
    <div className="trip-page">
      <HeroBG
        text={groupTrip.title}
        img={groupTrip.bannerImage}
        eyebrow="Good company. Great journeys."
      />
      <TripDetails tripData={groupTrip} isGroupTour />
      {groupTrip.hotels?.length > 0 && (
        <HotelSection hotelData={groupTrip.hotels} />
      )}
    </div>
  );
}
