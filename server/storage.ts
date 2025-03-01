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
    // Make sure the destinations have all required fields
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Pashupatinath Temple",
        type: "temple",
        location: "Kathmandu",
        description: "One of the most sacred Hindu temples dedicated to Lord Shiva, located on the banks of the Bagmati River.",
        imageUrl: "/images/pashupatinath.jpg",
        bestTimeToVisit: "February to May, September to November",
        culturalEtiquette: "Remove shoes before entering temple premises. Non-Hindus can observe from outside the main temple.",
        nearbyAccommodations: "Various hotels in Kathmandu, 3-5 km from the temple"
      },
      {
        name: "Boudhanath Stupa",
        type: "monastery",
        location: "Kathmandu",
        description: "One of the largest spherical stupas in Nepal and a UNESCO World Heritage Site, important place for Tibetan Buddhism.",
        imageUrl: "/images/boudhanath.jpg",
        bestTimeToVisit: "October to December",
        culturalEtiquette: "Walk clockwise around the stupa. Respectful attire recommended.",
        nearbyAccommodations: "Guest houses and hotels around Boudhanath area"
      },
      // Add new destinations here
      {
        name: "Swayambhunath Temple",
        type: "temple",
        location: "Kathmandu",
        description: "Also known as the Monkey Temple, this ancient religious complex sits atop a hill in the Kathmandu Valley and offers panoramic views of the city.",
        imageUrl: "/images/swayambhunath.jpg",
        bestTimeToVisit: "March to May, September to November",
        culturalEtiquette: "Modest dress recommended. Remove shoes at designated areas.",
        nearbyAccommodations: "Hotels in Kathmandu, 2-4 km from the temple"
      },
      {
        name: "Kopan Monastery",
        type: "monastery",
        location: "Kathmandu",
        description: "A Tibetan Buddhist monastery that offers meditation and Buddhism courses for visitors seeking spiritual growth.",
        imageUrl: "/images/kopan.jpg",
        bestTimeToVisit: "Year-round, special courses in November-December",
        culturalEtiquette: "Silence in meditation halls. Modest dress required.",
        nearbyAccommodations: "On-site accommodation available for course participants"
      },
      {
        name: "Lumbini",
        type: "temple",
        location: "Lumbini",
        description: "The birthplace of Lord Buddha and a UNESCO World Heritage Site featuring numerous temples and monasteries from different Buddhist countries.",
        imageUrl: "/images/lumbini.jpg",
        bestTimeToVisit: "October to April",
        culturalEtiquette: "Respectful behavior and modest clothing. No loud noises in sacred areas.",
        nearbyAccommodations: "Hotels and guest houses in Lumbini"
      },
      {
        name: "Osho Tapoban",
        type: "meditation center",
        location: "Nagarjun Forest, Kathmandu",
        description: "A forest retreat center dedicated to Osho's meditation techniques, offering a peaceful environment for spiritual seekers.",
        imageUrl: "/images/osho-tapoban.jpg",
        bestTimeToVisit: "September to May",
        culturalEtiquette: "Participation in meditation sessions requires following center guidelines.",
        nearbyAccommodations: "On-site accommodation available, or hotels in Kathmandu"
      },
      {
        name: "Namo Buddha",
        type: "monastery",
        location: "Kavre District",
        description: "A sacred Buddhist site where, according to legend, Buddha in a previous life sacrificed himself to feed a starving tigress and her cubs.",
        imageUrl: "/images/namo-buddha.jpg",
        bestTimeToVisit: "March to May, September to November",
        culturalEtiquette: "Respect monks and ongoing practices. Photography restrictions in some areas.",
        nearbyAccommodations: "Monastery guesthouse and nearby resorts"
      },
      {
        name: "Nepal Yoga Academy",
        type: "yoga retreat",
        location: "Kathmandu",
        description: "A center dedicated to authentic yoga practices, offering teacher training courses and retreats in a peaceful setting.",
        imageUrl: "/images/nepal-yoga.jpg",
        bestTimeToVisit: "Year-round",
        culturalEtiquette: "Follow academy guidelines during yoga sessions.",
        nearbyAccommodations: "On-site accommodation for participants"
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