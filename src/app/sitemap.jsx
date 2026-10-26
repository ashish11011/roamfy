import { db } from "../../lib/db";
import { blogTable, groupTripTable, tripTable } from "../../db/schema";
import { eq } from "drizzle-orm";

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

  const tripData = await db
    .select({ slug: tripTable.slug })
    .from(tripTable)
    .where(eq(tripTable.isVisible, true));

  const tripEntries = tripData
    .filter((trip) => trip.slug)
    .map((trip) => ({
      url: `${baseUrl}/trip/${encodeURIComponent(trip.slug)}`,
      lastModified: new Date().toISOString(),
    }));

  const groupTripData = await db
    .select({ slug: groupTripTable.slug })
    .from(groupTripTable)
    .where(eq(groupTripTable.isVisible, true));

  const groupTripEntries = groupTripData
    .filter(trip => trip.slug)
    .map(trip => ({
      url: `${baseUrl}/group-trip/${encodeURIComponent(trip.slug)}`,
      lastModified: new Date().toISOString(),
    }));

  return [...pathEntries, ...blogEntries, ...tripEntries, ...groupTripEntries];
}
