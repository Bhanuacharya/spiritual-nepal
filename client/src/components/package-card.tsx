import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "@shared/schema";
import { Check } from "lucide-react";

interface PackageCardProps {
  package_: Package;
  onBook: () => void;
}

export default function PackageCard({ package_, onBook }: PackageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{package_.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">{package_.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="font-semibold">{package_.duration}</span>
            <span className="text-xl font-bold">${package_.price}</span>
          </div>
          
          <div className="space-y-2">
            <p className="font-semibold">What's included:</p>
            <ul className="space-y-1">
              {package_.included.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button onClick={onBook} className="w-full">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
