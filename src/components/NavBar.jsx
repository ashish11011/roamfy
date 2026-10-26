"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";

const links = [
  { label: "Explore Trips", href: "/#package" },
  { label: "Group Tours", href: "/#group-tour-packages" },
  { label: "Travel Journal", href: "/blog" },
  { label: "Our Story", href: "/about-us" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="site-utility">
        <div className="site-container flex items-center justify-between gap-4">
          <span className="utility-message">
            Good places. Great company. Your next adventure starts here.
          </span>
          <a
            href="tel:+918239002370"
            className="inline-flex items-center gap-2 ml-auto"
          >
            <Phone size={12} />
            +91 8239002370
          </a>
        </div>
      </div>
      <div className="site-container site-nav">
        <Link
          href="/"
          aria-label="Roamify Planners home"
          onClick={() => setOpen(false)}
        >
          <img
            src="/logo-black.png"
            alt="Roamify Planners"
            className="site-logo"
            width="155"
            height="93"
          />
        </Link>
        <nav aria-label="Main navigation" className="site-nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact-us" className="site-button desktop-contact">
          Plan a trip <ArrowUpRight size={16} />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="mobile-menu-button"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="site-container mobile-menu"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/add-review" onClick={() => setOpen(false)}>
            Share a review
          </Link>
          <Link
            href="/contact-us"
            className="site-button"
            onClick={() => setOpen(false)}
          >
            Plan a trip <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
