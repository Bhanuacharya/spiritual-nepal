import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the best time to visit Nepal for spiritual tourism?",
    answer: "The best time to visit Nepal for spiritual tourism is from October to March when the weather is clear and pleasant. However, each season offers its unique spiritual experiences."
  },
  {
    question: "Do I need any special permits to visit monasteries or temples?",
    answer: "Most temples and monasteries are open to visitors without special permits. However, some remote monasteries might require permits which we can arrange for you."
  },
  {
    question: "What should I wear when visiting religious sites?",
    answer: "Modest dress is required at religious sites. Cover your shoulders and knees, and be prepared to remove shoes at temples. We provide detailed guidelines before your visit."
  },
  {
    question: "Can I participate in meditation sessions if I'm a beginner?",
    answer: "Absolutely! Our programs cater to all levels of experience. Beginners are welcome, and our guides provide proper instruction and support."
  },
  {
    question: "How physically demanding are the spiritual tours?",
    answer: "Our tours vary in physical intensity. We can customize itineraries to match your comfort level and physical capabilities."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-12">
          Find answers to common questions about spiritual tourism in Nepal
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
