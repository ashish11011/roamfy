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
import { requireAdmin } from "./adminAuth";
import { resolveSlug } from "./slug";

export async function getAdminBlogData() {
  return await db.select().from(blogTable);
}
export async function getBlogFormData() {
  return await db.select().from(blogForm);
}
export async function getBlogBySlug(slug) {
  return await db.select().from(blogTable).where(eq(blogTable.slug, slug));
}

async function blogSlug(title, slug, current) {
  return resolveSlug({
    title, slug, currentSlug: current?.slug,
    isTaken: async (candidate) => {
      const matches = await db.select({ id: blogTable.id }).from(blogTable)
        .where(eq(blogTable.slug, candidate));
      return matches.some((blog) => blog.id !== current?.id);
    },
  });
}

function revalidateBlogs(slug, previousSlug) {
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  for (const value of new Set([slug, previousSlug].filter(Boolean))) {
    revalidatePath(`/blog/${value}`);
    revalidatePath(`/admin/blogs/${value}`);
  }
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
  slug: requestedSlug,
}) {
  await requireAdmin();
  const slug = await blogSlug(title, requestedSlug);
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
  revalidateBlogs(slug);

  return response;
}

export async function updateBlogByID({
  id,
  originalSlug,
  title = "",
  metaDescription = "",
  blogCategory = "",
  image = "",
  tags = [],
  date = "",
  data = "",
  userImage = "",
  userName = "",
  slug,
  isVisible = true,
}) {
  await requireAdmin();
  if (!id && !originalSlug && !slug) throw new Error("Blog not found.");
  const [current] = await db.select({ id: blogTable.id, slug: blogTable.slug })
    .from(blogTable).where(id
      ? eq(blogTable.id, id)
      : eq(blogTable.slug, originalSlug || slug));
  if (!current) throw new Error("Blog not found.");
  const nextSlug = await blogSlug(title, slug, current);
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
      slug: nextSlug,
    })
    .where(eq(blogTable.id, current.id))
    .returning();

  revalidateBlogs(nextSlug, current.slug);

  return response;
}

export async function submitBlogForm({
  name = "",
  email = "",
  message = "",
  number = "",
  slug = "",
}) {
  await db
    .insert(blogForm)
    .values({
      name,
      email,
      message,
      number,
      refrenceBlogLink: slug,
    })
    .returning();
  return;
}
