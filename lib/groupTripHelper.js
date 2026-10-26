"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { groupTripTable } from "../db/schema";
import { normalizeTripPricing } from "../src/helper/groupTourPricing";
import { requireAdmin } from "./adminAuth";
import { db } from "./db";
import { resolveSlug } from "./slug";

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

async function groupTripSlug(title, slug, current) {
  return resolveSlug({
    title, slug, currentSlug: current?.slug,
    isTaken: async (candidate) => {
      const matches = await db.select({ id: groupTripTable.id }).from(groupTripTable)
        .where(eq(groupTripTable.slug, candidate));
      return matches.some((trip) => trip.id !== current?.id);
    },
  });
}

export async function insertGroupTrip(details) {
  await requireAdmin();
  const values = groupTripValues(details);
  const slug = await groupTripSlug(values.title, details.slug);
  const data = await db.insert(groupTripTable).values({ ...values, slug }).returning();
  revalidateGroupTrips();
  return data;
}

export async function editGroupTrip({ id, ...details }) {
  await requireAdmin();
  const values = groupTripValues(details);
  const [current] = await db.select({ id: groupTripTable.id, slug: groupTripTable.slug })
    .from(groupTripTable).where(eq(groupTripTable.id, id));
  if (!current) throw new Error("Group trip not found.");
  const slug = await groupTripSlug(values.title, details.slug, current);
  const data = await db.update(groupTripTable).set({ ...values, slug })
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
