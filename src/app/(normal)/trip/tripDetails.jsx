import Date from "./Date";
import { HeadingDescription } from "./headingDescription";
import { HeadingList } from "./headingList";
import { TravelPlan } from "./travelPlan";
import TripContactFrom from "./tripContactForm";

export function TripDetails({ tripData }) {
  return (
    <div className=" w-full max-w-7xl justify-between px-5 mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-6 ">
        <HeadingDescription tripDescription={tripData.description} />
        <div
          className="tiptap space-y-2 -mt-3 [&>h2]:mt-8 [&>h1]:mt-8 "
          dangerouslySetInnerHTML={{ __html: tripData.tripInformation }}
        />
        {/* <Date dates={tripData.dates} /> */}
        {/* <HeadingList title={"Includes"} list={tripData.includes} />
        <HeadingList title={"Excludes"} list={tripData.excludes} /> */}
        <TravelPlan
          itinary={{
            description: tripData.itinaryDescription,
            itinary: tripData.itinary,
          }}
        />
      </div>
      <TripContactFrom slug={tripData.slug} />
    </div>
  );
}
