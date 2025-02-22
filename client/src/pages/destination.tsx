import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Destination, Package } from "@shared/schema";
import PackageCard from "@/components/package-card";
import ReviewSection from "@/components/review-section";
import BookingDialog from "@/components/booking-dialog";

export default function DestinationPage() {
  const { id } = useParams();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const { data: destination, isLoading: destinationLoading } = useQuery<Destination>({
    queryKey: [`/api/destinations/${id}`]
  });

  const { data: packages = [], isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: [`/api/destinations/${id}/packages`]
  });

  if (destinationLoading || packagesLoading) {
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

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-lg leading-relaxed">{destination.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Best Time to Visit</h2>
            <p className="text-muted-foreground">{destination.bestTimeToVisit}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Cultural Etiquette</h2>
            <p className="text-muted-foreground">{destination.culturalEtiquette}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Nearby Accommodations</h2>
            <p className="text-muted-foreground">{destination.nearbyAccommodations}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-8">Visitor Reviews</h2>
        <ReviewSection destinationId={parseInt(id)} />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-8">Available Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((package_) => (
            <PackageCard
              key={package_.id}
              package_={package_}
              onBook={() => setSelectedPackage(package_)}
            />
          ))}
        </div>
      </div>

      {selectedPackage && (
        <BookingDialog
          package_={selectedPackage}
          open={!!selectedPackage}
          onOpenChange={(open) => !open && setSelectedPackage(null)}
        />
      )}
    </div>
  );
}