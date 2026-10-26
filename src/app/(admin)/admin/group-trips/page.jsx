import Link from "next/link";
import { getAllGroupTrips } from "lib/groupTripHelper";
import { TripTable } from "../tripTable";

export default async function GroupTripsPage() {
  const groupTrips = await getAllGroupTrips();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl">Group Tour Packages ({groupTrips.length})</h1>
        <Link href="/admin/group-trip" className="border py-2 px-4 rounded-md hover:bg-gray-100">
          New Group Tour Package
        </Link>
      </div>
      <TripTable tripData={groupTrips} isGroupTour />
    </div>
  );
}
