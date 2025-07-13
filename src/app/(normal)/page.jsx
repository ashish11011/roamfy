import Link from "next/link";
import { Testimonial } from "@/components/testrimonial";
import { FAQsAccordion } from "@/components/FAQAccordion";
import BlogCard from "@/conponents/blogCard";
import { cn } from "@/lib/utils";
import { db } from "lib/db";
import { reviewsTable, tripTable } from "db/schema";
import { Packages } from "./packages";
import SubscribeNewsletter from "./subscribeNexsLetter";
import { eq } from "drizzle-orm";

const Home = async () => {
  const [packageData, reviewData] = await Promise.all([
    db.select().from(tripTable),
    db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.isAdminApproved, true)),
  ]);
  return (
    <div className=" min-h-screen h-full">
      {/* <HeroSection /> */}
      <HeroSection2 />
      <Packages data={packageData} />
      <TravelWithUs />
      <TravelPerfection />
      <Testimonial reviewData={reviewData} />
      <FAQsAccordion />
      <BlogSection />
      <SubscribeNewsletter />
      <Link href="/admin">Admin</Link>
    </div>
  );
};

export default Home;

function HeroSection2() {
  return (
    <div
      className="relative w-full h-[90vh] bg-emerald-50  flex items-center"
      style={{
        backgroundImage: "url('./pattern-bg.png')",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10 p-4  w-full mx-auto max-w-7xl">
        <div className=" mx-auto md:mx-0 max-w-lg flex flex-col gap-6 w-full">
          <img
            src="/hero-car.png"
            alt=""
            className=" block md:hidden w-full h-full object-cover"
          />
          <h1 className="  text-center leading-12 xl:leading-16 md:text-left font-playfair text-dark text-5xl xl:text-6xl font-bold md:font-semibold">
            Find your Perfect{" "}
          </h1>
          <span className=" text-center md:text-left text-6xl md:text-7xl xl:text-8xl text-red-500 font-extrabold">
            Adventure
          </span>

          <p className="text-center mb-6 text-lg md:text-xl md:text-left text-gray-500 ">
            Brouse handpicked travel plans crafted for every kind of explore
            handpicked travel plans crafted for every kind of explore
          </p>

          <button className="  mx-auto text-lg md:m-0 w-full bg-primary text-white font-semibold hover:scale-105 cursor-pointer duration-200 shadow py-3 px-6  rounded-full sm:w-fit">
            View Packages
          </button>
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

function TravelWithUs() {
  const data = [
    {
      icon: "./plane.svg",
      title: "500+ Destinations",
      desc: "Etiam porta sem malesuada magna",
    },
    {
      icon: "./clock-1.svg",
      title: "Best Price Guarantee",
      desc: "Etiam porta sem malesuada magna",
    },
    {
      icon: "./tree.svg",
      title: "Top Notch Support",
      desc: "Etiam porta sem malesuada magna",
    },
  ];

  return (
    <div className=" bg-[#FD4C5C] text-white px-6 pt-12 pb-16 md:px-8 ">
      <div className=" w-full mx-auto max-w-7xl flex flex-col gap-6">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-4 mt-4">
          {data.map((item) => {
            return <TravelCard key={item.title} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}

function TravelCard({ icon, title, desc }) {
  return (
    <div className=" flex items-center md:justify-center gap-4 w-full">
      <img src={icon} />
      <div className=" flex flex-col gap-1">
        <p className=" text-xl font-medium">{title}</p>
        <p className=" text-gray-200">{desc}</p>
      </div>
    </div>
  );
}

function TravelPerfection() {
  const contentSections = [
    {
      title: "Tell us what you want to do",
      description:
        "Share your travel goals — from meetings and conferences to off-site retreats. We’ll tailor the perfect business travel plan to suit your needs.",
    },
    {
      title: "Share your travel preference",
      description:
        "Let us know your preferred airlines, hotel types, budget limits, and travel policies. We align every booking to match your company’s standards.",
    },
    {
      title: "We’ll give you recommendations",
      description:
        "Based on your preferences, we’ll suggest optimized travel options that balance comfort, cost, and convenience — all in real-time.",
    },
  ];

  return (
    <div className=" bg-emerald-50 w-full px-4">
      <div className=" mx-auto max-w-7xl py-20">
        <h3 className=" text-lg text-emerald-600 italic mb-3 font-medium text-center">
          Three steps for a perfect trip
        </h3>
        <h2 className=" text-center text-5xl font-medium font-playfair">
          Find Travel Perfection
        </h2>
        <p className=" text-center mx-auto max-w-3xl mt-4 text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          nemo nihil et sint dolore earum at quidem, quam placeat incidunt
          consequatur eius recusandae iste i
        </p>

        <div className=" w-full  mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:px-6">
          <TravelPerfectionCard
            title={contentSections[0].title}
            description={contentSections[0].description}
          >
            <div
              className=" w-24 md:w-32 mx-auto  h-24 md:h-32 bg-red-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={`/feature-1.svg`}
                className=" size-12 md:size-16 object-contain"
                alt="Feature Icon"
              />
            </div>
          </TravelPerfectionCard>
          <TravelPerfectionCard
            title={contentSections[1].title}
            description={contentSections[1].description}
          >
            <div
              className=" w-24 md:w-32 mx-auto  h-24 md:h-32 bg-blue-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={`/feature-2.svg`}
                className=" size-12 md:size-16 object-contain"
                alt="Feature Icon"
              />
            </div>
          </TravelPerfectionCard>
          <TravelPerfectionCard
            title={contentSections[2].title}
            description={contentSections[2].description}
            className=" "
          >
            <div
              className=" h-24 w-24 md:w-32 mx-auto md:h-32 bg-emerald-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={`/feature-3.svg`}
                className=" size-16 md:size-20 object-contain"
                alt="Feature Icon"
              />
            </div>
          </TravelPerfectionCard>
        </div>
      </div>
    </div>
  );
}

function TravelPerfectionCard({ children, title, description, className }) {
  return (
    <div
      className={cn(
        " bg-white shadow-md rounded-xl px-2 md:px-6 py-4 md:py-12",
        className
      )}
    >
      {children}
      <h3 className=" mt-4 md:mt-6 text-center text-lg md:text-2xl font-semibold">
        {title}
      </h3>
      <p className=" mt-2 text-sm md:mt-4 text-gray-400  text-center ">
        {description}
      </p>
    </div>
  );
}

function BlogSection() {
  return (
    <div className=" w-full max-w-7xl px-4 mx-auto flex flex-col items-center py-12 ">
      <h3 className=" text-lg text-emerald-600 italic mb-1 font-medium text-center">
        Our Blogs
      </h3>
      <h2 className=" font-playfair text-3xl font-bold mb-5">
        Travel Tips and Advice
      </h2>
      <p className=" text-gray-500 max-w-lg mb-8 text-center">
        Quick, practical tips and insights to help you make the most of your
        corporate trips — smarter travel, better experiences.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BlogCard
          image="/blog-bg.jpg"
          date="07 Jan"
          heading="Top 10 Hidden Gems Around the World You Need to Visit"
          description="Discover a world beyond the popular tourist spots with our guide to the top 10 hidden gems that promise unique experiences."
          blogLink="/blog/hidden-gems"
        />
        <BlogCard
          image="/blog-bg.jpg"
          date="07 Jan"
          heading="Top 10 Hidden Gems Around the World You Need to Visit"
          description="Discover a world beyond the popular tourist spots with our guide to the top 10 hidden gems that promise unique experiences."
          blogLink="/blog/hidden-gems"
        />
      </div>
    </div>
  );
}
