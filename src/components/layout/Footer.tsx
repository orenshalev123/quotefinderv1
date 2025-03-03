
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-insurance-gray-lightest border-t border-insurance-gray-light">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl text-insurance-gray-dark mb-6">
              AutoShield
            </h3>
            <p className="text-insurance-gray mb-6 max-w-xs">
              The most trusted auto insurance provider with over 20 years of
              experience protecting drivers nationwide.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook className="h-5 w-5" />} href="#" />
              <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" />
              <SocialLink icon={<Instagram className="h-5 w-5" />} href="#" />
              <SocialLink icon={<Linkedin className="h-5 w-5" />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-insurance-gray-dark mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#" label="About Us" />
              <FooterLink href="#" label="Coverage Options" />
              <FooterLink href="#" label="Claims Process" />
              <FooterLink href="#" label="Customer Reviews" />
              <FooterLink href="#" label="FAQ" />
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-insurance-gray-dark mb-6">
              Coverage
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#" label="Liability Coverage" />
              <FooterLink href="#" label="Collision Coverage" />
              <FooterLink href="#" label="Comprehensive Coverage" />
              <FooterLink href="#" label="Uninsured Motorist" />
              <FooterLink href="#" label="Medical Payments" />
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-insurance-gray-dark mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-insurance-blue mr-3 mt-0.5" />
                <span className="text-insurance-gray">
                  123 Insurance Way, Safety City, CA 94123
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-insurance-blue mr-3" />
                <span className="text-insurance-gray">(800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-insurance-blue mr-3" />
                <span className="text-insurance-gray">
                  support@autoshield.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-insurance-gray-light flex flex-col md:flex-row justify-between items-center">
          <p className="text-insurance-gray text-sm mb-4 md:mb-0">
            © {currentYear} AutoShield Insurance. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-insurance-gray hover:text-insurance-blue text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-insurance-gray hover:text-insurance-blue text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-insurance-gray hover:text-insurance-blue text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    className="bg-white p-2 rounded-full text-insurance-gray hover:text-insurance-blue shadow-sm hover:shadow transition-all"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <a
      href={href}
      className="text-insurance-gray hover:text-insurance-blue transition-colors"
    >
      {label}
    </a>
  </li>
);

export default Footer;
