
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import ProgressIndicator from "../ui/ProgressIndicator";
import { toast } from "sonner";
import { 
  Car, 
  User, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Form steps
const STEPS = ["Vehicle Information", "Personal Details", "Coverage Options", "Review & Submit"];

// Vehicle form data type
interface VehicleFormData {
  make: string;
  model: string;
  year: string;
  vin: string;
}

// Personal info form data type
interface PersonalFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  drivingHistory: string;
}

// Coverage form data type
interface CoverageFormData {
  coverage: string;
  deductible: string;
  additionalDrivers: string;
  includeRoadside: boolean;
  includeRental: boolean;
}

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Form data states
  const [vehicleData, setVehicleData] = useState<VehicleFormData>({
    make: "",
    model: "",
    year: "",
    vin: "",
  });
  
  const [personalData, setPersonalData] = useState<PersonalFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    drivingHistory: "clean",
  });
  
  const [coverageData, setCoverageData] = useState<CoverageFormData>({
    coverage: "standard",
    deductible: "500",
    additionalDrivers: "0",
    includeRoadside: false,
    includeRental: false,
  });

  // Handle vehicle data changes
  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({ ...prev, [name]: value }));
  };

  // Handle personal data changes
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  // Handle coverage data changes
  const handleCoverageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setCoverageData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Next step handler
  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Previous step handler
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your quote request has been submitted successfully!");
      
      // Reset form and go to first step
      setCurrentStep(0);
      setVehicleData({
        make: "",
        model: "",
        year: "",
        vin: "",
      });
      setPersonalData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        zipCode: "",
        drivingHistory: "clean",
      });
      setCoverageData({
        coverage: "standard",
        deductible: "500",
        additionalDrivers: "0",
        includeRoadside: false,
        includeRental: false,
      });
    }, 1500);
  };

  return (
    <section 
      id="quote-form" 
      className="bg-insurance-gray-lightest py-20 px-6"
      ref={formRef}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-3">
            Get Protected Today
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-insurance-gray-dark">
            Get Your Free Quote
          </h2>
          <p className="text-insurance-gray max-w-2xl mx-auto">
            Fill out this simple form to receive a personalized auto insurance quote
            that fits your needs and budget.
          </p>
        </div>
        
        <div className="glass p-8 rounded-xl">
          <ProgressIndicator 
            steps={STEPS} 
            currentStep={currentStep} 
            className="mb-10"
          />
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Vehicle Information */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-up">
                <h3 className="text-xl font-semibold text-insurance-gray-dark flex items-center">
                  <Car className="mr-2 text-insurance-blue h-5 w-5" />
                  Vehicle Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Vehicle Make
                    </label>
                    <select
                      name="make"
                      value={vehicleData.make}
                      onChange={handleVehicleChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      required
                    >
                      <option value="">Select Make</option>
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                      <option value="ford">Ford</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="bmw">BMW</option>
                      <option value="mercedes">Mercedes-Benz</option>
                      <option value="audi">Audi</option>
                      <option value="lexus">Lexus</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={vehicleData.model}
                      onChange={handleVehicleChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      placeholder="e.g. Camry, Civic"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Year
                    </label>
                    <select
                      name="year"
                      value={vehicleData.year}
                      onChange={handleVehicleChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      required
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 25 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      VIN (Optional)
                    </label>
                    <input
                      type="text"
                      name="vin"
                      value={vehicleData.vin}
                      onChange={handleVehicleChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      placeholder="Vehicle Identification Number"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-up">
                <h3 className="text-xl font-semibold text-insurance-gray-dark flex items-center">
                  <User className="mr-2 text-insurance-blue h-5 w-5" />
                  Personal Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={personalData.firstName}
                      onChange={handlePersonalChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={personalData.lastName}
                      onChange={handlePersonalChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={personalData.email}
                      onChange={handlePersonalChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={personalData.phone}
                      onChange={handlePersonalChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={personalData.zipCode}
                      onChange={handlePersonalChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      placeholder="e.g. 12345"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Driving History
                    </label>
                    <select
                      name="drivingHistory"
                      value={personalData.drivingHistory}
                      onChange={handlePersonalChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      required
                    >
                      <option value="clean">Clean Record</option>
                      <option value="minor">Minor Violations</option>
                      <option value="major">Major Violations</option>
                      <option value="accident">Recent Accidents</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Coverage Options */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-up">
                <h3 className="text-xl font-semibold text-insurance-gray-dark flex items-center">
                  <CheckCircle className="mr-2 text-insurance-blue h-5 w-5" />
                  Coverage Options
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Coverage Type
                    </label>
                    <select
                      name="coverage"
                      value={coverageData.coverage}
                      onChange={handleCoverageChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      required
                    >
                      <option value="basic">Basic (Liability Only)</option>
                      <option value="standard">Standard (Liability + Collision)</option>
                      <option value="premium">Premium (Comprehensive)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Deductible Amount
                    </label>
                    <select
                      name="deductible"
                      value={coverageData.deductible}
                      onChange={handleCoverageChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      required
                    >
                      <option value="250">$250</option>
                      <option value="500">$500</option>
                      <option value="1000">$1,000</option>
                      <option value="2000">$2,000</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-insurance-gray-dark mb-1">
                      Additional Drivers
                    </label>
                    <select
                      name="additionalDrivers"
                      value={coverageData.additionalDrivers}
                      onChange={handleCoverageChange}
                      className="w-full p-3 border border-insurance-gray-light rounded-lg focus:ring-2 focus:ring-insurance-blue/40 focus:border-insurance-blue outline-none"
                      required
                    >
                      <option value="0">0 (Just Me)</option>
                      <option value="1">1 Additional Driver</option>
                      <option value="2">2 Additional Drivers</option>
                      <option value="3+">3+ Additional Drivers</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeRoadside"
                        name="includeRoadside"
                        checked={coverageData.includeRoadside}
                        onChange={handleCoverageChange}
                        className="h-5 w-5 border-insurance-gray rounded text-insurance-blue focus:ring-insurance-blue"
                      />
                      <label
                        htmlFor="includeRoadside"
                        className="ml-3 text-sm font-medium text-insurance-gray-dark"
                      >
                        Include Roadside Assistance ($15/month)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeRental"
                        name="includeRental"
                        checked={coverageData.includeRental}
                        onChange={handleCoverageChange}
                        className="h-5 w-5 border-insurance-gray rounded text-insurance-blue focus:ring-insurance-blue"
                      />
                      <label
                        htmlFor="includeRental"
                        className="ml-3 text-sm font-medium text-insurance-gray-dark"
                      >
                        Include Rental Car Coverage ($10/month)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & Submit */}
            {currentStep === 3 && (
              <div className="animate-fade-up">
                <h3 className="text-xl font-semibold text-insurance-gray-dark mb-6">
                  Review Your Information
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-4 border border-insurance-gray-light">
                    <h4 className="font-medium text-insurance-gray-dark mb-2 flex items-center">
                      <Car className="h-4 w-4 mr-2 text-insurance-blue" />
                      Vehicle Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-insurance-gray">Make:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium capitalize">
                          {vehicleData.make || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Model:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {vehicleData.model || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Year:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {vehicleData.year || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">VIN:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {vehicleData.vin || "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-insurance-gray-light">
                    <h4 className="font-medium text-insurance-gray-dark mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2 text-insurance-blue" />
                      Personal Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-insurance-gray">Name:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {personalData.firstName} {personalData.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Email:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {personalData.email || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Phone:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {personalData.phone || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Zip Code:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {personalData.zipCode || "—"}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-insurance-gray">Driving History:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium capitalize">
                          {personalData.drivingHistory.replace("-", " ") || "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-insurance-gray-light">
                    <h4 className="font-medium text-insurance-gray-dark mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-insurance-blue" />
                      Coverage Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-insurance-gray">Coverage Type:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium capitalize">
                          {coverageData.coverage}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Deductible:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          ${coverageData.deductible}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Additional Drivers:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {coverageData.additionalDrivers}
                        </span>
                      </div>
                      <div>
                        <span className="text-insurance-gray">Add-ons:</span>{" "}
                        <span className="text-insurance-gray-dark font-medium">
                          {coverageData.includeRoadside && "Roadside Assistance"}
                          {coverageData.includeRoadside && coverageData.includeRental && ", "}
                          {coverageData.includeRental && "Rental Coverage"}
                          {!coverageData.includeRoadside && !coverageData.includeRental && "None"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-insurance-blue/10 rounded-lg border border-insurance-blue/20">
                    <p className="text-sm text-insurance-gray-dark">
                      By submitting this form, you agree to our <a href="#" className="text-insurance-blue underline">Privacy Policy</a> and <a href="#" className="text-insurance-blue underline">Terms of Service</a>. Your information will be used only to provide you with a quote and will not be shared with third parties for marketing purposes.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-10">
              {currentStep > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="flex items-center"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={cn(
                    "flex items-center",
                    isSubmitting && "opacity-80 cursor-not-allowed"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Quote Request
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
