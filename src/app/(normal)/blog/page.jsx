import BlogCard from "@/conponents/blogCard";
import HeroBG from "@/conponents/tripHero";
import dayjs from "dayjs";
// import { getBlogData } from "lib";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async () => {
  // const blogsData = await getBlogData();
  return (
    <div>
      <HeroBG text="Blog" img={"./blog-bg.jpg"} />
      <div className=" flex flex-col justify-center items-center px-4  py-12">
        <h1 className=" text-2xl text-center md:text-4xl font-medium   mb-6">
          Explore the World: Travel Tips, Stories, and Adventures
        </h1>
        <p className="md:text-lg  text-gray-600 max-w-2xl text-center mb-8">
          Discover exciting travel destinations, expert tips, and unforgettable
          experiences. Our blog takes you on a journey around the globe,
          offering valuable insights on everything from hidden gems to must-see
          landmarks.
        </p>
      </div>
      {/* <Blogs blogsData={blogsData} /> */}
    </div>
  );
};

export default Page;

function Blogs({ blogsData }) {
  return (
    <div className=" w-full max-w-7xl px-4 mx-auto pb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogsData.map((item) => {
        return (
          <BlogCard
            key={item.id}
            image={item.image}
            date={formatToDateOnly(item.date)}
            heading={item.title}
            description={item.metaDescription}
            blogLink={`/blog/${item.slug}`}
          />
        );
      })}
    </div>
  );
}

function formatToDateOnly(isoString) {
  const date = dayjs(JSON.parse(isoString));
  return date.isValid() ? date.format("DD-MM-YYYY") : "Invalid Date";
}
