
import { Button } from "@/components/ui/button";

const NewsletterSignup = () => {
  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">
      <div className="bg-insurance-blue-dark text-white p-4">
        <h3 className="text-lg font-semibold">Stay Informed</h3>
        <p className="text-sm mt-1 text-white/90">Get insurance tips in your inbox</p>
      </div>
      <div className="p-4">
        <form className="space-y-3">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-insurance-gray-dark focus:outline-none focus:ring-2 focus:ring-insurance-blue-light"
          />
          <Button className="w-full bg-insurance-blue hover:bg-insurance-blue-dark text-white">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
