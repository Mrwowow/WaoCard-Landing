import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { Store, Gift, Check, ArrowRight, Sparkles, Target, Plus, X, Bell, MessageSquare, Cake, UserPlus, MapPin, QrCode } from 'lucide-react';

export default function StoreCards() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCardClick = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleCard(index);
  };

  const featureCards = [
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Send Free",
      subtitle: "Push messages",
      color: "from-orange-400 to-orange-500",
      backContent: {
        title: "Push Notifications",
        description: "Engage customers with timely, targeted push notifications directly to their mobile devices.",
        features: [
          "Send promotional offers and flash sales",
          "Notify customers when they're near your store",
          "Automated birthday and anniversary wishes",
          "Re-engagement campaigns for inactive users"
        ],
        illustration: "📱"
      }
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Collect more",
      subtitle: "reviews automatically",
      color: "from-blue-400 to-cyan-500",
      backContent: {
        title: "Automated Reviews",
        description: "Collect customer feedback automatically after every transaction to build trust and improve service.",
        features: [
          "Auto-send review requests post-purchase",
          "Customizable feedback forms",
          "Integration with Google and social platforms",
          "Analytics dashboard for sentiment tracking"
        ],
        illustration: "⭐"
      }
    },
    {
      icon: <Cake className="w-8 h-8" />,
      title: "Wish customers",
      subtitle: "happy birthday",
      color: "from-pink-400 to-red-500",
      backContent: {
        title: "Birthday Campaigns",
        description: "Delight customers with personalized birthday messages and special offers.",
        features: [
          "Automatic birthday greetings",
          "Special birthday discounts and rewards",
          "Gift vouchers for loyal customers",
          "Milestone celebration notifications"
        ],
        illustration: "🎁"
      }
    },
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Launch",
      subtitle: "referral program",
      color: "from-purple-400 to-indigo-500",
      backContent: {
        title: "Referral Program",
        description: "Turn your customers into brand ambassadors with an easy-to-use referral system.",
        features: [
          "Unique referral codes for each customer",
          "Track referrals and reward both parties",
          "Shareable QR codes and links",
          "Social media integration for easy sharing"
        ],
        illustration: "🤝"
      }
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Send",
      subtitle: "Geo-based notifications",
      color: "from-green-400 to-teal-500",
      backContent: {
        title: "Location-Based Marketing",
        description: "Reach customers at the perfect moment when they're near your store.",
        features: [
          "Geofencing around your store locations",
          "Proximity-triggered special offers",
          "Drive foot traffic during slow hours",
          "Location analytics and insights"
        ],
        illustration: "📍"
      }
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Quick",
      subtitle: "card distribution",
      color: "from-yellow-400 to-orange-500",
      backContent: {
        title: "Easy Card Distribution",
        description: "Multiple ways to distribute your store cards and grow your customer base quickly.",
        features: [
          "QR code for instant sign-ups",
          "Email and SMS card delivery",
          "In-store tablet registration",
          "Social media card sharing"
        ],
        illustration: "⚡"
      }
    }
  ];

  const benefits = [
    {
      title: "For Retailers",
      items: [
        "Increase customer retention by up to 40%",
        "Build a valuable customer database",
        "Reduce marketing costs with targeted campaigns",
        "Track customer behavior and preferences",
        "Easy integration with existing POS systems",
        "No upfront costs or setup fees"
      ]
    },
    {
      title: "For Customers",
      items: [
        "Earn rewards on every purchase",
        "Exclusive member-only discounts",
        "Digital wallet convenience",
        "Track spending and balances easily",
        "No physical card to carry",
        "Instant notifications and updates"
      ]
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description: "Register your business and customize your branded store card design."
    },
    {
      step: "2",
      title: "Launch",
      description: "Share your store card with customers via QR codes, email, or in-app."
    },
    {
      step: "3",
      title: "Engage",
      description: "Customers add the card to their WaoCard wallet and start earning rewards."
    },
    {
      step: "4",
      title: "Grow",
      description: "Track performance, run campaigns, and watch your loyal customer base expand."
    }
  ];

  const useCases = [
    {
      icon: <Store className="w-8 h-8" />,
      title: "Retail Stores",
      description: "Perfect for clothing, electronics, home goods, and specialty retailers.",
      image: "/retail-store.png"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Restaurants & Cafes",
      description: "Build a community of regular diners with rewards for every visit.",
      image: "/restaurant.png"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Salons & Spas",
      description: "Encourage repeat bookings with loyalty points and member perks.",
      image: "/salon.png"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Gyms & Fitness",
      description: "Keep members engaged with milestone rewards and referral bonuses.",
      image: "/gym.png"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 500 cardholders",
        "Basic analytics dashboard",
        "Email support",
        "Standard card design",
        "5% transaction fee"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "For growing businesses with active customers",
      features: [
        "Up to 5,000 cardholders",
        "Advanced analytics & insights",
        "Priority support",
        "Custom card design",
        "3% transaction fee",
        "Marketing campaign tools",
        "SMS notifications"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large retailers with complex needs",
      features: [
        "Unlimited cardholders",
        "Dedicated account manager",
        "24/7 phone support",
        "White-label solution",
        "Negotiated transaction fees",
        "API access",
        "Custom integrations",
        "Advanced fraud protection"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-black font-sans overflow-x-hidden relative">
      <Head>
        <title>StoreCards - WaoCard for Business</title>
        <meta name="description" content="Create branded store cards that drive customer loyalty and increase sales. Track spending, run campaigns, and grow your business with WaoCard." />
      </Head>

      {/* Background patterns */}
      <div className="grid-pattern opacity-20"></div>
      <div className="dot-pattern opacity-15"></div>
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-[rgba(255,149,0,0.1)] to-transparent blur-[120px]"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.08)] to-transparent blur-[120px]"></div>

      <Header
        scrolled={scrolled}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] rounded-full mb-6">
                <span className="text-[#FF9500] font-medium">StoreCard</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Shoppers Into <span className="gradient-text">Loyal Customers</span>
              </h1>

              <p className="text-[rgba(255,255,255,0.8)] text-lg md:text-xl mb-8 leading-relaxed">
                Create branded digital store cards that reward customer loyalty, increase repeat purchases, and provide valuable insights into shopping behavior.
              </p>

              <div className="flex flex-wrap gap-4 mb-12 items-center">
                <Link href="#pricing">
                  <span className="btn btn-primary inline-flex items-center justify-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link href="#how-it-works">
                  <span className="btn btn-secondary inline-flex items-center justify-center">
                    See How It Works
                  </span>
                </Link>
              </div>

              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#FF9500] mb-1">40%</div>
                  <div className="text-[rgba(255,255,255,0.7)] text-sm">Higher retention rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF9500] mb-1">2.5x</div>
                  <div className="text-[rgba(255,255,255,0.7)] text-sm">More frequent visits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF9500] mb-1">60%</div>
                  <div className="text-[rgba(255,255,255,0.7)] text-sm">Increased spending</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,149,0,0.2)] to-transparent rounded-3xl blur-3xl"></div>
              <div className="glass-panel p-8 relative">
                <div className="space-y-6">
                  {/* Sample Store Card Preview */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#FF9500] to-[#FFB649] p-6 rounded-2xl text-white shadow-2xl">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <div className="text-sm opacity-80 mb-1">StoreCard</div>
                          <div className="text-2xl font-bold">Your Store Name</div>
                        </div>
                        <Store className="w-8 h-8" />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-xs opacity-80 mb-1">Card Number</div>
                          <div className="text-lg tracking-wider">**** **** **** 1234</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs opacity-80 mb-1">Points Balance</div>
                            <div className="text-xl font-bold">2,450</div>
                          </div>
                          <div>
                            <div className="text-xs opacity-80 mb-1">Member Since</div>
                            <div className="text-xl font-bold">Jan 2024</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.1)]">
                    <Check className="w-5 h-5 text-[#FF9500]" />
                    <span className="text-white">Fully customizable design</span>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.1)]">
                    <Check className="w-5 h-5 text-[#FF9500]" />
                    <span className="text-white">Instant digital delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Powerful Features for <span className="gradient-text">Modern Retailers</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to build and manage a successful store card program
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((card, index) => (
              <div key={index} className="perspective-1000 h-[280px]">
                <div
                  className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                    flippedCards[index] ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of Card */}
                  <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                    onClick={() => toggleCard(index)}
                  >
                    <div className={`relative h-full bg-gradient-to-br ${card.color} rounded-2xl p-8 shadow-xl overflow-hidden group cursor-pointer`}>
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12"></div>

                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                          <div className="text-white mb-4">
                            {card.icon}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                            {card.title}
                          </h3>
                          <p className="text-lg text-white/90 font-medium">
                            {card.subtitle}
                          </p>
                        </div>

                        <button
                          onClick={(e) => handleCardClick(index, e)}
                          className="absolute bottom-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                          aria-label="Show more details"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="absolute inset-0 backface-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                    onClick={() => toggleCard(index)}
                  >
                    <div className="h-full glass-panel p-6 rounded-2xl border-2 border-[rgba(255,149,0,0.3)] cursor-pointer">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-4xl">{card.backContent.illustration}</div>
                          <button
                            onClick={(e) => handleCardClick(index, e)}
                            className="w-8 h-8 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center text-white hover:bg-[rgba(255,149,0,0.3)] transition-all"
                            aria-label="Close details"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2">
                          {card.backContent.title}
                        </h4>
                        <p className="text-sm text-[rgba(255,255,255,0.7)] mb-4">
                          {card.backContent.description}
                        </p>

                        <div className="space-y-2 flex-1 overflow-y-auto">
                          {card.backContent.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-[#FF9500] flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-[rgba(255,255,255,0.8)]">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Get Started in <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="section-subtitle">
              Launch your store card program in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent -translate-x-6"></div>
                )}

                <div className="glass-panel p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9500] to-[#FFB649] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[rgba(255,255,255,0.7)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="glass-panel p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-6 h-[2px] bg-gradient-to-r from-[#FF9500] to-transparent mr-3"></span>
                  {benefit.title}
                </h3>

                <div className="space-y-4">
                  {benefit.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[rgba(255,149,0,0.2)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#FF9500]" />
                      </div>
                      <span className="text-[rgba(255,255,255,0.9)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Perfect for <span className="gradient-text">Every Business</span>
            </h2>
            <p className="section-subtitle">
              Store cards work across all industries and business sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="glass-panel p-6 text-center hover:border-[rgba(255,149,0,0.3)] transition-all duration-300 group">
                <div className="w-16 h-16 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500] mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#FF9500] transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="section-subtitle">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`glass-panel p-8 ${plan.highlighted ? 'border-[rgba(255,149,0,0.5)] relative' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF9500] to-[#FFB649] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="text-4xl font-bold text-[#FF9500]">{plan.price}</span>
                    {plan.period && <span className="text-[rgba(255,255,255,0.6)]">{plan.period}</span>}
                  </div>
                  <p className="text-[rgba(255,255,255,0.7)] text-sm">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#FF9500] flex-shrink-0 mt-0.5" />
                      <span className="text-[rgba(255,255,255,0.9)] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#FF9500] to-[#FFB649] text-white hover:shadow-lg hover:shadow-[rgba(255,149,0,0.3)]'
                      : 'bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="glass-panel p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[rgba(255,149,0,0.2)] to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[rgba(255,149,0,0.2)] to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Customer <span className="gradient-text">Loyalty?</span>
              </h2>
              <p className="text-[rgba(255,255,255,0.8)] text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of retailers who have transformed their business with WaoCard store cards.
              </p>

              <div className="flex flex-wrap gap-4 justify-center items-center">
                <Link href="#pricing">
                  <span className="btn btn-primary inline-flex items-center justify-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link href="/business">
                  <span className="btn btn-secondary inline-flex items-center justify-center">
                    Explore All Business Solutions
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
