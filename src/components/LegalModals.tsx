import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalModalsProps {
  type: "privacy" | "terms";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LegalModals = ({ type, open, onOpenChange }: LegalModalsProps) => {
  const isPrivacy = type === "privacy";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
  className="max-w-[90vw] sm:max-w-[600px] max-h-[85vh] p-0 gap-0 backdrop-blur-xl border border-white/20 overflow-hidden"
  style={{
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  }}
>
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-3 border-b border-white/10">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-white/60">
            Last Updated: January 26, 2026
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-180px)] px-4 sm:px-6 py-3 sm:py-4">
          <div className="space-y-4 sm:space-y-6 text-white/90 text-xs sm:text-sm leading-relaxed">
            {isPrivacy ? <PrivacyPolicyContent /> : <TermsOfServiceContent />}
          </div>
        </ScrollArea>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-white/5 rounded-b-lg">
  <p className="text-xs sm:text-sm text-white/60 text-center">
    Questions? Contact us at{" "}
    <a href="mailto:housingdtu@gmail.com" className="text-primary hover:underline">
      housingdtu@gmail.com
    </a>
  </p>
</div>
      </DialogContent>
    </Dialog>
  );
};

// Privacy Policy Content
const PrivacyPolicyContent = () => (
  <>
    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">1. Information We Collect</h3>
      <p className="mb-3">
        When you use Housing DTU, we collect the following information:
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Personal Information:</strong> Name, email address, phone number when you create an account or list a property</li>
        <li><strong>Property Details:</strong> Property information, images, videos, location data, pricing, and amenities</li>
        <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our platform</li>
        <li><strong>Cookies:</strong> We use cookies for authentication and to improve your experience</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">2. How We Use Your Information</h3>
      <p className="mb-3">We use your information to:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Display property listings on our platform</li>
        <li>Connect tenants with property owners via WhatsApp</li>
        <li>Verify and approve property listings</li>
        <li>Send notifications about your listings or inquiries</li>
        <li>Improve our services and user experience</li>
        <li>Analyze usage patterns through Google Analytics</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">3. Information Sharing</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Public Display:</strong> Property listings, owner contact information, and property details are displayed publicly to help connect tenants and owners</li>
        <li><strong>Admin Team:</strong> Our admin team accesses submitted information for verification purposes</li>
        <li><strong>No Third-Party Sales:</strong> We do not sell your personal data to third parties</li>
        <li><strong>Legal Requirements:</strong> We may share information if required by law</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">4. Data Storage & Security</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Data is stored securely on Supabase servers</li>
        <li>Images and videos are stored in Supabase Storage</li>
        <li>We use SSL encryption to protect data transmission</li>
        <li>Access to user data is restricted to authorized personnel only</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">5. Your Rights</h3>
      <p className="mb-3">You have the right to:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Access:</strong> Request a copy of your personal data</li>
        <li><strong>Update:</strong> Correct or update your information anytime</li>
        <li><strong>Delete:</strong> Request deletion of your account and data</li>
        <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
      </ul>
      <p className="mt-3">
        To exercise these rights, contact us at housingdtu@gmail.com or call +91 8826871082.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">6. Cookies</h3>
      <p>
        We use cookies for authentication and to remember your preferences. You can disable cookies in your browser settings, but this may affect functionality.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">7. Changes to This Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our platform constitutes acceptance of any changes.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">8. Contact Us</h3>
      <p>
        If you have questions about this Privacy Policy, please contact us:
      </p>
      <ul className="list-none pl-0 mt-2 space-y-1">
        <li><strong>Email:</strong> housingdtu@gmail.com</li>
        <li><strong>Phone:</strong> +91 8826871082 / +91 7973930880</li>
      </ul>
    </section>
  </>
);

// Terms of Service Content
const TermsOfServiceContent = () => (
  <>
    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h3>
      <p>
        By accessing and using Housing DTU, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. Users must be 18 years or older, or have guardian consent.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">2. About Housing DTU</h3>
      <p>
        Housing DTU is a student-run platform created to help DTU students find accommodation near campus. We are not a real estate agency, broker, or property management company. We simply connect tenants with property owners.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">3. User Accounts</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>You must provide accurate and complete information when creating an account</li>
        <li>You are responsible for maintaining the security of your account credentials</li>
        <li>One account per user is permitted</li>
        <li>You must notify us immediately of any unauthorized access to your account</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">4. Property Listings</h3>
      <p className="mb-3">Property owners must:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Provide accurate, truthful, and up-to-date information about their property</li>
        <li>Own the property or have explicit permission to list it</li>
        <li>Upload genuine photos and videos of the actual property</li>
        <li>Not post fake, misleading, or fraudulent listings</li>
        <li>Keep pricing and availability information current</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">5. User Conduct</h3>
      <p className="mb-3">Users agree to:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Not engage in harassment, abusive behavior, or discrimination</li>
        <li>Not post spam, misleading information, or fraudulent content</li>
        <li>Not engage in any illegal activities on our platform</li>
        <li>Respect the privacy and rights of other users</li>
        <li>Verify properties in person before making any commitments or payments</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">6. Our Rights</h3>
      <p className="mb-3">Housing DTU reserves the right to:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Remove any listing that violates these terms</li>
        <li>Suspend or terminate user accounts for violations</li>
        <li>Modify or discontinue the platform at any time</li>
        <li>Verify listings before publishing them</li>
        <li>Update these Terms of Service at any time</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">7. Disclaimer of Liability</h3>
      <p className="mb-3"><strong>IMPORTANT:</strong> Housing DTU is a platform that connects users. We:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Are NOT responsible</strong> for the quality, safety, or legality of properties listed</li>
        <li><strong>Do NOT guarantee</strong> the accuracy of information provided by users</li>
        <li><strong>Are NOT liable</strong> for disputes, damages, or issues between tenants and property owners</li>
        <li><strong>Do NOT act</strong> as an agent, broker, or representative of any party</li>
        <li><strong>Strongly recommend</strong> that users verify all information independently and visit properties in person before making commitments</li>
      </ul>
      <p className="mt-3">
        Users engage with property owners at their own risk. Housing DTU is not responsible for any financial loss, property damage, or personal injury resulting from use of our platform.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">8. Zero Commission Policy</h3>
      <p>
        Housing DTU does not charge any commission or fees to list or rent properties. All transactions, negotiations, and payments are made directly between tenants and property owners. We are not involved in any monetary transactions.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">9. Intellectual Property</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Users retain ownership of content they upload (photos, descriptions, etc.)</li>
        <li>By uploading content, users grant Housing DTU a license to display it on our platform</li>
        <li>Housing DTU branding, logo, and platform design are our intellectual property</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">10. Termination</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>We may terminate or suspend accounts that violate these terms</li>
        <li>Users may delete their accounts at any time</li>
        <li>Upon termination, your listings will be removed from our platform</li>
      </ul>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">11. Changes to Terms</h3>
      <p>
        We may update these Terms of Service from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our platform after changes constitutes acceptance of the new terms.
      </p>
    </section>

    <section>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">12. Contact Information</h3>
      <p>
        For questions about these Terms of Service, contact us at:
      </p>
      <ul className="list-none pl-0 mt-2 space-y-1">
        <li><strong>Email:</strong> housingdtu@gmail.com</li>
        <li><strong>Phone:</strong> +91 8826871082 / +91 7973930880</li>
      </ul>
    </section>
  </>
);