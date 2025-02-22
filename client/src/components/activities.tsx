import { Card, CardContent } from "@/components/ui/card";
import { 
  Flower2, Mountain, BookOpen, Heart, 
  Sunrise, Users 
} from "lucide-react";

const activities = [
  {
    icon: Flower2,
    title: "Meditation Retreats",
    description: "Find inner peace through guided meditation sessions in ancient monasteries."
  },
  {
    icon: Mountain,
    title: "Pilgrimages",
    description: "Journey to sacred sites and temples across Nepal's spiritual landscape."
  },
  {
    icon: BookOpen,
    title: "Buddhist Studies",
    description: "Learn from Buddhist scholars and participate in traditional teachings."
  },
  {
    icon: Heart,
    title: "Yoga Sessions",
    description: "Practice yoga in the birthplace of ancient spiritual traditions."
  },
  {
    icon: Sunrise,
    title: "Spiritual Healing",
    description: "Experience traditional healing practices and energy work."
  },
  {
    icon: Users,
    title: "Cultural Immersion",
    description: "Live and learn alongside local spiritual communities."
  }
];

export default function Activities() {
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
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                      <p className="text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}