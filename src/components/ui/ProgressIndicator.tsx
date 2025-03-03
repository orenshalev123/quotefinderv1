
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator = ({
  steps,
  currentStep,
  className,
}: ProgressIndicatorProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center",
              index > 0 && "ml-4",
              index < steps.length - 1 && "mr-4"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300",
                index < currentStep
                  ? "bg-insurance-blue text-white"
                  : index === currentStep
                  ? "bg-insurance-blue/90 text-white ring-4 ring-insurance-blue/20"
                  : "bg-insurance-gray-light text-insurance-gray-dark"
              )}
            >
              {index < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium transition-colors duration-300",
                index <= currentStep
                  ? "text-insurance-gray-dark"
                  : "text-insurance-gray"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="relative h-1.5 w-full bg-insurance-gray-light rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-insurance-blue transition-all duration-500 ease-in-out rounded-full"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
