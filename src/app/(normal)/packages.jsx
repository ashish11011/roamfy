"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { GroupTourPrices } from "@/components/groupTourPrices";

export function Packages({ data: tripData = [] }) {
  const [isToggleDomestic, setIsToggleDomestic] = useState(true);
  const filtredTrip = tripData.filter(trip => Boolean(trip.isDomestic) === isToggleDomestic);
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

            <button
              type="button"
              aria-pressed={isToggleDomestic}
              onClick={() => setIsToggleDomestic(true)}
              className={cn(
                "py-1.5 font-medium w-24 text-center bg-transparent z-10  px-3 cursor-pointer transition-colors duration-300",
                isToggleDomestic ? "text-white" : "text-[#FD4C5C]"
              )}
            >
              Domestic
            </button>

            <button
              type="button"
              aria-pressed={!isToggleDomestic}
              onClick={() => setIsToggleDomestic(false)}
              className={cn(
                "py-1.5 font-medium w-24 text-center bg-transparent z-10  px-3 cursor-pointer transition-colors duration-300",
                !isToggleDomestic ? "text-white" : "text-[#FD4C5C]"
              )}
            >
              Abroad
            </button>
          </div>

          <div className=" mb-6"></div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-4">
            {filtredTrip.length > 0 ? (
                filtredTrip?.map((item, idx) => {
                  return <PackageCard key={item.slug} {...item} idx={idx} />;
                })
              ) : (
                <p className=" text-center text-xl col-span-full w-full text-gray-600">
                  No trip found
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GroupTourPackages({ data = [] }) {
  return (
    <section id="group-tour-packages" className="bg-orange-50 py-16 md:py-20 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-gray-700 font-extrabold md:text-5xl text-center md:font-medium">
          Group Tour Package
        </h2>
        <p className="text-center text-gray-600 mt-4 mb-10">
          Choose your room sharing option. All prices are per person.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length ? data.map((item, idx) => (
            <PackageCard key={item.slug} {...item} idx={idx} isGroupTour />
          )) : (
            <p className="col-span-full text-center text-gray-600">
              Group tour packages will be available soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ title, bannerImage, slug, idx, isGroupTour, sharingPrices }) {
  return (
    <Link href={`/${isGroupTour ? "group-trip" : "trip"}/${encodeURIComponent(slug)}`}>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        // style={{
        //   backgroundImage: `url(${bannerImage})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        // }}
        className="border relative flex justify-end rounded-2xl overflow-hidden shadow-md h-96 hover:shadow-lg "
      >
        <Image
          src={bannerImage}
          alt={title}
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className=" w-full relative py-6 px-4 flex flex-col mt-auto h-fit text-white ">
          <div className=" absolute top-0 left-0 w-full h-full blur bg-gradient-to-b from-[#0f0f0f3f] via-black to-black opacity-70"></div>
          <div className=" z-20 flex flex-col justify-between w-full ">
            <h3 className=" w-fit hover:underline text-2xl line-clamp-2 font-medium text-gray-100 mb-1">
              {title}
            </h3>
            {isGroupTour && <GroupTourPrices sharingPrices={sharingPrices} compact />}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
