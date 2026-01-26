import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const faqs = [
    {
      question: "How does Housing DTU work?",
      answer: "Housing DTU is a student-built platform that connects DTU students with verified PGs, flats, and roommates near campus. Simply browse listings, filter by your preferences (price, location, amenities), and contact property owners directly via WhatsApp. For property owners, you can list your PG or flat for free, and our admin team will review and approve it within 24-48 hours"
    },
     {
      question: "How do I list my property on Housing DTU?",
      answer: "To list your property, simply create an account, navigate to the “List Property” page, and fill out the required details. Upload photos and submit your listing for review."
    },
    {
      question: "Is there any charge for listing my property?",
      answer: "No! Listing your PG or flat on Housing DTU is completely free. We believe in helping students find affordable housing without any extra costs. Simply fill out the listing form with your property details, upload photos, and our team will verify and publish it."
    },
    {
      question: "How do I contact property owners?",
      answer: "Each property listing includes a WhatsApp button that lets you connect directly with the owner or landlord. Click the button to start a conversation, ask questions, schedule visits, and negotiate terms—all through WhatsApp for your convenience."
    },
    {
      question: "Are the properties verified?",
      answer: "Yes! Every property submitted goes through our admin review process. Our team verifies the details, checks photos and location information, and ensures listings meet our quality standards before they go live. However, we always recommend visiting the property in person before making any commitments."
    },
    {
      question: "Can I find roommates on this platform?",
      answer: "Absolutely! Our FIND FLATMATES feature helps you connect with other DTU students looking for roommates. You can post your requirements (budget, preferred location, lifestyle preferences) and browse posts from others. It's a great way to find like-minded people to share a flat with and split costs."
    },
    {
      question: "What if I face issues with a property or listing?",
      answer: "If you encounter any problems with a listing, property, or transaction, please contact us immediately at housingdtu@gmail.com or call us at +91 8826871082 / +91 7973930880. We take all concerns seriously and will work to resolve issues promptly. While we verify listings, we recommend conducting your own due diligence before finalizing any agreements."
    }
    // {
    //   question: "Can I use AI Fiesta on my phone?",
    //   answer: "Yes! You can use AI Fiesta in your mobile browser at chat.aifiesta.ai or install our dedicated apps — Android and iOS — to access the platform anytime, anywhere."
    // },
    // {
    //   question: "Will I get free upgrades when new AI versions are released?",
    //   answer: "Yes! If ChatGPT releases Model 6 or another AI provider launches a higher version, you will get access at no extra cost."
    // }
  ];

  const toggleAccordion = (index: number) => {
    if (openIndexes.includes(index)) {
      // Close this FAQ
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      // Open this FAQ (keeping others open)
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section id="faq" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-background to-blue-900/10"></div>
      
     <div className="container mx-auto px-6 sm:px-8 md:px-4 relative z-10">
        <div className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12 px-4">
  Frequently Asked Questions (FAQs)
</h2>
          
          {/* Single container with enhanced blurry glass effect */}
          <div 
  className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/20"
  style={{
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  }}
>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${index !== 0 ? 'border-t border-white/10' : ''}`}
              >
                <button
  onClick={() => toggleAccordion(index)}
  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left transition-all duration-300 hover:bg-white/5"
>
  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white pr-4 sm:pr-6 md:pr-8 leading-snug">
    {faq.question}
  </h3>
  <ChevronDown
    className={`w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 transition-transform duration-300 ${
      openIndexes.includes(index) ? 'rotate-180' : ''
    }`}
  />
</button>
                
               <div
  className={`overflow-hidden transition-all duration-300 ease-in-out ${
    openIndexes.includes(index) ? 'max-h-[500px] sm:max-h-96' : 'max-h-0'
  }`}
>
  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-2">
    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
      {faq.answer}
    </p>
  </div>
</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;