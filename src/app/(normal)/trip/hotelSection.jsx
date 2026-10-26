import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/site/sectionHeading";

export function HotelSection({ hotelData = [] }) {
  const hotels = hotelData.filter((hotel) => hotel.hotelName);
  if (!hotels.length) return null;
  return (
    <section className="site-container pb-12 md:pb-20">
      <SectionHeading
        eyebrow="Rest easy"
        title="A good place to call it a day."
        description="A look at the stays planned for your journey."
      />
      <div className="hotel-grid">
        {hotels.map((hotel, index) => (
          <article className="hotel-card" key={index}>
            <Image
              src={hotel.hotelImage || "/trip-hero-bg.jpg"}
              alt={hotel.hotelName}
              width={500}
              height={350}
            />
            <div className="p-4">
              <h3>{hotel.hotelName}</h3>
              <div
                className="flex gap-1 text-primary mb-3"
                aria-label={`${hotel.hotelRating || 0} star hotel`}
              >
                {Array.from(
                  {
                    length: Math.max(
                      0,
                      Math.min(5, Number(hotel.hotelRating) || 0),
                    ),
                  },
                  (_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ),
                )}
              </div>
              {hotel.hotelLocation && (
                <p className="text-sm text-sub flex items-center gap-2">
                  <MapPin size={14} />
                  {hotel.hotelLocation}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
