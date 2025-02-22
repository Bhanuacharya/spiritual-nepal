import { destinations, inquiries, type Destination, type InsertDestination, type Inquiry, type InsertInquiry } from "@shared/schema";

export interface IStorage {
  getDestinations(): Promise<Destination[]>;
  getDestinationsByType(type: string): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private destinations: Map<number, Destination>;
  private inquiries: Map<number, Inquiry>;
  private destCurrentId: number;
  private inquiryCurrentId: number;

  constructor() {
    this.destinations = new Map();
    this.inquiries = new Map();
    this.destCurrentId = 1;
    this.inquiryCurrentId = 1;
    
    // Add sample destinations
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Pashupatinath Temple",
        type: "temple",
        description: "One of the most sacred Hindu temples dedicated to Lord Shiva",
        location: "Kathmandu",
        imageUrl: "https://images.unsplash.com/photo-1544735716-87fa59a45b4e",
        bestTimeToVisit: "October to March",
        culturalEtiquette: "Remove shoes, no leather items, proper attire required",
        nearbyAccommodations: "Hotel Shanker, Hotel Annapurna"
      },
      {
        name: "Kopan Monastery",
        type: "monastery",
        description: "A Tibetan Buddhist monastery offering meditation and Buddhism courses",
        location: "Kopan Hill, Kathmandu",
        imageUrl: "https://images.unsplash.com/photo-1706187243907-20b4a3944a41",
        bestTimeToVisit: "Year-round",
        culturalEtiquette: "Modest dress, quiet observation, photography restrictions",
        nearbyAccommodations: "Monastery Guest House, Hotel Tibet"
      }
    ];

    sampleDestinations.forEach(dest => {
      const id = this.destCurrentId++;
      this.destinations.set(id, { ...dest, id });
    });
  }

  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestinationsByType(type: string): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(
      dest => dest.type === type
    );
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryCurrentId++;
    const inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
