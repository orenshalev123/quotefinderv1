
import ArticleLayout from "@/components/layout/ArticleLayout";
import { useEffect } from "react";
import { generateVercelOGTags } from "@/integrations/contentful/vercelSourceMaps";

const AfterAccident = () => {
  // Add Vercel content source mapping
  useEffect(() => {
    // This is a hardcoded article ID that would match the one in Contentful
    const contentfulEntryId = "after-accident";
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
      title="What to Do After a Car Accident"
      category="Safety Tips"
    >
      <p>
        Being involved in a car accident can be disorienting and stressful. Knowing what steps to take immediately following an accident can help protect your safety, legal rights, and insurance claim. Here's a comprehensive guide on what to do after a car accident.
      </p>
      
      <h2>1. Ensure Safety First</h2>
      <p>
        Your immediate priority should be safety:
      </p>
      <ul>
        <li>Check yourself and passengers for injuries</li>
        <li>Move to a safe location if possible (e.g., the shoulder of the road)</li>
        <li>Turn on hazard lights</li>
        <li>Use cones, warning triangles, or flares if available</li>
        <li>Don't leave the scene of the accident</li>
      </ul>
      
      <h2>2. Call Emergency Services</h2>
      <p>
        Call 911 if there are any injuries or significant property damage. In many states, calling the police is legally required when an accident occurs. The police report will be valuable documentation for your insurance claim.
      </p>
      
      <h2>3. Exchange Information</h2>
      <p>
        Exchange the following information with the other driver(s) involved:
      </p>
      <ul>
        <li>Full name and contact information</li>
        <li>Insurance company name and policy number</li>
        <li>Driver's license number</li>
        <li>License plate number</li>
        <li>Vehicle make, model, and year</li>
        <li>Location of the accident</li>
      </ul>
      
      <h2>4. Document the Scene</h2>
      <p>
        Thoroughly document the accident scene:
      </p>
      <ul>
        <li>Take photos of all vehicles from multiple angles, showing the damage</li>
        <li>Photograph the entire accident scene, including road conditions, traffic signs, and weather conditions</li>
        <li>Take notes about what happened</li>
        <li>Get contact information from witnesses</li>
      </ul>
      
      <h2>5. Report the Accident to Your Insurance Company</h2>
      <p>
        Notify your insurance company about the accident as soon as possible, even if you weren't at fault. Many policies require immediate reporting and full cooperation. Provide the facts but avoid admitting fault.
      </p>
      
      <h2>6. Seek Medical Attention</h2>
      <p>
        See a doctor even if you don't think you're injured. Some injuries, like whiplash or internal bleeding, may not be immediately apparent. Medical documentation is also crucial for insurance claims.
      </p>
      
      <h2>7. Keep Track of Your Expenses</h2>
      <p>
        Save all receipts and documents related to the accident, including:
      </p>
      <ul>
        <li>Medical bills and records</li>
        <li>Car repair estimates and bills</li>
        <li>Rental car receipts</li>
        <li>Documentation of lost wages if you miss work</li>
      </ul>
      
      <h2>8. File Your Insurance Claim</h2>
      <p>
        Work with your insurance adjuster to file your claim. Provide all documentation you've collected. Be honest and thorough in describing what happened.
      </p>
      
      <h2>9. Consider Consulting an Attorney</h2>
      <p>
        If there are serious injuries, disputed fault, or your insurance company is not offering fair compensation, consult with an attorney who specializes in car accidents.
      </p>
      
      <h2>10. Follow Up on Your Claim</h2>
      <p>
        Stay in communication with your insurance company about the status of your claim. Keep notes of all conversations, including the date, time, and the name of the person you spoke with.
      </p>
      
      <p>
        Being prepared and knowing these steps can make a stressful situation more manageable and help ensure you receive fair compensation for any damages or injuries.
      </p>
    </ArticleLayout>
  );
};

export default AfterAccident;
