import React from "react";

const TripCard = () => {
  return (
    <div className="bg-white group rounded-xl shadow-sm overflow-hidden w-full transform transition  hover:shadow-lg cursor-pointer">
      <div className="relative">
        <img
          src="/trip/spiti.webp"
          className="w-full group-hover:scale-105 duration-300 h-48 object-cover"
          alt="Spiti trip"
        />
        <span className="absolute dm top-2 right-2 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          ₹12,999
        </span>
      </div>

      <div className="p-4">
        <h4 className="text-xl font-bold mb-1">Trip to Nature</h4>
        <p className="text-neutral-500 dm font-semibold mb-2">Spiti Valley</p>
        <hr className="my-3" />

        <div className="text-sm text-neutral-600">
          🗓 14th April - 18th April
        </div>
      </div>
    </div>
  );
};

export default TripCard;
