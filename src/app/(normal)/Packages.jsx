import { tripTable } from "db/schema";
import { db } from "lib/db";

export const Packages = async () => {
  const data = await db.select().from(tripTable);
  return (
    <div id="package" className=" bg-white px-6 py-20  ">
      <div className=" w-full mx-auto max-w-7xl flex flex-col gap-6">
        <h2 className=" text-5xl text-center mb-6 font-medium font-playfair">
          Our Travel Packages
        </h2>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-4">
          {data.map((item) => {
            return <PackageCard key={item.title} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

function PackageCard({ title, description, image, date, slug }) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="border flex justify-end rounded-2xl overflow-hidden shadow-md h-96 hover:shadow-lg "
    >
      <div className=" relative p-6 flex flex-col mt-auto h-fit text-white ">
        <div className=" absolute top-0 left-0 w-full h-full blur bg-gradient-to-b from-[#0f0f0f3f] via-black to-black opacity-70"></div>
        <div className=" z-20 flex flex-col justify-between w-full ">
          <Link href={"/trip"}>
            <h3 className=" w-fit hover:underline   text-3xl font-playfair line-clamp-2 font-bold mb-2">
              {title}
            </h3>
          </Link>
          <p className="  mb-4 line-clamp-2">{description}</p>
        </div>
        <div className=" z-20 flex items-center justify-between gap-4 w-full">
          <p className=" text-[#ffd7c8] font-semibold">{date}</p>
          <div className=" mt-auto  cursor-pointer font-semibold  py-2 px-4 hover:scale-105 rounded-full  bg-[#FF6B35] duration-200 text-white  w-fit">
            View more
          </div>
        </div>
      </div>
    </div>
  );
}
