import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BusinessTool {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
}

export default function Business() {
  const [activeTab, setActiveTab] = useState<string>('expense');
  
  const benefits: Benefit[] = [
    {
      icon: "💼",
      title: "Business Card Management",
      description: "Issue and control corporate cards for your employees with spending limits and restrictions."
    },
    {
      icon: "📊",
      title: "Expense Tracking",
      description: "Automated expense categorization and reporting for simpler accounting and reconciliation."
    },
    {
      icon: "🏪",
      title: "Merchant Services",
      description: "Accept WaoCard payments in your business with low transaction fees and fast settlement."
    },
    {
      icon: "🔒",
      title: "Secure Transactions",
      description: "Enterprise-grade security with fraud protection and real-time transaction monitoring."
    }
  ];
  
  const businessTools: BusinessTool[] = [
    {
      id: 'expense',
      name: 'Expense Management',
      icon: '💳',
      description: 'Comprehensive corporate card and expense management system for businesses of all sizes',
      features: [
        'Issue virtual and physical cards to employees',
        'Set spending limits and category restrictions',
        'Real-time transaction tracking and approvals',
        'Automated receipt capture and matching'
      ]
    },
    {
      id: 'store',
      name: 'Store Cards',
      icon: '🏬',
      description: 'Create branded store cards that your customers can add to their WaoCard wallet',
      features: [
        'Customizable branded card design',
        'In-store and online payment options',
        'Integrated promotional campaigns',
        'Customer spending analytics dashboard'
      ]
    },
    {
      id: 'gift',
      name: 'Gift Cards',
      icon: '🎁',
      description: 'Digital gift card solution that simplifies giving and receiving',
      features: [
        'Customizable gift card templates',
        'Scheduled delivery options',
        'Balance tracking and management',
        'Integration with loyalty programs'
      ]
    },
    {
      id: 'loyalty',
      name: 'Loyalty Programs',
      icon: '⭐',
      description: 'Build customer relationships with a powerful digital loyalty program',
      features: [
        'Points-based or tiered reward systems',
        'Automated loyalty tracking',
        'Personalized customer offers',
        'Program performance analytics'
      ]
    }
  ];
  
  const activeTool = businessTools.find(tool => tool.id === activeTab);

  return (
    <section id="business" className="section relative overflow-hidden">
      {/* Background patterns */}
      <div className="grid-pattern opacity-20"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gradient-to-l from-[rgba(255,149,0,0.1)] to-transparent blur-[100px]"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">WaoCard</span> for Business <span className="gradient-text">(WaoBiz)</span> 
          </h2>
          <p className="section-subtitle">
            Transform how your business manages expenses, accepts payments, and builds customer loyalty
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-6 mb-16">
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 h-full relative">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              
              <div className="space-y-8">
                <div className="relative">
                  {/* Decorative glow element */}
                  <div className="absolute -left-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.1)] to-transparent blur-2xl"></div>
                  
                  <h3 className="text-2xl font-bold mb-6 relative">Business Solutions</h3>
                  <p className="text-[rgba(255,255,255,0.8)] mb-6">
                    Our comprehensive suite of business tools helps you manage finances, 
                    increase customer engagement, and grow your business.
                  </p>
                </div>
                
                <div className="space-y-3">
                  {businessTools.map((tool) => (
                    <button
                      key={tool.id}
                      className={`w-full text-left p-4 rounded-lg flex items-center gap-4 transition-all duration-300 ${
                        activeTab === tool.id
                          ? 'bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)]'
                          : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,149,0,0.2)]'
                      }`}
                      onClick={() => setActiveTab(tool.id)}
                    >
                      <div className={`text-2xl ${activeTab === tool.id ? 'text-[#FF9500]' : 'text-[rgba(255,255,255,0.7)]'}`}>
                        {tool.icon}
                      </div>
                      <div>
                        <div className={`font-medium ${activeTab === tool.id ? 'text-[#FF9500]' : 'text-white'}`}>
                          {tool.name}
                        </div>
                        {activeTab === tool.id && (
                          <div className="h-[1px] w-full bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent mt-1"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                <Link href="#contact-sales">
                  <span className="btn btn-primary inline-block w-full text-center mt-4">Contact Sales</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="glass-panel p-8 relative h-full">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-[1px] h-10 bg-gradient-to-t from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-10 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl text-[#FF9500]">{activeTool?.icon}</div>
                <h3 className="text-2xl font-bold">{activeTool?.name}</h3>
              </div>
              
              <p className="text-[rgba(255,255,255,0.8)] mb-8 text-lg">
                {activeTool?.description}
              </p>
              
              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-transparent z-10"></div>
                <Image
                  src={`/${activeTab}-dashboard.png`}
                  alt={`${activeTool?.name} Dashboard`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-4 right-4 text-sm px-3 py-1 bg-[rgba(0,0,0,0.7)] rounded-full border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.9)] z-20">
                  Dashboard Preview
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-[1px] bg-gradient-to-r from-[#FF9500] to-transparent mr-2"></span>
                Key Features
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                {activeTool?.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-[rgba(255,255,255,0.03)] p-4 rounded-lg border border-[rgba(255,255,255,0.05)]">
                    <div className="w-5 h-5 rounded-full bg-[rgba(255,149,0,0.2)] text-[#FF9500] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                      ✓
                    </div>
                    <span className="text-[rgba(255,255,255,0.9)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-panel p-6 relative group">
              {/* Hover corner accents */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
              </div>
              
              <div className="benefit-icon mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF9500] transition-colors">{benefit.title}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.7)]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative diagonal line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
    </section>
  );
}