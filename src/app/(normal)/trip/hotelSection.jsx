import Heading from "@/components/heading";
import { MapPin, Star } from "lucide-react";

export function HotelSection({ hotelData }) {
  return (
    <div className=" flex w-full max-w-7xl px-5 mx-auto flex-col space-y-3">
      <Heading>Hotels</Heading>
      <div className=" flex flex-wrap gap-8">
        {hotelData?.map((item, idx) => {
          return <HotelCard key={idx} item={item} />;
        })}
      </div>
    </div>
  );
}

const HotelCard = ({ item }) => {
  return (
    <div className=" w-full  sm:max-w-72 rounded-2xl overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 md:h-44 object-cover"
        src={item.hotelImage}
        alt="Hotel"
      />
      <div className="p-4">
        <div className="flex  flex-col mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {item.hotelName}
          </h2>
          <div className="flex text-yellow-500">
            {[...Array(Number(item.hotelRating))].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" stroke="none" />
            ))}
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{item.hotelLocation}</span>
        </div>
      </div>
    </div>
  );
};
