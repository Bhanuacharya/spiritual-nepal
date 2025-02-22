import { useQuery } from "@tanstack/react-query";
import type { Package } from "@shared/schema";
import PackageCard from "./package-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BestSellers() {
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/destinations/1/packages"]
  });

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2">Our Best Sellers for 2025</h2>
        <p className="text-muted-foreground mb-8">
          Discover our most popular spiritual journeys and transformative experiences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            packages?.map((package_) => (
              <PackageCard
                key={package_.id}
                package_={package_}
                onBook={() => {}}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
