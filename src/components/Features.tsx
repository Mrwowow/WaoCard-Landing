import { useState, useEffect } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function Features() {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this data from an API or import it
    setFeatures([
      {
        icon: "💳",
        title: "Digital Wallet Management",
        description: "Securely store payment cards, loyalty cards, and digital tickets in one place, with quick access to your most used cards."
      },
      {
        icon: "📱",
        title: "Contactless & QR Payments",
        description: "Make quick payments using NFC or QR codes, with offline transaction capability for areas with limited connectivity."
      },
      {
        icon: "👥",
        title: "Peer-to-Peer Transfers",
        description: "Send money directly to friends and family via phone number, username, or QR code in multiple currencies."
      },
      {
        icon: "🔄",
        title: "Mobile Money Integration",
        description: "Direct integration with popular mobile money services like M-Pesa, Orange Money, and MTN Mobile Money."
      },
      {
        icon: "🪪",
        title: "Digital ID Management",
        description: "Secure storage for digital versions of identification documents with selective information sharing."
      },
      {
        icon: "📊",
        title: "Transaction History",
        description: "Comprehensive record of all financial activities with searchable and filterable transaction list."
      }
    ]);
  }, []);

  return (
    <section id="features" className="section relative overflow-hidden">
      {/* Background patterns */}
      <div className="grid-pattern opacity-20"></div>
      <div className="absolute top-40 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.15)] to-transparent blur-[80px]"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gradient-to-l from-[rgba(255,149,0,0.1)] to-transparent blur-[100px]"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="section-title">
          Features That <span className="gradient-text">Empower</span>
        </h2>
        <p className="section-subtitle">
          WaoCard is designed with African markets in mind, providing solutions that work with or without internet connectivity.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-8 overflow-hidden">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-[rgba(255,255,255,0.7)]">{feature.description}</p>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative diagonal line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
      </div>
    </section>
  );
}