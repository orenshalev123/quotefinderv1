
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  scrollToQuote: () => void;
}

const Hero = ({ scrollToQuote }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 px-6">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-gradient-radial from-insurance-blue/5 to-transparent opacity-70" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-insurance-blue/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-insurance-blue/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <div className="animate-fade-up">
            <div className="mb-6">
              <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full">
                Auto Insurance Made Simple
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-insurance-gray-dark">
              Drive with <span className="text-insurance-blue">Confidence</span>,
              <br />
              Insured with Trust
            </h1>
            <p className="text-lg text-insurance-gray mb-8 max-w-xl">
              Get tailored auto insurance coverage that fits your needs and
              budget. Protect your vehicle and loved ones with our comprehensive
              plans starting at just $39/month.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="rounded-lg font-medium"
                onClick={scrollToQuote}
              >
                Get Your Free Quote
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/50 backdrop-blur-sm rounded-lg font-medium border-insurance-gray-light hover:bg-white hover:border-insurance-blue"
              >
                View Coverage Options
              </Button>
            </div>

            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 border-white",
                      `bg-insurance-gray-light`
                    )}
                  />
                ))}
              </div>
              <div className="ml-4">
                <div className="text-insurance-gray-dark font-semibold">
                  Trusted by 10,000+ drivers
                </div>
                <div className="text-insurance-gray text-sm">
                  ★★★★★ <span className="font-medium">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[500px] animate-fade-in">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-soft rounded-2xl overflow-hidden">
              <div className="absolute top-1/2 right-0 w-96 h-96 bg-insurance-blue/20 rounded-full blur-3xl transform -translate-y-1/2" />
            </div>
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="glass rounded-xl w-full max-w-md p-6 border border-white/30 shadow-glass-light">
                <h3 className="text-xl font-semibold text-insurance-gray-dark mb-2">
                  Why Our Customers Love Us
                </h3>
                <p className="text-insurance-gray mb-6">
                  "The quote process was incredibly easy, and I saved over $500
                  on my annual premium. The customer service team was also
                  fantastic when I had questions."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-insurance-gray-light rounded-full mr-4" />
                  <div>
                    <p className="font-medium text-insurance-gray-dark">
                      Sarah Johnson
                    </p>
                    <p className="text-insurance-gray text-sm">
                      Customer since 2021
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
