
import { Shield, CreditCard, Clock, Phone } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

const BenefitItem = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => (
  <AnimatedCard
    className="h-full flex flex-col items-start"
    delay={delay}
    direction="up"
  >
    <div className="p-3 bg-insurance-blue/10 rounded-lg mb-4">
      <Icon className="h-6 w-6 text-insurance-blue" strokeWidth={2} />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-insurance-gray-dark">
      {title}
    </h3>
    <p className="text-insurance-gray text-sm">{description}</p>
  </AnimatedCard>
);

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Coverage",
      description:
        "Our policies offer complete protection for your vehicle against all types of damage and liability.",
    },
    {
      icon: CreditCard,
      title: "Affordable Rates",
      description:
        "Get the best coverage at competitive prices tailored to your specific needs and budget.",
    },
    {
      icon: Clock,
      title: "Quick Claims Process",
      description:
        "Our streamlined claims process ensures you get back on the road as quickly as possible.",
    },
    {
      icon: Phone,
      title: "24/7 Customer Support",
      description:
        "Our dedicated team is always available to assist you whenever you need help.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-3">
          Why Choose Us
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-insurance-gray-dark">
          Benefits of Our Auto Insurance
        </h2>
        <p className="text-insurance-gray max-w-2xl mx-auto">
          We provide the best coverage options tailored to your needs, ensuring
          you're protected on every journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            delay={index + 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
