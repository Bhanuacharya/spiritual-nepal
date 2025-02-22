import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // temple, monastery, meditation center, yoga retreat
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  bestTimeToVisit: text("best_time_to_visit").notNull(),
  culturalEtiquette: text("cultural_etiquette").notNull(),
  nearbyAccommodations: text("nearby_accommodations").notNull(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(),
  included: text("included").array().notNull(),
  destinationId: integer("destination_id").references(() => destinations.id),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  authorName: text("author_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  destinationId: integer("destination_id").references(() => destinations.id),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  date: text("date").notNull(),
  persons: integer("persons").notNull(),
  packageId: integer("package_id").references(() => packages.id),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  destinationId: integer("destination_id").references(() => destinations.id),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({ 
  id: true 
});

export const insertPackageSchema = createInsertSchema(packages).omit({ 
  id: true 
});

export const insertReviewSchema = createInsertSchema(reviews).omit({ 
  id: true,
  createdAt: true
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true,
  status: true,
  createdAt: true
}).extend({
  email: z.string().email("Please enter a valid email address"),
  date: z.string().min(1, "Date is required"),
  persons: z.number().min(1, "Number of persons must be at least 1")
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({ 
  id: true 
}).extend({
  email: z.string().email("Please enter a valid email address")
});

export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;