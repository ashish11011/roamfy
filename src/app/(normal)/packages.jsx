"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
export function Packages({ data: tripData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isToggleDomestic, setIsToggleDomestic] = useState(true);
  const [filtredTrip, setFiltredTrip] = useState(tripData);
  useEffect(() => {
    setIsLoading(true);
    if (isToggleDomestic) {
      setFiltredTrip(
        tripData?.filter((trip) => {
          return trip.isDomestic;
        })
      );
    } else {
      setFiltredTrip(
        tripData?.filter((trip) => {
          return !trip.isDomestic;
        })
      );
    }
    setIsLoading(false);
  }, [isToggleDomestic]);
  return (
    <div id="package" className=" py-16 md:py-20">
      <div className=" bg-white px-4 sm:px-6  ">
        <div className=" w-full mx-auto max-w-7xl flex flex-col gap-4 md:gap-6">
          <h2 className=" text-3xl  text-gray-700 font-extrabold md:text-5xl text-center md:font-medium ">
            Our Travel Packages
          </h2>
          <div className="relative select-none flex  p-0.5 rounded-3xl border-2 mx-auto">
            <div
              className={cn(
                "absolute top-0.5 left-0.5 w-24 h-[calc(100%-0.25rem)] rounded-3xl bg-[#FD4C5C] z-0 transition-transform duration-300 ease-in-out",
                isToggleDomestic ? "translate-x-0" : "translate-x-full"
              )}
            ></div>

            <p
              onClick={() => setIsToggleDomestic((prev) => !prev)}
              className={cn(
                "py-1.5 font-medium w-24 text-center bg-transparent z-10  px-3 cursor-pointer transition-colors duration-300",
                isToggleDomestic ? "text-white" : "text-[#FD4C5C]"
              )}
            >
              Domestic
            </p>

            <p
              onClick={() => setIsToggleDomestic((prev) => !prev)}
              className={cn(
                "py-1.5 font-medium w-24 text-center bg-transparent z-10  px-3 cursor-pointer transition-colors duration-300",
                !isToggleDomestic ? "text-white" : "text-[#FD4C5C]"
              )}
            >
              Abroad
            </p>
          </div>

          <div className=" mb-6"></div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-4">
            {!isLoading &&
              filtredTrip?.map((item, idx) => {
                return <PackageCard key={item.slug} {...item} idx={idx} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ title, bannerImage, dates, slug, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="border flex justify-end rounded-2xl overflow-hidden shadow-md h-96 hover:shadow-lg "
    >
      <div className=" w-full relative py-6 px-4 flex flex-col mt-auto h-fit text-white ">
        <div className=" absolute top-0 left-0 w-full h-full blur bg-gradient-to-b from-[#0f0f0f3f] via-black to-black opacity-70"></div>
        <div className=" z-20 flex flex-col justify-between w-full ">
          <Link href={`/trip?tripId=${slug}`}>
            <h3 className=" w-fit hover:underline text-2xl line-clamp-2 font-medium text-gray-100 mb-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* <div className=" z-20 flex items-center justify-between gap-4 w-full">
          <p className=" text-[#ffd7c8] font-semibold">{dates?.[0]}</p>
        </div> */}
      </div>
    </motion.div>
  );
}
