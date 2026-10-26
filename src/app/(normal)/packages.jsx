"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Compass, MapPin, Search, Users } from "lucide-react";
import { GroupTourPrices } from "@/components/groupTourPrices";
import { SectionHeading } from "@/components/site/sectionHeading";
import { formatPrice } from "@/helper/groupTourPricing";

export function Packages({ data = [] }) {
  return <PackageCollection data={data} />;
}
export function GroupTourPackages({ data = [] }) {
  return <PackageCollection data={data} group />;
}
function PackageCollection({ data, group = false }) {
  const [domestic, setDomestic] = useState(true);
  const [search, setSearch] = useState("");
  const trips = data.filter(
    (trip) =>
      (group || Boolean(trip.isDomestic) === domestic) &&
      trip.title?.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <section
      id={group ? "group-tour-packages" : "package"}
      className={`site-section ${group ? "group-tour-section" : ""}`}
    >
      <div className="site-container">
        <SectionHeading
          eyebrow={
            group
              ? "Good company. Great journeys."
              : "Find your kind of getaway"
          }
          title={group ? "Group Tour Package" : "A world of possibilities."}
          description={
            group
              ? "Share the adventure, choose your room sharing option. All prices are per person."
              : "From a quick escape to a faraway adventure, there’s a journey with your name on it."
          }
        />
        <div className="package-controls">
          {group ? (
            <span className="inline-flex items-center gap-2 text-sm text-sub">
              <Users size={18} />
              Better together, wherever you go.
            </span>
          ) : (
            <div className="segment-control" aria-label="Trip destinations">
              <button
                type="button"
                aria-pressed={domestic}
                onClick={() => setDomestic(true)}
              >
                Domestic
              </button>
              <button
                type="button"
                aria-pressed={!domestic}
                onClick={() => setDomestic(false)}
              >
                International
              </button>
            </div>
          )}
          <label className="package-search">
            <span className="sr-only">
              {group ? "Search group tours" : "Search trips"}
            </span>
            <Search size={18} />
            <input
              type="search"
              className="site-input"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
        <div className="package-grid">
          {trips.length ? (
            trips.map((trip) => (
              <PackageCard
                key={trip.id || trip.slug}
                {...trip}
                isGroupTour={group}
              />
            ))
          ) : (
            <div className="empty-packages">
              <Compass size={32} className="mx-auto text-primary mb-4" />
              <h3 className="text-xl font-medium">
                {search
                  ? "No matching trips just yet."
                  : group
                    ? "Group tour packages will be available soon."
                    : "Your next adventure is taking shape."}
              </h3>
              <p>
                {search
                  ? "Try another destination, or let us plan something just for you."
                  : "Have somewhere in mind? We’d love to help you get there."}
              </p>
              <Link
                href="/contact-us"
                className="site-button site-button-outline"
              >
                Plan a custom trip <ArrowUpRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
function PackageCard({
  title,
  bannerImage,
  price,
  slug,
  isGroupTour,
  sharingPrices,
  isDomestic,
}) {
  const href = `/${isGroupTour ? "group-trip" : "trip"}/${encodeURIComponent(slug)}`;
  return (
    <Link href={href} className="travel-package-card">
      <div className="relative shrink-0 overflow-hidden rounded-[18px] bg-[var(--brand-cream)]">
        <Image
          src={bannerImage || "/trip-hero-bg.jpg"}
          alt={title}
          width={600}
          height={750}
          // sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="block h-auto w-full object-contain"
        />
        <span className="package-badge">
          {isGroupTour
            ? "Group getaway"
            : isDomestic
              ? "Discover India"
              : "Beyond borders"}
        </span>
      </div>
      <div className="package-card-body">
        <h3>{title}</h3>
        <p className="package-card-meta">
          {isGroupTour ? <Users size={14} /> : <MapPin size={14} />}
          {isGroupTour
            ? "Shared rooms. Shared memories."
            : "A journey planned around you."}
        </p>
        {isGroupTour && (
          <GroupTourPrices sharingPrices={sharingPrices} compact />
        )}
        <div className="package-card-footer">
          <span>
            {!isGroupTour && price ? (
              <>
                <span className="text-xs text-sub block">Starting from</span>
                <strong className="font-medium text-lg">
                  {Number.isFinite(Number(price)) ? formatPrice(price) : price}
                </strong>
              </>
            ) : (
              "Explore this journey"
            )}
          </span>
          <span className="round-arrow">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
