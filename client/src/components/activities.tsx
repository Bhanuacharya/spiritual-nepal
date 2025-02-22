import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Flower2, Mountain, BookOpen, Heart, 
  Sunrise, Users 
} from "lucide-react";
import { useState } from "react";

const activities = [
  {
    icon: Flower2,
    title: "Meditation Retreats",
    description: "Find inner peace through guided meditation sessions in ancient monasteries.",
    details: [
      "Daily guided meditation sessions",
      "Teachings from experienced monks",
      "Accommodation in traditional monastery quarters",
      "Vegetarian meals included",
      "7-14 day programs available",
      "Suitable for beginners and advanced practitioners"
    ]
  },
  {
    icon: Mountain,
    title: "Pilgrimages",
    description: "Journey to sacred sites and temples across Nepal's spiritual landscape.",
    details: [
      "Guided tours to major pilgrimage sites",
      "Local spiritual expert accompaniment",
      "Traditional ceremonies participation",
      "Cultural and historical insights",
      "Comfortable transportation provided",
      "Flexible itineraries available"
    ]
  },
  {
    icon: BookOpen,
    title: "Buddhist Studies",
    description: "Learn from Buddhist scholars and participate in traditional teachings.",
    details: [
      "Comprehensive Buddhist philosophy courses",
      "Ancient text studies",
      "Interactive sessions with scholars",
      "Certificate programs available",
      "Library access included",
      "Translation services provided"
    ]
  },
  {
    icon: Heart,
    title: "Yoga Sessions",
    description: "Practice yoga in the birthplace of ancient spiritual traditions.",
    details: [
      "Traditional Hatha and Ashtanga yoga",
      "Expert yoga instructors",
      "Morning and evening sessions",
      "All skill levels welcome",
      "Meditation integration",
      "Ayurvedic consultations available"
    ]
  },
  {
    icon: Sunrise,
    title: "Spiritual Healing",
    description: "Experience traditional healing practices and energy work.",
    details: [
      "Traditional healing ceremonies",
      "Energy balancing sessions",
      "Ayurvedic treatments",
      "Sound healing workshops",
      "Personal consultation included",
      "Natural remedy education"
    ]
  },
  {
    icon: Users,
    title: "Cultural Immersion",
    description: "Live and learn alongside local spiritual communities.",
    details: [
      "Homestay with local families",
      "Traditional craft workshops",
      "Festival participation",
      "Language learning sessions",
      "Community service opportunities",
      "Authentic cultural experiences"
    ]
  }
];

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState<(typeof activities)[0] | null>(null);

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2">Activities We Offer</h2>
        <p className="text-muted-foreground mb-12">
          Explore our range of transformative spiritual experiences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Card 
                key={index}
                className="cursor-pointer transition-all hover:shadow-lg"
                onClick={() => setSelectedActivity(activity)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                      <p className="text-muted-foreground">{activity.description}</p>
                      <Button 
                        variant="link" 
                        className="mt-2 p-0 h-auto font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedActivity(activity);
                        }}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="sm:max-w-[500px]">
            {selectedActivity && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <selectedActivity.icon className="h-6 w-6 text-primary" />
                    {selectedActivity.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-muted-foreground mb-4">
                    {selectedActivity.description}
                  </p>
                  <h4 className="font-semibold mb-2">What's Included:</h4>
                  <ul className="space-y-2">
                    {selectedActivity.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" onClick={() => window.location.href="/contact"}>
                    Inquire Now
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}