import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import type { Destination } from "@shared/schema";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{destination.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">
            {destination.description}
          </p>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span className="capitalize">{destination.type}</span>
            <span className="mx-2">•</span>
            <span>{destination.location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
