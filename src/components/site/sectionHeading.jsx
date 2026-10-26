import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="site-eyebrow">{eyebrow}</span>}
        <h2 className="site-title">{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <Link href={href} className="site-text-link">
          {linkLabel}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
