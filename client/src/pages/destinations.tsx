import { useQuery } from "@tanstack/react-query";
import DestinationCard from "@/components/destination-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Destination } from "@shared/schema";

const DESTINATION_TYPES = [
  "all",
  "temple",
  "monastery",
  "meditation center",
  "yoga retreat"
];

export default function Destinations() {
  const { data: allDestinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"]
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Sacred Destinations</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          {DESTINATION_TYPES.map((type) => (
            <TabsTrigger key={type} value={type} className="capitalize">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>

        {DESTINATION_TYPES.map((type) => (
          <TabsContent key={type} value={type}>
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
                allDestinations
                  ?.filter(d => type === "all" || d.type === type)
                  .map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                    />
                  ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
