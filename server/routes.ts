import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";

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
