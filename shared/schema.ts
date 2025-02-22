import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
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

export const insertInquirySchema = createInsertSchema(inquiries).omit({ 
  id: true 
}).extend({
  email: z.string().email("Please enter a valid email address")
});

export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
