import dayjs from "dayjs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BlogCard({
  image,
  date,
  heading,
  description,
  blogLink,
}) {
  const parsedDate = dayjs(
    typeof date === "string" ? date.replace(/[\'"]/g, "") : date,
  );
  return (
    <article className="journal-card">
      <Link
        href={blogLink}
        className="journal-image"
        aria-label={`Read ${heading}`}
      >
        <img src={image || "/blog-bg.jpg"} alt={heading} loading="lazy" />
      </Link>
      {date && parsedDate.isValid() && (
        <time dateTime={parsedDate.format("YYYY-MM-DD")}>
          {parsedDate.format("D MMMM YYYY")}
        </time>
      )}
      <h3>
        <Link href={blogLink}>{heading}</Link>
      </h3>
      <p className="line-clamp-3">{description}</p>
      <Link href={blogLink} className="site-text-link mt-auto">
        Read the story <ArrowUpRight size={18} />
      </Link>
    </article>
  );
}
