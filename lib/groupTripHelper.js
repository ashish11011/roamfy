"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { groupTripTable } from "../db/schema";
import { normalizeTripPricing } from "../src/helper/groupTourPricing";
import { requireAdmin } from "./adminAuth";
import { db } from "./db";

function groupTripValues({
  title = "", description = "", tripInformation = "", images = [],
  bannerImage = "", itinary = [], itinaryURL = "", isVisible = true,
  isDomestic = true, hotels = [], sharingPrices = {},
}) {
  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Enter a group trip title.");
  }
  const pricing = normalizeTripPricing({ isGroupTour: true, sharingPrices });
  return {
    title: title.trim(), description, tripInformation, images, bannerImage,
    itinary, itinaryURL, isVisible, isDomestic, hotels,
    sharingPrices: pricing.sharingPrices,
  };
}

function revalidateGroupTrips() {
  revalidatePath("/admin/group-trips");
  revalidatePath("/");
  revalidatePath("/group-trip/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

async function generateSlug(title) {
  const base = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
  if (!base) throw new Error("Use letters or numbers in the group trip title.");
  let slug = base;
  let suffix = 2;
  while ((await db.select({ id: groupTripTable.id }).from(groupTripTable)
    .where(eq(groupTripTable.slug, slug)).limit(1)).length) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

export async function insertGroupTrip(details) {
  await requireAdmin();
  const values = groupTripValues(details);
  const slug = await generateSlug(values.title);
  const data = await db.insert(groupTripTable).values({ ...values, slug }).returning();
  revalidateGroupTrips();
  return data;
}

export async function editGroupTrip({ id, ...details }) {
  await requireAdmin();
  const values = groupTripValues(details);
  // Slugs remain stable when the title changes.
  const data = await db.update(groupTripTable).set(values)
    .where(eq(groupTripTable.id, id)).returning();
  revalidateGroupTrips();
  return data;
}

export async function getAllGroupTrips() {
  await requireAdmin();
  return db.select().from(groupTripTable);
}

export async function getGroupTripById(id) {
  await requireAdmin();
  return db.select().from(groupTripTable).where(eq(groupTripTable.id, id));
}

export async function getGroupTripBySlug(slug) {
  return db.select().from(groupTripTable).where(and(
    eq(groupTripTable.slug, slug), eq(groupTripTable.isVisible, true),
  ));
}

export async function toggleGroupTripVisibility({ id, isVisible }) {
  await requireAdmin();
  await db.update(groupTripTable).set({ isVisible }).where(eq(groupTripTable.id, id));
  revalidateGroupTrips();
}

export async function deleteGroupTrip(id) {
  await requireAdmin();
  await db.delete(groupTripTable).where(eq(groupTripTable.id, id));
  revalidateGroupTrips();
}
