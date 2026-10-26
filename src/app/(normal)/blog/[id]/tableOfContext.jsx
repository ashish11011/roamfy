"use client";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export function TableOfContents({ slug }) {
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(
        ".article-body .tiptap h1, .article-body .tiptap h2, .article-body .tiptap h3",
      ),
    );
    setHeadings(
      elements.map((element, index) => {
        element.id = element.id || `article-section-${index + 1}`;
        return { id: element.id, text: element.textContent };
      }),
    );
  }, [slug]);
  const url = encodeURIComponent(`https://www.roamifyplanners.in/blog/${slug}`);
  const socials = [
    {
      name: "LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      name: "Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "Twitter",
      Icon: Twitter,
      href: `https://x.com/intent/post?url=${url}`,
    },
  ];
  return (
    <div className="site-panel">
      {headings.length > 0 && (
        <details>
          <summary className="font-medium text-base">In this story</summary>
          <nav
            aria-label="Article contents"
            className="flex flex-col gap-3 mt-4"
          >
            {headings.map((heading) => (
              <a
                className="text-sm text-sub hover:text-primary"
                key={heading.id}
                href={`#${heading.id}`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </details>
      )}
      <p className={`text-xs text-sub ${headings.length ? "mt-6" : ""}`}>
        A story worth sharing
      </p>
      <div className="flex gap-3 mt-3">
        {socials.map(({ name, Icon, href }) => (
          <a
            href={href}
            key={name}
            aria-label={`Share on ${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="round-arrow"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}
