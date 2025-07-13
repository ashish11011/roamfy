import BlogCard from "@/conponents/blogCard";

export function BlogSection() {
  return (
    <div className=" w-full max-w-7xl px-4 mx-auto flex flex-col items-center py-12 ">
      <h3 className=" text-lg text-emerald-600 italic mb-1 font-medium text-center">
        Our Blogs
      </h3>
      <h2 className=" text-3xl font-bold mb-5">Travel Tips and Advice</h2>
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
