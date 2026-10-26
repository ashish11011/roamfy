import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/site/sectionHeading";

export function Testimonial({ reviewData = [] }) {
  if (!reviewData.length) return null;
  return (
    <section className="site-container site-section">
      <SectionHeading
        eyebrow="Stories from the road"
        title="The best part? The memories."
        description="A few words from the people who’ve been there with us."
        href="/add-review"
        linkLabel="Share your story"
      />
      <div className="review-grid">
        {reviewData.map((item, index) => (
          <figure className="review-card" key={item.id || index}>
            <div className="flex justify-between gap-4 items-center">
              <div
                className="flex gap-1 text-primary"
                aria-label={`${Math.max(0, Math.min(5, Number(item.rating) || 0))} out of 5 stars`}
              >
                {Array.from(
                  {
                    length: Math.max(0, Math.min(5, Number(item.rating) || 0)),
                  },
                  (_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ),
                )}
              </div>
              <Quote size={24} className="text-primary opacity-40" />
            </div>
            <blockquote>{item.message}</blockquote>
            <figcaption className="review-person">
              <span className="review-avatar">
                {item.name?.charAt(0)?.toUpperCase()}
              </span>
              <span>{item.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
