import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import BestSellers from "@/components/best-sellers";
import WhyChooseUs from "@/components/why-choose-us";
import Activities from "@/components/activities";
import TestimonialsSection from "@/components/testimonials";
import FAQSection from "@/components/faq-section";
import type { Destination } from "@shared/schema";

export default function Home() {
  //const { data: destinations, isLoading } = useQuery<Destination[]>({
  //  queryKey: ["/api/destinations"]
  //});

  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <Activities />
      <BestSellers />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}