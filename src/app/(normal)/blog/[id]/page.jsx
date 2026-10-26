export const dynamic = "force-static";

import dayjs from "dayjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QueryForm } from "./queryForm";
import { TableOfContents } from "./tableOfContext";
import { getBlogBySlug } from "lib";
import { blogCategories } from "@/const";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
  const slug = (await params).id;
  const [post] = await getBlogBySlug(slug);

  return {
    title: {
      absolute: post?.title || "Roamify Planners",
    },
    description: post?.metaDescription,
    keywords: post?.tags,
    publisher: post?.userName,
    alternates: {
      canonical: `https://www.roamifyplanners.in/blog/${slug}/`,
    },
    openGraph: {
      title: post?.title,
      description: post?.metaDescription,
      url: `https://www.roamifyplanners.in/blog/${slug}/`,
      siteName: "Roamify Planners",
      type: "website",
      locale: "en_IN",
    },
  };
}

export default async function BlogArticle({ params }) {
  const slug = (await params).id;
  const [blog] = await getBlogBySlug(slug);
  if (!blog) notFound();
  const category = blogCategories.find(
    (item) => item.value === blog.blogCategory,
  )?.label;
  const date = dayjs(
    typeof blog.date === "string" ? blog.date.replace(/[\'"]/g, "") : blog.date,
  );
  return (
    <div className="site-container article-layout">
      <article className="article-body">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-sub mb-8"
        >
          <Link href="/">Home</Link>
          <ArrowRight size={12} />
          <Link href="/blog">Travel journal</Link>
        </nav>
        <span className="site-eyebrow">
          {category || "The Roamify journal"}
        </span>
        <h1>{blog.title}</h1>
        <p className="text-lg text-sub mt-6">{blog.metaDescription}</p>
        <div className="flex flex-wrap gap-3 items-center text-sm text-sub mt-6">
          <span>{blog.userName || "Roamify Planners"}</span>
          {date.isValid() && (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={date.format("YYYY-MM-DD")}>
                {date.format("D MMMM YYYY")}
              </time>
            </>
          )}
        </div>
        <img
          src={blog.image || "/blog-bg.jpg"}
          alt={blog.title}
          className="article-cover"
        />
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: blog.data }}
        />
      </article>
      <aside className="article-sidebar">
        <TableOfContents slug={slug} />
        <div className="mt-6">
          <QueryForm slug={slug} />
        </div>
      </aside>
    </div>
  );
}
