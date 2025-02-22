import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInquirySchema, 
  insertReviewSchema, 
  insertBookingSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/destinations", async (_req, res) => {
    const destinations = await storage.getDestinations();
    res.json(destinations);
  });

  app.get("/api/destinations/type/:type", async (req, res) => {
    const destinations = await storage.getDestinationsByType(req.params.type);
    res.json(destinations);
  });

  app.get("/api/destinations/:id", async (req, res) => {
    const destination = await storage.getDestination(parseInt(req.params.id));
    if (!destination) {
      res.status(404).json({ message: "Destination not found" });
      return;
    }
    res.json(destination);
  });

  app.get("/api/destinations/:id/packages", async (req, res) => {
    const packages = await storage.getPackages(parseInt(req.params.id));
    res.json(packages);
  });

  app.get("/api/packages/:id", async (req, res) => {
    const package_ = await storage.getPackage(parseInt(req.params.id));
    if (!package_) {
      res.status(404).json({ message: "Package not found" });
      return;
    }
    res.json(package_);
  });

  app.get("/api/destinations/:id/reviews", async (req, res) => {
    const reviews = await storage.getReviews(parseInt(req.params.id));
    res.json(reviews);
  });

  app.post("/api/destinations/:id/reviews", async (req, res) => {
    try {
      const review = insertReviewSchema.parse({
        ...req.body,
        destinationId: parseInt(req.params.id)
      });
      const created = await storage.createReview(review);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  app.post("/api/packages/:id/book", async (req, res) => {
    try {
      const booking = insertBookingSchema.parse({
        ...req.body,
        packageId: parseInt(req.params.id)
      });
      const created = await storage.createBooking(booking);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiry = insertInquirySchema.parse(req.body);
      const created = await storage.createInquiry(inquiry);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid inquiry data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}