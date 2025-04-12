import Image from 'next/image';
import { useState } from 'react';

interface CardType {
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface CardTypesData {
  [key: string]: CardType;
}

export default function CardTypes() {
  const [activeTab, setActiveTab] = useState<string>('payment');
  
  const cardTypes: CardTypesData = {
    payment: {
      title: "Payment Cards",
      description: "Securely store and use your credit, debit, and prepaid cards for contactless payments, online purchases, and in-store transactions.",
      features: ["Tokenized payment security", "Instant payment notifications", "Spending analytics", "Multiple currency support"],
      image: "/payment-cards.png"
    },
    business: {
      title: "Business Cards",
      description: "Manage corporate expenses, track business spending, and simplify expense reporting with dedicated business cards.",
      features: ["Receipt capture and management", "Expense categorization", "Team spending controls", "Integration with accounting software"],
      image: "/business-cards.png"
    },
    loyalty: {
      title: "Loyalty Cards",
      description: "Store all your loyalty and reward cards in one place. Never miss points or rewards again.",
      features: ["Automatic points tracking", "Reward notifications", "Membership status display", "Digital stamp cards"],
      image: "/loyalty-cards.png"
    },
    membership: {
      title: "Membership Cards",
      description: "Keep all your club, gym, and association memberships organized in your digital wallet for easy access.",
      features: ["Membership status tracking", "Renewal reminders", "Digital verification", "Membership benefits display"],
      image: "/membership-cards.png"
    },
    id: {
      title: "ID Cards",
      description: "Securely store digital versions of your identification cards with selective information sharing capabilities.",
      features: ["Government ID storage", "Privacy controls", "Biometric verification", "Selective information sharing"],
      image: "/id-cards.png"
    },
    event: {
      title: "Event Cards",
      description: "Store tickets for concerts, sports events, movies, and other occasions digitally with easy access when needed.",
      features: ["QR code tickets", "Event reminders", "Venue directions", "Ticket sharing options"],
      image: "/event-cards.png"
    },
    access: {
      title: "Access Cards",
      description: "Digital keys for your home, office, hotel rooms, and secure locations - all accessible from your phone.",
      features: ["Secure digital access keys", "Temporary access sharing", "Access history log", "Remote access management"],
      image: "/access-cards.png"
    }
  };
  
  const tabs = [
    { id: 'payment', label: 'Payment' },
    { id: 'business', label: 'Business' },
    { id: 'loyalty', label: 'Loyalty' },
    { id: 'membership', label: 'Membership' },
    { id: 'id', label: 'ID Cards' },
    { id: 'event', label: 'Event' },
    { id: 'access', label: 'Access' },
  ];
  
  const activeCard = cardTypes[activeTab];

  return (
    <section id="cards" className="section relative overflow-hidden">
      {/* Background patterns */}
      <div className="grid-pattern opacity-20"></div>
      <div className="absolute bottom-40 left-10 w-60 h-60 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.1)] to-transparent blur-[100px]"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="section-title">
          All Your <span className="gradient-text">Cards</span> in One Place
        </h2>
        <p className="section-subtitle">
          WaoCard manages all your digital cards in one secure application
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-[rgba(0,0,0,0.2)] rounded-xl backdrop-blur-sm w-full max-w-4xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative text-sm md:text-base
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-br from-[#FF9500] to-[#E08600] text-white' 
                    : 'glass-panel text-white hover:border-[rgba(255,149,0,0.3)]'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {activeTab === tab.id && (
                  <div className="absolute -inset-[2px] bg-[rgba(255,149,0,0.3)] rounded-lg blur-md -z-10"></div>
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
            {/* Decorative glow element */}
            <div className="absolute -left-10 top-10 w-40 h-40 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.1)] to-transparent blur-3xl"></div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-6">{activeCard.title}</h3>
            <p className="text-[rgba(255,255,255,0.8)] mb-8">{activeCard.description}</p>
            
            <ul className="space-y-5">
              {activeCard.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[rgba(255,149,0,0.2)] text-[#FF9500] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-[rgba(255,255,255,0.9)]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative order-1 md:order-2">
            <div className="glass-panel relative border border-[rgba(255,255,255,0.1)] h-[400px] rounded-2xl flex items-center justify-center p-6 overflow-hidden">
              {/* Glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(255,149,0,0.1)] via-transparent to-[rgba(255,149,0,0.05)] rounded-2xl blur-sm"></div>
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-gradient-to-t from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              
              {/* Floating particle effects */}
              <div className="absolute inset-0 dot-pattern opacity-30"></div>
              
              {/* Card image with glow */}
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-[rgba(255,149,0,0.2)] to-transparent rounded-full blur-2xl opacity-70"></div>
                <Image
                  src={activeCard.image || "/card-placeholder.png"}
                  alt={activeCard.title}
                  width={300}
                  height={200}
                  className="object-contain drop-shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative diagonal line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
    </section>
  );
}