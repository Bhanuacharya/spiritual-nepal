import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "United States",
    rating: 5,
    text: "An incredible spiritual journey that transformed my perspective. The meditation retreats were particularly enlightening.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  },
  {
    name: "David Chen",
    location: "Singapore",
    rating: 5,
    text: "The perfect blend of spiritual exploration and cultural immersion. The local guides were knowledgeable and passionate.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    name: "Emma Williams",
    location: "Australia",
    rating: 5,
    text: "Spirit Nepal provided an authentic experience that exceeded my expectations. The temple visits were deeply moving.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2">What Our Travelers Say</h2>
        <p className="text-muted-foreground mb-12">
          Real experiences from our spiritual seekers
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
