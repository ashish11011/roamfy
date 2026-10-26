import { TripForm } from "@/components/tripForm";
import { getGroupTripById } from "lib/groupTripHelper";
import { notFound } from "next/navigation";

export default async function GroupTripEditor({ searchParams }) {
  const { id } = await searchParams;
  let groupTrip;
  if (id) {
    [groupTrip] = await getGroupTripById(id);
    if (!groupTrip) notFound();
  }
  return <TripForm key={id || "new-group-trip"} tripData={groupTrip} isGroupTour />;
}
