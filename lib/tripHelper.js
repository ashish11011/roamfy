"use server";
import { eq } from "drizzle-orm";
import {
  contactTable,
  reviewsTable,
  subscriptionTable,
  tripTable,
} from "../db/schema";
import { db } from "./db";

async function generateSlug(title) {
  console.log("title is : ", title);
  let slug = title.toLowerCase().replace(/\s+/g, "-");
  const count = await db.select({ count: tripTable.slug }).from(tripTable);
  if (count.length > 0) {
    slug = `${slug}-${count.length + 1}`;
  }
  return slug;
}

export async function insertTrip({
  title = "",
  description = "",
  tripInformation = "",
  images = [],
  bannerImage = "",
  itinary = [],
  isVisible = true,
  isDomestic = true,
  hotels = [],
}) {
  let slug = await generateSlug(title);
  return await db
    .insert(tripTable)
    .values({
      title,
      description,
      tripInformation,
      images,
      bannerImage,
      itinary,
      slug,
      isVisible,
      isDomestic,
      hotels,
    })
    .returning();
}
export async function editTrip({
  title = "",
  description = "",
  tripInformation = "",
  images = [],
  bannerImage = "",
  itinary = [],
  isVisible = true,
  isDomestic = true,
  hotels = [],
  slug,
  id,
}) {
  return await db
    .update(tripTable)
    .set({
      title,
      description,
      tripInformation,
      images,
      bannerImage,
      itinary,
      slug,
      isVisible,
      isDomestic,
      hotels,
      slug,
    })
    .where(eq(tripTable.id, id))
    .returning();
}

export async function getAllTrips() {
  return await db.select().from(tripTable);
}

export async function toggleTripVisiblity({ id, isVisible }) {
  console.log("Toggle trip details: ", id, isVisible);
  await db.update(tripTable).set({ isVisible }).where(eq(tripTable.id, id));
}

export async function getTripById(id) {
  return await db.select().from(tripTable).where(eq(tripTable.id, id));
}

export async function getAllVisibleTrips() {
  return await db.select({ isVisible: true }).from(tripTable);
}

export async function toggleVisiblity(id) {
  // Step 1: Get the current value
  const trip = await db
    .select({ isVisible: tripTable.isVisible })
    .from(tripTable)
    .where(eq(tripTable.id, id))
    .limit(1);

  const current = trip?.[0]?.isVisible ?? false;

  // Step 2: Toggle and update
  await db
    .update(tripTable)
    .set({ isVisible: !current })
    .where(eq(tripTable.id, id));
}

export async function getTripBySlug(slug) {
  return await db.select().from(tripTable).where(eq(tripTable.slug, slug));
}

export async function toggleReviewVisiblity({ id, isAdminApproved }) {
  await db
    .update(reviewsTable)
    .set({ isAdminApproved })
    .where(eq(reviewsTable.id, id));
}

export async function insertContactDetail({
  name,
  email,
  address,
  mobile,
  message,
  slug,
}) {
  await db.insert(contactTable).values({
    name,
    email,
    location: address,
    phone: mobile,
    message,
    slug,
  });
  return true;
}

export async function addReview({ name, email, rating, message }) {
  await db.insert(reviewsTable).values({
    name,
    email,
    rating,
    message,
  });
  return true;
}

export async function getReviews() {
  return await db.select().from(reviewsTable);
}

export async function insertSubscription(email) {
  await db.insert(subscriptionTable).values({ email });
  return true;
}
