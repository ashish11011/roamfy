import Link from "next/link";
import { getAllTrips } from "../../../../lib";
import ImageUploader from "./imageUpload";
import { TripTable } from "./tripTable";

const Page = async () => {
  const allTripData = await getAllTrips();
  return (
    <div className=" flex flex-col gap-3">
      <p className="text-3xl">Admin Page</p>
      <Seprator />
      <div className=" mt-12 items-center justify-between gap-6 flex w-full">
        <p className=" text-2xl">
          Trip Table - <span>{allTripData.length}</span>{" "}
        </p>

        <div>
          <Link
            href={"/admin/trip"}
            className=" border py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100 duration-200 text-sm"
          >
            New Trip
          </Link>
        </div>
      </div>
      <TripTable tripData={allTripData} />
    </div>
  );
};

export default Page;

function Seprator() {
  return (
    <div className=" h-px rounded-xl w-full bg-gray-400">
      {/* <ImageUploader /> */}
    </div>
  );
}
