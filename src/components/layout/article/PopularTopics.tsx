
import { Link } from "react-router-dom";

const PopularTopics = () => {
  return (
    <div className="bg-white border border-gray-200 rounded mb-6">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-200 text-insurance-gray-dark">Popular Topics</h3>
      <div className="p-4 flex flex-wrap gap-2">
        <Link 
          to="/categories/coverage-information"
          className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
        >
          Coverage
        </Link>
        <Link 
          to="/categories/money-saving-tips"
          className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
        >
          Savings
        </Link>
        <Link 
          to="/categories/claims"
          className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
        >
          Claims
        </Link>
        <Link 
          to="/categories/drivers"
          className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
        >
          Young Drivers
        </Link>
        <Link 
          to="/categories/vehicles"
          className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
        >
          Vehicles
        </Link>
      </div>
    </div>
  );
};

export default PopularTopics;
