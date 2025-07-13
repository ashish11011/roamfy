import Link from "next/link";

export function HeroSection2() {
  return (
    <div
      className="relative w-full h-[90vh] bg-emerald-50  flex items-center"
      style={{
        backgroundImage: "url('./pattern-bg.png')",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10 p-4  w-full mx-auto md:h-fit h-full max-w-7xl">
        <div className=" mx-auto md:mx-0 max-w-lg h-full  flex flex-col w-full">
          <img
            src="/hero-car.png"
            alt=""
            className=" max-w-screen block md:hidden w-full h-auto object-contain"
          />
          <span className=" mt-3 text-center md:text-left  text-gray-700 text-4xl sm:text-5xl xl:text-6xl font-bold md:font-medium">
            Find your Perfect{" "}
          </span>
          <span className=" md:mt-3 mt-1 text-center md:text-left text-5xl md:text-7xl xl:text-8xl text-red-500 font-bold">
            Adventure
          </span>

          <p className=" mt-3 text-center mb-6 text-lg md:text-xl md:text-left text-gray-500 ">
            Brouse handpicked travel plans crafted for every kind of explore
            handpicked travel plans crafted for every kind of explore
          </p>

          <Link
            href={"#package"}
            className=" mt-3 text-center  mx-auto text-lg md:m-0 w-full bg-primary text-white font-semibold hover:scale-105 cursor-pointer duration-200 shadow py-3 px-6  rounded-full sm:w-fit"
          >
            View Packages
          </Link>
        </div>
      </div>
      <div className="hidden md:block absolute max-w-full md:max-w-[50%] w-full right-0 top-1/2 -translate-y-1/2 ">
        <img
          src="/hero-car.png"
          alt=""
          className=" w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
