import { 
  destinations, inquiries, packages, reviews, bookings,
  type Destination, type InsertDestination,
  type Inquiry, type InsertInquiry,
  type Package, type InsertPackage,
  type Review, type InsertReview,
  type Booking, type InsertBooking
} from "@shared/schema";

export interface IStorage {
  getDestinations(): Promise<Destination[]>;
  getDestinationsByType(type: string): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;

  // Package methods
  getPackages(destinationId: number): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;

  // Review methods
  getReviews(destinationId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private destinations: Map<number, Destination>;
  private inquiries: Map<number, Inquiry>;
  private packages: Map<number, Package>;
  private reviews: Map<number, Review>;
  private bookings: Map<number, Booking>;

  private destCurrentId: number;
  private inquiryCurrentId: number;
  private packageCurrentId: number;
  private reviewCurrentId: number;
  private bookingCurrentId: number;

  constructor() {
    this.destinations = new Map();
    this.inquiries = new Map();
    this.packages = new Map();
    this.reviews = new Map();
    this.bookings = new Map();

    this.destCurrentId = 1;
    this.inquiryCurrentId = 1;
    this.packageCurrentId = 1;
    this.reviewCurrentId = 1;
    this.bookingCurrentId = 1;

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

      // Add sample packages for each destination
      const samplePackages: InsertPackage[] = [
        {
          name: "Spiritual Discovery",
          description: "A guided tour of the sacred site with meditation sessions",
          duration: "3 days",
          price: 299,
          included: ["Guided tours", "Meditation sessions", "Local transport", "Meals"],
          destinationId: id
        },
        {
          name: "Cultural Immersion",
          description: "Deep dive into local customs and traditions",
          duration: "5 days",
          price: 499,
          included: ["Accommodation", "Cultural workshops", "Traditional meals", "Local guide"],
          destinationId: id
        }
      ];

      samplePackages.forEach(pkg => {
        const pkgId = this.packageCurrentId++;
        this.packages.set(pkgId, { ...pkg, id: pkgId });
      });
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

  async getPackages(destinationId: number): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(
      pkg => pkg.destinationId === destinationId
    );
  }

  async getPackage(id: number): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async getReviews(destinationId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.destinationId === destinationId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewCurrentId++;
    const review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingCurrentId++;
    const booking = {
      ...insertBooking,
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryCurrentId++;
    const inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();