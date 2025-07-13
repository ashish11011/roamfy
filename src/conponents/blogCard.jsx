import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const BlogCard = ({ image, date, heading, description, blogLink }) => {
  return (
    <div className="bg-[#e8f3ee] h-full rounded-2xl p-4 sm:p-6 w-full space-y-6  shadow-md">
      <div className="relative sm:w-auto w-full h-auto sm:h-60 rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={heading}
          className=" w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-3 py-1 rounded-full shadow">
          {date}
        </div>
      </div>
      <Link href={blogLink} className="text-3xl font-medium">
        {heading}
      </Link>
      <p className="text-lg text-gray-600 mt-3 mb-4">{description}</p>
      <Link
        href={blogLink}
        className="inline-flex gap-3 group items-center bg-green-950   transition-all hover:bg-green-900 duration-200 text-white text-lg font-medium px-6 py-3 rounded-full"
      >
        Read More
        <ArrowRightIcon
          color="white"
          className=" group-hover:-rotate-45 duration-200"
        />
      </Link>
    </div>
  );
};

export default BlogCard;
