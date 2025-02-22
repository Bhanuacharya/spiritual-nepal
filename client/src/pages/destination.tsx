import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Destination } from "@shared/schema";

export default function DestinationPage() {
  const { id } = useParams();
  
  const { data: destination, isLoading } = useQuery<Destination>({
    queryKey: [`/api/destinations/${id}`]
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="object-cover w-full h-full"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">{destination.name}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {destination.location}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Best Time to Visit</h2>
            <p>{destination.bestTimeToVisit}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Cultural Etiquette</h2>
            <p>{destination.culturalEtiquette}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Nearby Accommodations</h2>
            <p>{destination.nearbyAccommodations}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-lg leading-relaxed">{destination.description}</p>
      </div>
    </div>
  );
}
