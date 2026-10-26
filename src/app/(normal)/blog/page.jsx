import BlogCard from "@/conponents/blogCard";
import HeroBG from "@/conponents/tripHero";
import { SectionHeading } from "@/components/site/sectionHeading";
import { getAdminBlogData } from "lib";

export const metadata = {
  title: "Blogs - Roamify Planners",
  description:
    "Discover expert travel tips, destination guides, and curated experiences with Roamify Planners to make every journey unforgettable.",
  alternates: {
    canonical: "https://www.roamifyplanners.in/blog/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Blogs - Roamify Planners",
    description:
      "Discover expert travel tips, destination guides, and curated experiences with Roamify Planners to make every journey unforgettable.",
    url: "https://www.roamifyplanners.in/blog/",
    siteName: "Roamify Planners",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = await getAdminBlogData();
  return (
    <>
      <HeroBG
        text="Stories for your next chapter."
        eyebrow="The Roamify journal"
        img="/blog-bg.jpg"
      />
      <section className="site-container site-section">
        <SectionHeading
          eyebrow="A little inspiration"
          title="Read. Dream. Go."
          description="Destination guides, stories from the road, and the little things that make a journey better."
        />
        <div className="blog-grid">
          {blogs.map((item) => (
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
        {!blogs.length && (
          <p className="empty-packages text-sub">
            New stories are on their way. Check back soon.
          </p>
        )}
      </section>
    </>
  );
}
