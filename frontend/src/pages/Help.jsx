import React, { useState } from 'react';

const Help = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship globally. International shipping is calculated at checkout based on your location. Please note that customers are responsible for any local customs duties or taxes."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return window for all items in original condition. Simply reach out to our support team to initiate a return. Return shipping costs are the responsibility of the customer unless the item arrived defective."
    },
    {
      question: "How do I care for wooden desk organizers?",
      answer: "Our solid wood products are treated with a natural matte finish. Wipe them down with a dry or slightly damp microfiber cloth. Avoid harsh chemical cleaners or prolonged exposure to direct, intense sunlight."
    },
    {
      question: "Are your artisan keycaps compatible with my keyboard?",
      answer: "Our keycaps are strictly designed for standard Cherry MX style switches (and clones). They will not fit low-profile switches or ALPS switches."
    },
    {
      question: "When will out-of-stock items return?",
      answer: "Because many of our items are machined or hand-finished in small batches, restocks typically take 4-6 weeks. We highly recommend joining our newsletter to be notified immediately when drops happen."
    }
  ];

  return (
    <main className="min-h-[calc(100vh-89px)] bg-creator-white text-creator-black max-w-4xl mx-auto px-8 py-16 md:py-24">
      
      <div className="text-center mb-16 border-b border-creator-border pb-12">
        <h1 className="text-3xl font-light tracking-tight mb-4">Help & FAQ</h1>
        <p className="text-sm text-creator-muted max-w-lg mx-auto">
          Find answers to common questions about shipping, returns, and product care. Can't find what you're looking for? Reach out to us directly.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-creator-border bg-creator-surface"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full text-left px-6 py-5 flex justify-between items-center outline-none"
            >
              <span className="font-medium text-sm">{faq.question}</span>
              <span className="text-creator-muted text-xl leading-none">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 pb-6 text-sm text-creator-muted leading-relaxed border-t border-creator-border pt-4 mx-6">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-creator-muted mb-4">Still need assistance?</p>
        <a 
          href="/contact" 
          className="inline-block border border-creator-black px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-creator-black hover:text-creator-white transition-colors"
        >
          Contact Support
        </a>
      </div>

    </main>
  );
};

export default Help;