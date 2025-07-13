import {
  boolean,
  integer,
  pgTable,
  uuid,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const tripTable = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug"),
  title: varchar("title"),
  description: varchar("description"),
  tripInformation: varchar("trip_information"),
  images: varchar("images").array(),
  bannerImage: varchar("banner_image"),

  itinary: varchar("itinary").array(),

  isFlightIncluded: boolean("is_flight_included").default(false),
  isVisible: boolean("is_visible").notNull().default(true),
  isDomestic: boolean("is_domestic").notNull().default(true),

  //hotel details
  hotels: jsonb("hotels").array(),
});

export const reviewsTable = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  email: varchar("email"),
  rating: integer("rating").notNull(),
  message: varchar("message").notNull(),
  isAdminApproved: boolean("is_admin_approved").notNull().default(false),
});

export const contactTable = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  email: varchar("email"),
  phone: varchar("phone"),
  location: varchar("location"),
  message: varchar("message"),
});

export const blogTable = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title"),
  metaDescription: varchar("meta_description"),
  blogCategory: varchar("blog_category"),
  image: varchar("image"),
  tags: varchar("tags").array(),
  date: varchar("date"),

  // Data-> blog content
  data: varchar("data"),
  userImage: varchar("user_image"),
  userName: varchar("user_name"),
  slug: varchar("slug"),
  isVisible: boolean("is_visible").default(true),
});

export const blogForm = pgTable("blogForm", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  email: varchar("email"),
  message: varchar("message"),
  number: varchar("number"),
  refrenceBlogLink: varchar("refrence_blog_link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptionTable = pgTable("subscription", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
