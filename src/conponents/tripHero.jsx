import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroBG({
  text,
  img,
  eyebrow = "The Roamify way",
  description,
}) {
  return (
    <section className="page-hero">
      <img
        src={img ? img.replace(/^\.\//, "/") : "/trip-hero-bg.jpg"}
        alt=""
        className="page-hero-image"
        fetchPriority="high"
      />
      <div className="page-hero-overlay" />
      <div className="site-container">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link>
          <ArrowRight size={12} />
          <span aria-current="page">{text}</span>
        </nav>
        <span className="block text-xs uppercase tracking-[.16em] text-white/70 mt-8">
          {eyebrow}
        </span>
        <h1>{text}</h1>
        {description && (
          <p className="mt-5 text-white/80 max-w-xl">{description}</p>
        )}
      </div>
    </section>
  );
}
