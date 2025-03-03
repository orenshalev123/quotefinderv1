
import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Benefits from "@/components/ui/Benefits";
import QuoteForm from "@/components/form/QuoteForm";

const Index = () => {
  const quoteFormRef = useRef<HTMLDivElement | null>(null);

  const scrollToQuote = () => {
    if (quoteFormRef.current) {
      quoteFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Hero scrollToQuote={scrollToQuote} />
        
        <div id="benefits">
          <Benefits />
        </div>
        
        <div ref={quoteFormRef} id="quote-form">
          <QuoteForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
