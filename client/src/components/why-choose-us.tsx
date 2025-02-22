import { Building2, Heart, Map, Shield } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Authentic Experiences",
    description: "Connect with Nepal's spiritual heritage through carefully curated, authentic experiences."
  },
  {
    icon: Shield,
    title: "Safe & Responsible",
    description: "Travel with confidence knowing your safety and well-being are our top priorities."
  },
  {
    icon: Building2,
    title: "Local Expertise",
    description: "Benefit from our deep local knowledge and connections with spiritual communities."
  },
  {
    icon: Map,
    title: "Customized Journeys",
    description: "Tailor your spiritual journey to match your personal interests and goals."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2">Why Spirit Nepal?</h2>
        <p className="text-muted-foreground mb-12">
          Your trusted partner in spiritual tourism
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
