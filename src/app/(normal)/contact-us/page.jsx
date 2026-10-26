import HeroBG from "@/conponents/tripHero";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./contactForm";
import { BUSINESS_ADDRESS } from "@/const/contact";

export const metadata = {
  title: {
    absolute: "Contact Us | Roamify Planners",
  },
  description:
    "Get in touch with Roamify Planners for personalized travel assistance, bookings, and trip planning. Contact us via phone, email, or our online form to plan your next corporate tour, school trip, or honeymoon effortlessly.",
  alternates: {
    canonical: "https://www.roamifyplanners.in/contact-us",
  },
  keywords: [
    "Contact Roamify Planners",
    "travel agency contact",
    "trip planning support",
    "honeymoon bookings",
    "corporate travel help",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us | Roamify Planners",
    description:
      "Reach out to Roamify Planners for travel assistance, bookings, and custom trip planning. We’re here to make your journey seamless and memorable.",
    url: "https://www.roamifyplanners.in/contact-us",
    siteName: "Roamify Planners",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <HeroBG
        text="Good trips start with a conversation."
        eyebrow="Let’s talk travel"
        img="/contact-us.jpg"
      />
      <div className="site-container site-section contact-grid">
        <div>
          <span className="site-eyebrow">We’d love to hear from you</span>
          <h2 className="site-title">Where are you dreaming of going?</h2>
          <p className="mt-5 text-sub">
            A group getaway, a company retreat, or an escape for two. Tell us
            what you have in mind and we’ll help bring it together.
          </p>
          <div className="mt-6">
            <div className="contact-item">
              <Phone size={22} />
              <div>
                <h3>Give us a call</h3>
                <a href="tel:+918239002370">+91 8239002370</a>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={22} />
              <div>
                <h3>Drop us a line</h3>
                <a href="mailto:roamifyplanners@gmail.com">
                  roamifyplanners@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={22} />
              <div>
                <h3>Find us in Jaipur</h3>
                <p>{BUSINESS_ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
