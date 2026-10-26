"use server";
import { eq } from "drizzle-orm";
import {
  contactTable,
  reviewsTable,
  subscriptionTable,
  tripTable,
} from "../db/schema";
import { db } from "./db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./adminAuth";
import { resolveSlug } from "./slug";

async function tripSlug(title, slug, current) {
  return resolveSlug({
    title, slug, currentSlug: current?.slug,
    isTaken: async (candidate) => {
      const matches = await db.select({ id: tripTable.id }).from(tripTable)
        .where(eq(tripTable.slug, candidate));
      return matches.some((trip) => trip.id !== current?.id);
    },
  });
}

export async function insertTrip({
  title = "",
  price = "",
  description = "",
  tripInformation = "",
  images = [],
  bannerImage = "",
  itinary = [],
  itinaryURL="",
  isVisible = true,
  isDomestic = true,
  hotels = [],
  slug: requestedSlug,
}) {
  await requireAdmin();
  const slug = await tripSlug(title, requestedSlug);
  const data = await db
    .insert(tripTable)
    .values({
      title,
      price,
      description,
      tripInformation,
      images,
      bannerImage,
      itinary,
      itinaryURL,
      slug,
      isVisible,
      isDomestic,
      hotels,
    })
    .returning();

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return data;
}
export async function editTrip({
  title = "",
  description = "",
  price = "",
  tripInformation = "",
  images = [],
  bannerImage = "",
  itinary = [],
  isVisible = true,
  isDomestic = true,
  itinaryURL = "",
  hotels = [],
  slug,
  id,
}) {
  await requireAdmin();
  const [current] = await db.select({ id: tripTable.id, slug: tripTable.slug })
    .from(tripTable).where(eq(tripTable.id, id));
  if (!current) throw new Error("Trip not found.");
  const nextSlug = await tripSlug(title, slug, current);
  const data = await db
    .update(tripTable)
    .set({
      title,
      description,
      price,
      tripInformation,
      images,
      bannerImage,
      itinary,
      slug: nextSlug,
      itinaryURL,
      isVisible,
      isDomestic,
      hotels,
    })
    .where(eq(tripTable.id, id))
    .returning();

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/trip/[slug]", "page");
  revalidatePath("/sitemap.xml");

  return data;
}

export async function getAllTrips() {
  return await db
    .select({
      id: tripTable.id,
      title: tripTable.title,
      bannerImage: tripTable.bannerImage,
      isVisible: tripTable.isVisible,
      slug: tripTable.slug,
    })
    .from(tripTable);
}

export async function toggleTripVisiblity({ id, isVisible }) {
  await db.update(tripTable).set({ isVisible }).where(eq(tripTable.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
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
  try {
    await db.insert(contactTable).values({
      name,
      email,
      location: address,
      phone: mobile,
      message,
      slug,
    });

    revalidatePath("/contact-us");
    revalidatePath("/admin/contact-us");
    return true;
  } catch (error) {
    return false;
  }
}

export async function addReview({ name, email, rating, message }) {
  await db.insert(reviewsTable).values({
    name,
    email,
    rating,
    message,
  });

  revalidatePath("/add-review");
  revalidatePath("/admin/reviews");

  return true;
}

export async function getReviews() {
  return await db.select().from(reviewsTable);
}

export async function insertSubscription(email) {
  await db.insert(subscriptionTable).values({ email });
  return true;
}

export async function handleDeleteTripById(tirpId) {
  await db.delete(tripTable).where(eq(tripTable.id, tirpId)).returning();
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  return;
}
