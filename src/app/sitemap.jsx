import { db } from "../../lib/db";
import { blogTable } from "../../db/schema";

const paths = ["", "/about-us", "/contact-us", "/blog"];

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const pathEntries = paths.map((path) => ({
    url: `${baseUrl}${path}/`,
    lastModified: new Date().toISOString(),
  }));

  const blogData = await db
    .select({
      slug: blogTable.slug,
    })
    .from(blogTable);

  const blogEntries = blogData.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}/`,
    lastModified: new Date().toISOString(),
  }));

  return [...pathEntries, ...blogEntries];
}
