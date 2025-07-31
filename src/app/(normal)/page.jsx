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
import Image from "next/image";

export const metadata = {
  title: {
    absolute: "Roamify Planners",
  },
  description:
    "Plan unforgettable trips with Roamify Planners - from corporate tours to honeymoons. Hassle-free bookings, curated experiences, and 24/7 travel support.",
  alternates: {
    canonical: "https://www.roamifyplanners.in/",
  },
  keywords: [
    "Roamify Planners",
    "Roamify",
    "travel planner",
    "travel",
    "trips",
    "bali trip",
    "honeymoon trip",
    "corporate trip",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Roamify Planners",
    description:
      "One of the top providers of AI development services, AV Technosys, enhances business operations by automating processes, boosting productivity, and more",
    url: "https://www.roamifyplanners.in/",
    siteName: "Roamify Planners",
    type: "website",
  },
};

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
      <BlogSection blogData={homePageBlog} />
      <SubscribeNewsletter />
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
      <div className=" max-w-7xl px-4 mx-auto w-full">
        <div className=" justify-around flex-col-reverse gap-6 md:flex-row items-center flex w-full h-full">
          <div className=" max-w-lg flex flex-col gap-6 w-full">
            <h1 className="  text-center leading-12 xl:leading-16 md:text-left font-playfair text-dark text-5xl xl:text-6xl font-bold md:font-semibold">
              Find your Perfect{" "}
            </h1>
            <span className=" text-center md:text-left text-6xl md:text-7xl xl:text-8xl text-red-500 font-extrabold">
              Adventure
            </span>

            <p className="text-center mb-6 text-lg md:text-xl md:text-left text-gray-500 ">
              Corporate trips, school tours, honeymoons - we plan every journey
              with ease and precision.
            </p>

            <button className="  mx-auto text-lg md:m-0 w-full bg-primary text-white font-semibold hover:scale-105 cursor-pointer duration-200 shadow py-3 px-6  rounded-full sm:w-fit">
              View Packages
            </button>
          </div>

          <Image
            src="https://ik.imagekit.io/roamfy/heromobile.png"
            alt=""
            width={500}
            height={800}
            className=" max-h-[16rem] block sm:hidden md:max-h-[42rem] object-cover w-full md:object-contain  h-full"
          />
          <Image
            src="https://ik.imagekit.io/roamfy/herosection.png"
            alt=""
            width={500}
            height={800}
            className=" max-h-[16rem] hidden sm:block md:max-h-[42rem] object-cover w-full md:object-contain  h-full"
          />
        </div>
      </div>
    </div>
  );
}

function TravelWithUs() {
  const data = [
    {
      icon: "./plane.svg",
      title: "Multiple Prime Destinations",
      desc: "From Goa to Manali, Bali to Dubai - explore World's top travel spots with us.",
    },
    {
      icon: "./clock-1.svg",
      title: "End-to-End Service",
      desc: "We handle everything—transport, meals, stays, activities—so you don't spend a penny during the trip.",
    },
    {
      icon: "./tree.svg",
      title: "Unforgettable Experiences",
      desc: "DJ nights, bonfires, gala dinners—customized to make every journey memorable and stress-free.",
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
      title: "Tell us about your trip",
      description:
        "Whether it’s a corporate event, school excursion, college tour, or a honeymoon, share your travel goals with us — we’ll tailor the perfect experience.",
    },
    {
      title: "We’ll handle all the planning",
      description:
        "From transport and hotel bookings to meals, sightseeing, and activities — our dedicated travel manager ensures a smooth, worry-free journey.",
    },
    {
      title: "Just show up & enjoy",
      description:
        "Dance at DJ nights, sit around a bonfire, or chill by the pool — we’ll take care of everything else to make your trip unforgettable.",
    },
  ];

  return (
    <div className="bg-emerald-50 w-full px-4">
      <div className="mx-auto max-w-7xl py-20">
        <h3 className="text-lg text-emerald-600 italic mb-3 font-medium text-center">
          Three steps for a perfect trip
        </h3>
        <h2 className="text-center text-5xl font-medium font-playfair">
          Find Travel Perfection
        </h2>
        <p className="text-center mx-auto max-w-3xl mt-4 text-gray-400">
          Planning a trip doesn’t have to be stressful. With Roamify Planners,
          it’s as simple as telling us what you want — and showing up!
        </p>

        <div className="w-full mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:px-6">
          <TravelPerfectionCard
            title={contentSections[0].title}
            description={contentSections[0].description}
          >
            <div
              className="w-24 md:w-32 mx-auto h-24 md:h-32 bg-red-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={"/feature-1.svg"}
                className="size-12 md:size-16 object-contain"
                alt="Trip Type Icon"
              />
            </div>
          </TravelPerfectionCard>

          <TravelPerfectionCard
            title={contentSections[1].title}
            description={contentSections[1].description}
          >
            <div
              className="w-24 md:w-32 mx-auto h-24 md:h-32 bg-blue-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={"/feature-2.svg"}
                className="size-12 md:size-16 object-contain"
                alt="Planning Icon"
              />
            </div>
          </TravelPerfectionCard>

          <TravelPerfectionCard
            title={contentSections[2].title}
            description={contentSections[2].description}
          >
            <div
              className="h-24 w-24 md:w-32 mx-auto md:h-32 bg-emerald-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={"/feature-3.svg"}
                className="size-16 md:size-20 object-contain"
                alt="Enjoy Icon"
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
        {homePageBlog.map((item) => {
          return (
            <BlogCard
              key={item.id}
              image={item.image}
              date={item.date}
              heading={item.title}
              description={item.metaDescription}
              blogLink={`/blog/${item.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
}

const homePageBlog = [
  {
    id: "d7ac304f-0091-4aa4-8697-4e2ec235bf48",
    title: "🌞 Jaisalmer Travel Blog: My Golden City Adventure",
    metaDescription:
      "Discover the golden charm of Jaisalmer through a personal travel story filled with forts that breathe history, soulful desert nights, vibrant festivals, and authentic Rajasthani flavors. Whether you're planning a romantic escape or a cultural getaway, this guide brings you the real essence of the “Golden City.”",
    blogCategory: "budget-friendly-group-trips",
    image:
      "https://s3.ap-south-1.amazonaws.com/codeframe-ashish-harshit/rishab/v1/roamfy/16cb61ff-274c-4858-b59f-ae733dafc22b.jpg",
    tags: [
      "JaisalmerDiaries",
      "DesertSafariExperience",
      "HiddenGemsOfRajasthan",
    ],
    date: '"2025-07-26T18:38:50.492Z"',
    userImage:
      "https://codeframe-ashish-harshit.s3.ap-south-1.amazonaws.com/rishab/v1/roamfy/ashish.jpeg",
    userName: "Ashish Bishnoi",
    slug: "-jaisalmer-travel-blog-my-golden-city-adventure",
    isVisible: true,
  },
  {
    id: "696d16d3-299b-4587-b13a-8241a6c19f4d",
    title:
      "✈️ Essential Things to Keep in Mind (and Carry) for Your International Trip",
    metaDescription:
      "Planning your first international trip—or your tenth? This ultimate guide shares must-know tips and packing essentials to ensure your journey goes off without a hitch. From passport and visa checks to the often-forgotten travel adapter, we've covered everything. Whether it's your health, money, or comfort, this list will help you travel smarter and stress-free. Powered by Roamify Planners' real-world experience, this is more than just a checklist—it’s your travel companion.",
    blogCategory: "productivity-on-the-go",
    image:
      "https://s3.ap-south-1.amazonaws.com/codeframe-ashish-harshit/rishab/v1/roamfy/7ab9149b-42a6-4b36-b467-c805997c8163.jpg",
    tags: [
      "InternationalTravelTips",
      "TravelPackingChecklist",
      "RoamifyRecommends",
    ],
    date: '"2025-07-26T18:55:07.091Z"',
    userImage:
      "https://av-blog.s3.ap-south-1.amazonaws.com/uploads/veer-gu.jpeg",
    userName: "Rishab Batra",
    slug: "-essential-things-to-keep-in-mind-and-carry-for-your-international-trip",
    isVisible: true,
  },
];
