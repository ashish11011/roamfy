"use server";
import { eq } from "drizzle-orm";
import {
  blogForm,
  blogTable,
  contactTable,
  reviewsTable,
  subscriptionTable,
  tripTable,
} from "../db/schema";
import { db } from "./db";
import { revalidatePath } from "next/cache";

export async function getAdminBlogData() {
  return await db.select().from(blogTable);
}
export async function getBlogFormData() {
  return await db.select().from(blogForm);
}
export async function getBlogBySlug(slug) {
  return await db.select().from(blogTable).where(eq(blogTable.slug, slug));
}

function createSlug(title) {
  return title
    .toLowerCase() // Convert title to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove any characters that aren't letters, numbers, spaces, or hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
}

export async function insertBlog({
  title = "",
  metaDescription = "",
  blogCategory = "",
  image = "",
  tags = [],
  date = "",
  data = "",
  userImage = "",
  userName = "",
  isVisible = true,
}) {
  var slug = createSlug(title);
  const isSlugExist = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.slug, slug));
  if (isSlugExist.length > 0) {
    slug = `${slug}-${isSlugExist.length + 1}`;
  }
  const response = await db
    .insert(blogTable)
    .values({
      title,
      metaDescription,
      blogCategory,
      image,
      tags,
      date: JSON.stringify(date),
      data,
      userImage,
      userName,
      isVisible,
      slug,
    })
    .returning();
  revalidatePath("/admin");
  revalidatePath("/blog");

  return response;
}

export async function updateBlogByID({
  title = "",
  metaDescription = "",
  blogCategory = "",
  image = "",
  tags = [],
  date = "",
  data = "",
  userImage = "",
  userName = "",
  slug = "",
  isVisible = true,
}) {
  console.log("blogcategofy: ", blogCategory);
  const response = await db
    .update(blogTable)
    .set({
      title,
      metaDescription,
      blogCategory,
      image,
      tags,
      date: JSON.stringify(date),
      data,
      userImage,
      userName,
      isVisible,
      slug,
    })
    .where(eq(blogTable.slug, slug))
    .returning();

  revalidatePath("/admin");
  revalidatePath(`/blog/${slug}`);

  return response;
}
