export const dynamic = "force-static";
import { Testimonial } from "@/components/testrimonial";
import { FAQsAccordion } from "@/components/FAQAccordion";
import BlogCard from "@/conponents/blogCard";
import {
  HomeHero,
  PlanningSteps,
  TravelBenefits,
} from "@/components/site/homeSections";
import { SectionHeading } from "@/components/site/sectionHeading";
import { db } from "lib/db";
import { groupTripTable, reviewsTable, tripTable } from "db/schema";
import { GroupTourPackages, Packages } from "./packages";
import SubscribeNewsletter from "./subscribeNexsLetter";
import { eq } from "drizzle-orm";

export const revalidate = 2592000;

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
      "Explore custom trips, group adventures, corporate retreats, and honeymoon escapes with Roamify Planners.",
    url: "https://www.roamifyplanners.in/",
    siteName: "Roamify Planners",
    type: "website",
  },
};

export default async function Home() {
  const [packageData, reviewData, groupTripData] = await Promise.all([
    db.select().from(tripTable).where(eq(tripTable.isVisible, true)),
    db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.isAdminApproved, true)),
    db.select().from(groupTripTable).where(eq(groupTripTable.isVisible, true)),
  ]);
  return (
    <>
      <HomeHero />
      <TravelBenefits />
      <Packages data={packageData} />
      <GroupTourPackages data={groupTripData} />
      <PlanningSteps />
      <Testimonial reviewData={reviewData} />
      <FAQsAccordion />
      <section className="site-container site-section">
        <SectionHeading
          eyebrow="The Roamify journal"
          title="A little inspiration for the road."
          description="Travel stories, thoughtful tips, and ideas for your next adventure."
          href="/blog"
          linkLabel="Read the journal"
        />
        <div className="blog-grid">
          {homePageBlog.map((item) => (
            <BlogCard
              key={item.id}
              image={item.image}
              date={item.date}
              heading={item.title}
              description={item.metaDescription}
              blogLink={`/blog/${item.slug}`}
            />
          ))}
        </div>
      </section>
      <SubscribeNewsletter />
    </>
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
