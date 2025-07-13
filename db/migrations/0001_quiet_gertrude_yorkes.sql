CREATE TABLE "subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "trip_information" varchar;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "is_domestic" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "hotels" jsonb[];--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "dates";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "includes";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "note";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "itinary_description";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "hotel_name";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "hotel_image";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "hotel_rating";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "hotel_location";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "hotel_description";