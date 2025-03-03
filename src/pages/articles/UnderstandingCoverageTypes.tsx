
import ArticleLayout from "@/components/layout/ArticleLayout";
import { useEffect } from "react";
import { generateVercelOGTags } from "@/integrations/contentful/vercelSourceMaps";

const UnderstandingCoverageTypes = () => {
  // Add Vercel content source mapping
  useEffect(() => {
    // This is a hardcoded article ID that would match the one in Contentful
    const contentfulEntryId = "understanding-coverage-types";
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
      title="Understanding Auto Insurance Coverage Types"
      category="Coverage Information"
    >
      <p>
        Auto insurance policies consist of several different coverage types, each designed to protect you in specific situations. Understanding these coverages is essential for making informed decisions about your policy.
      </p>
      
      <h2>Liability Coverage</h2>
      <p>
        Liability coverage is mandatory in most states and pays for injuries and property damage you cause to others in an accident. It's typically split into two components:
      </p>
      <ul>
        <li><strong>Bodily Injury Liability:</strong> Covers medical expenses, lost wages, and legal costs if you injure someone in an accident.</li>
        <li><strong>Property Damage Liability:</strong> Pays for damage you cause to another person's property, including their vehicle.</li>
      </ul>
      
      <h2>Collision Coverage</h2>
      <p>
        Collision coverage pays for damage to your vehicle resulting from a collision with another vehicle or object, regardless of who's at fault. If you have a loan or lease, your lender will likely require this coverage.
      </p>
      
      <h2>Comprehensive Coverage</h2>
      <p>
        Comprehensive coverage handles damage to your car from non-collision incidents, such as:
      </p>
      <ul>
        <li>Theft</li>
        <li>Vandalism</li>
        <li>Natural disasters</li>
        <li>Falling objects</li>
        <li>Animal collisions</li>
      </ul>
      
      <h2>Personal Injury Protection (PIP)</h2>
      <p>
        PIP covers medical expenses for you and your passengers regardless of fault. It may also cover lost wages and essential services. PIP is required in no-fault insurance states.
      </p>
      
      <h2>Uninsured/Underinsured Motorist Coverage</h2>
      <p>
        This coverage protects you if you're in an accident with a driver who either has no insurance or insufficient coverage to pay for your damages. It can cover both bodily injury and property damage.
      </p>
      
      <h2>Medical Payments Coverage</h2>
      <p>
        Medical payments coverage, or MedPay, pays for medical expenses for you and your passengers after an accident, regardless of fault. It's similar to PIP but typically has lower limits and fewer benefits.
      </p>
      
      <h2>Choosing the Right Coverage</h2>
      <p>
        When selecting coverage types and limits, consider:
      </p>
      <ul>
        <li>Your state's minimum requirements</li>
        <li>The value of your assets that could be at risk in a lawsuit</li>
        <li>The value of your vehicle</li>
        <li>Your health insurance coverage</li>
        <li>Your budget for premiums</li>
      </ul>
      
      <p>
        Remember that while higher coverage limits and additional coverages increase your premium, they provide greater financial protection when you need it most.
      </p>
    </ArticleLayout>
  );
};

export default UnderstandingCoverageTypes;
