import { Button } from "@/components/ui/button";
import { HeadingDescription } from "./headingDescription";
import { TravelPlan } from "./travelPlan";
import TripContactFrom from "./tripContactForm";
import Link from "next/link";

export function TripDetails({ tripData }) {
  return (
    <div className=" w-full max-w-7xl justify-between px-5 mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-6 ">
        <div className=" flex gap-4 w-full justify-between flex-col md:flex-row">
          {tripData?.price && (
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-semibold mb-2 text-gray-700">Price</h1>
              <h2 className="text-3xl font-bold text-primary mb-2">
                Rs. {tripData?.price}
              </h2>

              <span className="text-xs text-gray-400">
                Price is subject to change based on availability and dates.
              </span>
            </div>
          )}
          {
            tripData.itinaryURL && (
              <Link target="_blank" href={tripData.itinaryURL}>
                <Button className={"rounded-sm"}>View Itinerary</Button>
              </Link>
            )
          }
        </div>

        <HeadingDescription tripDescription={tripData?.description} />

        {tripData?.tripInformation && (
          <div
            className="tiptap space-y-2 -mt-3 [&>h2]:mt-8 [&>h1]:mt-8 "
            dangerouslySetInnerHTML={{ __html: tripData?.tripInformation }}
          />
        )}

        <TravelPlan
          itinary={{
            description: tripData?.itinaryDescription,
            itinary: tripData?.itinary,
          }}
        />
      </div>
      <TripContactFrom slug={tripData?.slug} />
    </div>
  );
}
