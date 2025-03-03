
import React from 'react';
import ArticleLayout from "@/components/layout/ArticleLayout";
import { useParams, useSearchParams, Navigate } from 'react-router-dom';

const QuoteFinderArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const preview = searchParams.get('preview') === 'true';
  
  // We'll determine which content to display based on the slug
  // This could be expanded to include more articles
  const articleContent = getArticleContent(slug);
  
  if (!articleContent) {
    return <Navigate to="/404" />;
  }

  return (
    <ArticleLayout 
      title={articleContent.title}
      category="Insurance"
      author="QuoteFinder"
      readTime="5 min read"
    >
      {preview && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
          <p className="font-medium text-amber-800">Preview Mode</p>
          <p className="text-sm text-amber-700">
            This is a preview of the content. Some elements may not be fully published.
          </p>
        </div>
      )}
      
      <div className="article-content prose prose-lg max-w-none">
        {/* Begin QuoteFinder Article Content */}
        <h1>Understanding Auto Insurance: A Complete Guide</h1>
        
        <p>
          Auto insurance is a critical financial protection that every driver needs. 
          This comprehensive guide will help you understand the different types of coverage, 
          how premiums are calculated, and how to find the best insurance for your needs.
        </p>
        
        <h2>Types of Auto Insurance Coverage</h2>
        
        <p>
          There are several types of auto insurance coverage, each serving a specific purpose:
        </p>
        
        <h3>Liability Coverage</h3>
        <p>
          Liability coverage is typically split into two parts:
        </p>
        <ul>
          <li><strong>Bodily Injury Liability:</strong> Covers costs associated with injuries or death that you cause to others while driving.</li>
          <li><strong>Property Damage Liability:</strong> Pays for damage you cause to another person's property while driving.</li>
        </ul>
        
        <h3>Collision Coverage</h3>
        <p>
          Collision coverage pays for damage to your vehicle when you hit another vehicle or object, regardless of who is at fault. This coverage typically comes with a deductible.
        </p>
        
        <h3>Comprehensive Coverage</h3>
        <p>
          Comprehensive coverage handles damage to your vehicle caused by events other than collisions, such as:
        </p>
        <ul>
          <li>Theft</li>
          <li>Vandalism</li>
          <li>Natural disasters</li>
          <li>Falling objects</li>
          <li>Animal collisions</li>
          <li>Fire</li>
        </ul>
        
        <h3>Personal Injury Protection (PIP)</h3>
        <p>
          PIP covers medical expenses for you and your passengers, regardless of who caused the accident. It may also cover lost wages and other related expenses.
        </p>
        
        <h3>Uninsured/Underinsured Motorist Coverage</h3>
        <p>
          This coverage protects you when you're in an accident with a driver who either has no insurance or insufficient coverage to pay for your damages and injuries.
        </p>
        
        <h2>Factors That Affect Your Premium</h2>
        
        <p>Insurance companies consider several factors when calculating your premium:</p>
        
        <h3>Driving Record</h3>
        <p>
          Your history of accidents, tickets, and claims significantly impacts your rates. Safe drivers with clean records typically pay less.
        </p>
        
        <h3>Vehicle Type</h3>
        <p>
          The make, model, year, and value of your vehicle affect your rates. More expensive cars and those with higher repair costs typically cost more to insure.
        </p>
        
        <h3>Location</h3>
        <p>
          Where you live and park your car influences your premium. Urban areas with higher traffic density and crime rates generally have higher premiums.
        </p>
        
        <h3>Credit Score</h3>
        <p>
          In most states, insurers use credit information to predict the likelihood of you filing a claim. A higher credit score often results in lower premiums.
        </p>
        
        <h3>Age and Driving Experience</h3>
        <p>
          Younger, less experienced drivers typically pay more for insurance due to higher accident rates within this demographic.
        </p>
        
        <h2>How to Save on Auto Insurance</h2>
        
        <h3>Bundle Policies</h3>
        <p>
          Combine your auto insurance with homeowners or renters insurance from the same company to receive a multi-policy discount.
        </p>
        
        <h3>Raise Your Deductible</h3>
        <p>
          Increasing your deductible can lower your premium, but be sure you can afford to pay the higher deductible if you need to make a claim.
        </p>
        
        <h3>Ask About Discounts</h3>
        <p>
          Many insurers offer discounts for:
        </p>
        <ul>
          <li>Safe driving records</li>
          <li>Low annual mileage</li>
          <li>Vehicle safety features</li>
          <li>Professional organizations or alumni groups</li>
          <li>Good student discounts</li>
          <li>Defensive driving courses</li>
        </ul>
        
        <h3>Shop Around</h3>
        <p>
          Different insurance companies use different formulas to calculate risk, so you may find significant price variations among providers for the same coverage.
        </p>
        
        <h2>When to Update Your Coverage</h2>
        
        <p>
          Review your auto insurance policy annually and whenever major life events occur, such as:
        </p>
        <ul>
          <li>Purchasing a new vehicle</li>
          <li>Moving to a new location</li>
          <li>Adding drivers to your household</li>
          <li>Significant changes in your credit score</li>
          <li>Major changes in the value of your car</li>
          <li>Changes in your driving habits or annual mileage</li>
        </ul>
        
        <h2>Understanding Your Policy</h2>
        
        <p>
          Auto insurance policies can be confusing. Here are some key terms to understand:
        </p>
        
        <h3>Premium</h3>
        <p>
          The amount you pay for your insurance coverage, typically in monthly, semi-annual, or annual payments.
        </p>
        
        <h3>Deductible</h3>
        <p>
          The amount you must pay out-of-pocket before your insurance coverage kicks in.
        </p>
        
        <h3>Coverage Limits</h3>
        <p>
          The maximum amount your policy will pay for a covered loss, usually expressed as a per-person and per-accident limit.
        </p>
        
        <h3>Exclusions</h3>
        <p>
          Specific situations or circumstances that your policy does not cover.
        </p>
        
        <h2>Finding the Right Insurance Provider</h2>
        
        <p>
          When shopping for auto insurance, consider these factors:
        </p>
        
        <h3>Financial Stability</h3>
        <p>
          Look for companies with strong financial ratings from agencies like A.M. Best, Moody's, or Standard & Poor's.
        </p>
        
        <h3>Customer Service and Claims Handling</h3>
        <p>
          Research customer reviews and satisfaction ratings to gauge how well a company handles claims and customer service.
        </p>
        
        <h3>Coverage Options</h3>
        <p>
          Ensure the insurer offers the specific coverage types and limits you need.
        </p>
        
        <h3>Technology and Convenience</h3>
        <p>
          Many insurers now offer mobile apps, online policy management, and other digital tools that make managing your policy more convenient.
        </p>
        
        <h2>Conclusion</h2>
        
        <p>
          Auto insurance is a necessary expense for all drivers, but understanding how it works can help you make informed decisions about your coverage. By properly assessing your needs, comparing options, and taking advantage of available discounts, you can secure adequate protection at a reasonable price.
        </p>
        
        <p>
          Remember that the cheapest policy isn't always the best value. Focus on finding coverage that provides the protection you need at a price you can afford.
        </p>
      </div>
    </ArticleLayout>
  );
};

// A simple function to get article content based on the slug
// This could be expanded to include more articles or fetch from a local JSON file
const getArticleContent = (slug?: string) => {
  // Default article if no slug is provided or if the slug doesn't match any articles
  const defaultArticle = {
    id: "quotefinder-auto-insurance-guide",
    title: "Understanding Auto Insurance: A Complete Guide",
    slug: "auto-insurance-guide",
    category: "Insurance",
    author: "QuoteFinder",
    readTime: "5 min read"
  };
  
  // In a real app, you could have multiple articles and return the one matching the slug
  const articles = {
    "auto-insurance-guide": defaultArticle,
    // Add more articles as needed
  };
  
  return slug ? articles[slug as keyof typeof articles] || defaultArticle : defaultArticle;
};

export default QuoteFinderArticle;
