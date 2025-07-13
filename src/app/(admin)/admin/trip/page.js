import React from "react";
import { getTripById } from "../../../../../lib";
import TripDetails from "./tripDetails";

const Page = async ({ params, searchParams }) => {
  let tripData;
  const data = await searchParams;
  const tripId = data.id;
  if (tripId) {
    const [data] = await getTripById(tripId);
    tripData = data;
  } else {
  }
  return (
    <div>
      <TripDetails tripData={tripData} />
    </div>
  );
};

export default Page;
