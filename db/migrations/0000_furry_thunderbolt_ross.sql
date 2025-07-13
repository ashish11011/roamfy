CREATE TABLE "blogForm" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar,
	"message" varchar,
	"number" varchar,
	"refrence_blog_link" varchar,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"meta_description" varchar,
	"blog_category" varchar,
	"image" varchar,
	"tags" varchar[],
	"date" varchar,
	"data" varchar,
	"user_image" varchar,
	"user_name" varchar,
	"slug" varchar,
	"is_visible" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar,
	"phone" varchar,
	"location" varchar,
	"message" varchar
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar,
	"rating" integer NOT NULL,
	"message" varchar NOT NULL,
	"is_admin_approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"description" varchar,
	"slug" varchar,
	"dates" varchar[],
	"is_flight_included" boolean DEFAULT false,
	"images" varchar[],
	"banner_image" varchar,
	"includes" varchar[],
	"note" varchar[],
	"itinary" varchar[],
	"itinary_description" varchar,
	"is_visible" boolean DEFAULT true NOT NULL,
	"hotel_name" varchar,
	"hotel_image" varchar,
	"hotel_rating" integer,
	"hotel_location" varchar,
	"hotel_description" varchar
);
