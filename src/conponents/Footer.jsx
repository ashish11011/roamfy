import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { BUSINESS_ADDRESS } from "@/const/contact";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <span className="text-xs uppercase tracking-[.15em] text-white/60">
              There’s a whole world out there.
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mt-2">
              Let’s find your next adventure.
            </h2>
          </div>
          <Link href="/contact-us" className="site-button">
            Let’s talk travel <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label="Roamify Planners home">
              <img
                src="/logo-white.png"
                alt="Roamify Planners"
                className="w-36 h-auto mb-4"
                loading="lazy"
              />
            </Link>
            <p className="max-w-xs mb-6">
              Thoughtfully planned journeys. Beautiful places. Memories that
              stay with you.
            </p>
            <h3>Find us in Jaipur</h3>
            <p className="max-w-xs">{BUSINESS_ADDRESS}</p>
          </div>
          <div>
            <h3>Go explore</h3>
            <ul>
              <li>
                <Link href="/#package">Our trips</Link>
              </li>
              <li>
                <Link href="/#group-tour-packages">Group tour packages</Link>
              </li>
              <li>
                <Link href="/about-us">Our story</Link>
              </li>
              <li>
                <Link href="/blog">Travel journal</Link>
              </li>
              <li>
                <Link href="/add-review">Share your experience</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>The useful details</h3>
            <ul>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms-conditions">Terms and conditions</Link>
              </li>
              <li>
                <Link href="/refund-policy">Refund policy</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>A conversation away</h3>
            <ul>
              <li>
                <a
                  href="tel:+918239002370"
                  className="inline-flex items-center gap-2"
                >
                  <Phone size={14} />
                  +91 8239002370
                </a>
              </li>
              <li>
                <a
                  href="mailto:roamifyplanners@gmail.com"
                  className="inline-flex items-start gap-2 break-all"
                >
                  <Mail size={14} className="shrink-0 mt-1" />
                  roamifyplanners@gmail.com
                </a>
              </li>
            </ul>
            <p className="mt-6">
              Tell us where you’re dreaming of going. We’ll help with the rest.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © Roamify Planners</p>
          <p>Made for the memories.</p>
        </div>
      </div>
    </footer>
  );
}
