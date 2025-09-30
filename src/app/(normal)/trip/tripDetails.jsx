import Date from "./Date";
import { HeadingDescription } from "./headingDescription";
import { HeadingList } from "./headingList";
import { TravelPlan } from "./travelPlan";
import TripContactFrom from "./tripContactForm";

export function TripDetails({ tripData }) {
  return (
    <div className=" w-full max-w-7xl justify-between px-5 mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-6 ">
        {tripData?.price && (
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-semibold mb-2 text-gray-700">Price</h1>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Rs. {tripData?.price}
            </h2>
            <span className="text-sm text-gray-500">
              Per person, including flights.
            </span>
            <span className="text-xs text-gray-400">
              Price is subject to change based on availability and dates.
            </span>
          </div>
        )}

        <HeadingDescription tripDescription={tripData?.description} />

        {tripData?.tripInformation && (
          <div
            className="tiptap space-y-2 -mt-3 [&>h2]:mt-8 [&>h1]:mt-8 "
            dangerouslySetInnerHTML={{ __html: tripData?.tripInformation }}
          />
        )}
        {/* <Date dates={tripData.dates} /> */}
        {/* <HeadingList title={"Includes"} list={tripData.includes} />
        <HeadingList title={"Excludes"} list={tripData.excludes} /> */}
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
