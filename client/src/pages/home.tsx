import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import DestinationCard from "@/components/destination-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Destination } from "@shared/schema";

export default function Home() {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"]
  });

  return (
    <div>
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Featured Destinations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            destinations?.slice(0, 6).map((destination) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
