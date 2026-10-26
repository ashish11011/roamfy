CREATE TABLE "group_trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"sharing_prices" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"trip_information" varchar,
	"images" varchar[],
	"banner_image" varchar,
	"itinerary_url" varchar,
	"itinary" varchar[],
	"is_flight_included" boolean DEFAULT false,
	"is_visible" boolean DEFAULT true NOT NULL,
	"is_domestic" boolean DEFAULT true NOT NULL,
	"hotels" jsonb[],
	CONSTRAINT "group_trips_slug_unique" UNIQUE("slug")
);
