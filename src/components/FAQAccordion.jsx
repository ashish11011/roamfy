import { Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FAQsData } from "@/const";

export function FAQsAccordion() {
  return (
    <section className="site-section bg-cream">
      <div className="site-container faq-grid">
        <div>
          <span className="site-eyebrow">Good questions. Simple answers.</span>
          <h2 className="site-title">A few things you might be wondering.</h2>
          <p className="text-sub mt-5 mb-6">
            The little details matter. Here’s a helping hand before you head
            out.
          </p>
          <Link href="/contact-us" className="site-text-link">
            Ask us anything <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="faq-list">
          {FAQsData.map((item, index) => (
            <details key={index}>
              <summary>
                {item.question}
                <Plus size={18} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
