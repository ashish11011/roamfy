import { HeadingDescription } from "./headingDescription";
import { TravelPlan } from "./travelPlan";
import TripContactFrom from "./tripContactForm";
import { GroupTourPrices } from "@/components/groupTourPrices";
import { ArrowDownToLine } from "lucide-react";

export function TripDetails({ tripData, isGroupTour = false }) {
  return (
    <div className="site-container page-content trip-layout">
      <article className="trip-content">
        <div className="trip-price-panel">
          {isGroupTour ? (
            <GroupTourPrices sharingPrices={tripData.sharingPrices} />
          ) : tripData.price ? (
            <>
              <p className="text-sm text-sub">Your adventure, starting from</p>
              <p className="text-4xl font-medium tracking-tight text-primary mt-2">
                ₹{tripData.price}
              </p>
              <p className="text-xs text-sub mt-3">
                Price is subject to availability and travel dates.
              </p>
            </>
          ) : (
            <>
              <span className="site-eyebrow">A trip shaped around you</span>
              <h2 className="text-2xl font-medium">
                Let’s plan your adventure.
              </h2>
              <p className="text-sm text-sub mt-2">
                Get in touch for pricing and availability.
              </p>
            </>
          )}
          {tripData.itinaryURL && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={tripData.itinaryURL}
              className="site-text-link mt-6"
            >
              View full itinerary <ArrowDownToLine size={16} />
            </a>
          )}
        </div>
        <section>
          <HeadingDescription tripDescription={tripData.description} />
        </section>
        {tripData.tripInformation && (
          <section
            className="tiptap"
            dangerouslySetInnerHTML={{ __html: tripData.tripInformation }}
          />
        )}
        {tripData.itinary?.length > 0 && (
          <section>
            <TravelPlan
              itinary={{
                description: tripData.itinaryDescription,
                itinary: tripData.itinary,
              }}
            />
          </section>
        )}
      </article>
      <TripContactFrom slug={tripData.slug} isGroupTour={isGroupTour} />
    </div>
  );
}
