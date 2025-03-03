
import ArticleLayout from "@/components/layout/ArticleLayout";
import { useEffect } from "react";
import { generateVercelOGTags } from "@/integrations/contentful/vercelSourceMaps";

const ComprehensiveVsCollision = () => {
  // Add Vercel content source mapping
  useEffect(() => {
    // This is a hardcoded article ID that would match the one in Contentful
    const contentfulEntryId = "comprehensive-vs-collision";
    const tags = generateVercelOGTags(contentfulEntryId);
    
    // Add metadata tags to document head
    document.querySelectorAll('meta[name^="vercel-"]').forEach(tag => tag.remove());
    
    const head = document.querySelector('head');
    if (head) {
      Object.entries(tags).forEach(([name, content]) => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        head.appendChild(meta);
      });
    }
  }, []);

  return (
    <ArticleLayout 
      title="Comprehensive vs. Collision Coverage"
      category="Coverage Information"
    >
      <p>
        Two of the most important optional coverages in auto insurance are comprehensive and collision. Understanding the differences between these coverages can help you make informed decisions about your policy.
      </p>
      
      <h2>Collision Coverage: When Your Car Hits Something</h2>
      <p>
        Collision coverage pays for damage to your vehicle when it collides with another vehicle or object, regardless of who is at fault. This coverage is particularly valuable in scenarios such as:
      </p>
      <ul>
        <li>A collision with another vehicle</li>
        <li>Hitting a stationary object like a tree, pole, or guardrail</li>
        <li>Rolling your vehicle</li>
        <li>Single-car accidents involving potholes or road damage</li>
      </ul>
      
      <p>
        If you're in an accident caused by another driver, your collision coverage will pay for your vehicle repairs, and then your insurance company may seek reimbursement from the at-fault driver's insurance (a process called subrogation).
      </p>
      
      <h2>Comprehensive Coverage: When Something Happens to Your Car</h2>
      <p>
        Comprehensive coverage handles damage to your vehicle from events that are not collisions and generally outside your control. It covers:
      </p>
      <ul>
        <li>Theft or vandalism</li>
        <li>Fire damage</li>
        <li>Weather-related incidents (hail, flooding, falling trees during storms)</li>
        <li>Natural disasters</li>
        <li>Collisions with animals</li>
        <li>Broken windshield or glass damage</li>
        <li>Falling objects</li>
      </ul>
      
      <h2>Key Differences</h2>
      
      <table className="w-full border-collapse border border-gray-300 my-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Feature</th>
            <th className="border border-gray-300 p-2 text-left">Collision</th>
            <th className="border border-gray-300 p-2 text-left">Comprehensive</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Covers</td>
            <td className="border border-gray-300 p-2">Accidents involving your vehicle and another vehicle or object</td>
            <td className="border border-gray-300 p-2">Non-collision events like theft, weather, vandalism, animal collisions</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Fault Consideration</td>
            <td className="border border-gray-300 p-2">Pays regardless of fault</td>
            <td className="border border-gray-300 p-2">Fault usually not applicable</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Typical Cost</td>
            <td className="border border-gray-300 p-2">Usually more expensive</td>
            <td className="border border-gray-300 p-2">Usually less expensive</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Deductible</td>
            <td className="border border-gray-300 p-2">Applies to each claim</td>
            <td className="border border-gray-300 p-2">Applies to each claim (some glass claims may have no deductible)</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Do You Need Both Coverages?</h2>
      <p>
        If you have a newer vehicle or one that still has significant value, having both coverages provides the most complete protection for your investment. Both comprehensive and collision are typically required if you have a car loan or lease.
      </p>
      
      <p>
        However, as your car ages and its value decreases, you might consider whether the cost of these coverages is worth it. A general rule of thumb is to consider dropping them when the annual premium for these coverages exceeds 10% of your car's value.
      </p>
      
      <h2>Choosing Your Deductible</h2>
      <p>
        Both comprehensive and collision coverage come with deductibles—the amount you pay out of pocket before your insurance covers the rest. Higher deductibles mean lower premiums, but more out-of-pocket expenses when you file a claim.
      </p>
      
      <p>
        When choosing your deductible, consider:
      </p>
      <ul>
        <li>Your emergency fund and ability to pay the deductible if needed</li>
        <li>The value of your vehicle</li>
        <li>Your driving habits and risk factors in your area</li>
        <li>The difference in premium costs between deductible options</li>
      </ul>
      
      <p>
        Understanding the differences between comprehensive and collision coverage helps you make informed decisions about your auto insurance and ensures you have the right protection for your specific situation.
      </p>
    </ArticleLayout>
  );
};

export default ComprehensiveVsCollision;
