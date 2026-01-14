import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import {
  Hotel,
  BedDouble,
  Calendar,
  DollarSign,
  ClipboardList,
  Gift,
  BarChart3,
  Settings,
  Check,
  ArrowRight,
  Building2,
  Home,
  Presentation,
  IdCard,
  QrCode,
  Utensils,
  Plane,
  Coffee,
  Sparkles,
  Plus,
  X
} from 'lucide-react';

export default function WaoHotel() {
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
      icon: <BedDouble className="w-8 h-8" />,
      title: "Room",
      subtitle: "Management",
      color: "from-orange-400 to-orange-500",
      backContent: {
        title: "Effortless Room Management",
        description: "Define and manage room types with ease, from single rooms to luxury suites.",
        features: [
          "Categorize rooms by type (Single, Double, Suite)",
          "Set max adults and children per room",
          "Add room amenities and descriptions",
          "Upload room images"
        ],
        illustration: "🛏️"
      }
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Dynamic",
      subtitle: "Pricing",
      color: "from-green-400 to-emerald-500",
      backContent: {
        title: "Flexible Room Pricing",
        description: "Set default, day-wise, and seasonal pricing for optimal revenue management.",
        features: [
          "Set different prices for each day of the week",
          "Price based on number of guests",
          "Seasonal pricing adjustments",
          "Special rate configurations"
        ],
        illustration: "💰"
      }
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Booking",
      subtitle: "Calendar",
      color: "from-blue-400 to-cyan-500",
      backContent: {
        title: "Visual Availability Calendar",
        description: "Monitor room bookings and availability to avoid overbooking.",
        features: [
          "See room availability at a glance",
          "Quick date navigation",
          "Click to view booking details",
          "Set rooms as unavailable"
        ],
        illustration: "📅"
      }
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Seamless",
      subtitle: "Bookings",
      color: "from-purple-400 to-indigo-500",
      backContent: {
        title: "Simplified Booking Process",
        description: "Efficient check-ins and check-outs with comprehensive booking management.",
        features: [
          "Add existing or walk-in customers",
          "Select rooms and extras",
          "Apply discount coupons",
          "Track payment status"
        ],
        illustration: "📋"
      }
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Coupons &",
      subtitle: "Discounts",
      color: "from-pink-400 to-rose-500",
      backContent: {
        title: "Coupon Management",
        description: "Create and distribute coupons to attract new guests and reward loyal ones.",
        features: [
          "Create room-specific coupons",
          "Set validity periods",
          "Percentage or fixed discounts",
          "Track coupon usage"
        ],
        illustration: "🎁"
      }
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detailed",
      subtitle: "Reports",
      color: "from-teal-400 to-cyan-500",
      backContent: {
        title: "Data-Driven Insights",
        description: "Access reports on occupancy, revenue, and guest preferences for informed decisions.",
        features: [
          "Booking statistics by date range",
          "Occupancy rates analysis",
          "Revenue tracking",
          "Guest count reports"
        ],
        illustration: "📊"
      }
    }
  ];

  const propertyTypes = [
    {
      icon: <Hotel className="w-10 h-10" />,
      title: "Traditional Hotels",
      description: "Manage room types, bookings, and pricing for traditional hotels of any size."
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Vacation Rentals",
      description: "Streamline management for vacation rentals, from bookings to guest communication."
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Guest Houses",
      description: "Manage bookings, guest services, and operations for guest houses efficiently."
    },
    {
      icon: <Presentation className="w-10 h-10" />,
      title: "Conference Halls",
      description: "Manage bookings, room setup, and catering for conference halls and event spaces."
    }
  ];

  const smartFeatures = [
    {
      icon: <IdCard className="w-8 h-8" />,
      title: "Smart Staff ID/Business Card",
      description: "Provide staff with digital IDs and business cards for professional interactions."
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Smart QR Restaurant Service",
      description: "Offer QR code menus for contactless ordering and payment in your restaurant."
    }
  ];

  const extraServices = [
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Airport Pickup",
      description: "Arrange transportation from the airport"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Breakfast Service",
      description: "Complimentary or paid breakfast options"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Dry Cleaning",
      description: "Laundry and dry cleaning services"
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Room Service",
      description: "In-room dining and amenities"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Add Rooms",
      description: "Define room types, set amenities, upload images, and configure occupancy limits."
    },
    {
      step: "2",
      title: "Set Pricing",
      description: "Configure default and day-wise pricing, seasonal rates, and guest-based pricing."
    },
    {
      step: "3",
      title: "Manage Bookings",
      description: "Accept reservations, track availability, and process check-ins/check-outs."
    },
    {
      step: "4",
      title: "Analyze & Grow",
      description: "Generate reports, track performance, and optimize your operations."
    }
  ];

  const amenities = [
    "Room Services",
    "Restaurant",
    "Laundry",
    "Bar",
    "Lounge",
    "Ultra Modern Pool"
  ];

  return (
    <div className="min-h-screen bg-black font-sans overflow-x-hidden relative">
      <Head>
        <title>WaoHotel - Hotel Management System | WaoBiz</title>
        <meta name="description" content="WaoHotel is a comprehensive hotel management system module for WaoBiz designed to streamline operations and elevate guest experiences." />
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
                <span className="text-[#FF9500] font-medium">WaoHotel by WaoBiz</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Revolutionizing <span className="gradient-text">Hotel Management</span>
              </h1>

              <p className="text-[rgba(255,255,255,0.8)] text-lg md:text-xl mb-8 leading-relaxed">
                A comprehensive hotel management system module for WaoBiz designed to streamline operations and elevate guest experiences.
              </p>

              <div className="flex flex-wrap gap-4 mb-12 items-center">
                <Link href="#features">
                  <span className="btn btn-primary inline-flex items-center justify-center gap-2">
                    Explore Features
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link href="#how-it-works">
                  <span className="btn btn-secondary inline-flex items-center justify-center">
                    How It Works
                  </span>
                </Link>
              </div>

              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#FF9500] mb-1">100%</div>
                  <div className="text-[rgba(255,255,255,0.7)] text-sm">Digital Management</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF9500] mb-1">24/7</div>
                  <div className="text-[rgba(255,255,255,0.7)] text-sm">Booking Availability</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF9500] mb-1">50%</div>
                  <div className="text-[rgba(255,255,255,0.7)] text-sm">Time Saved</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,149,0,0.2)] to-transparent rounded-3xl blur-3xl"></div>
              <div className="glass-panel p-8 relative">
                <div className="space-y-6">
                  {/* Sample Hotel Dashboard Preview */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 rounded-2xl border border-[rgba(255,149,0,0.3)] shadow-2xl">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <Hotel className="w-8 h-8 text-[#FF9500]" />
                          <div>
                            <div className="text-sm text-[rgba(255,255,255,0.6)]">HMS Dashboard</div>
                            <div className="text-lg font-bold text-white">WaoHotel</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-[rgba(255,149,0,0.1)] p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-[#FF9500]">12</div>
                          <div className="text-xs text-[rgba(255,255,255,0.6)]">Rooms</div>
                        </div>
                        <div className="bg-[rgba(0,200,83,0.1)] p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-400">8</div>
                          <div className="text-xs text-[rgba(255,255,255,0.6)]">Booked</div>
                        </div>
                        <div className="bg-[rgba(59,130,246,0.1)] p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-400">4</div>
                          <div className="text-xs text-[rgba(255,255,255,0.6)]">Available</div>
                        </div>
                      </div>

                      <div className="text-xs text-[rgba(255,255,255,0.5)] flex gap-4">
                        <span>Rooms</span>
                        <span>Prices</span>
                        <span>Bookings</span>
                        <span>Calendar</span>
                        <span>Reports</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.1)]">
                    <Check className="w-5 h-5 text-[#FF9500]" />
                    <span className="text-white">Easy room & booking management</span>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.1)]">
                    <Check className="w-5 h-5 text-[#FF9500]" />
                    <span className="text-white">Real-time availability calendar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Flip Cards */}
      <section id="features" className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Powerful Features for <span className="gradient-text">Modern Hotels</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to manage your hotel efficiently and delight your guests
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

      {/* Property Types Section */}
      <section className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Hotel Management <span className="gradient-text">Made Easy</span>
            </h2>
            <p className="section-subtitle">
              WaoHotel adapts to your property type, whether it&apos;s a hotel, rental, or event space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => (
              <div key={index} className="glass-panel p-6 text-center hover:border-[rgba(255,149,0,0.3)] transition-all duration-300 group">
                <div className="w-20 h-20 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500] mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#FF9500] transition-colors">
                  {type.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm">
                  {type.description}
                </p>
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
              Set up your hotel management system quickly and start accepting bookings
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

      {/* Extra Services Section */}
      <section className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left">
                Offer <span className="gradient-text">Extra Services</span>
              </h2>
              <p className="text-[rgba(255,255,255,0.8)] text-lg mb-8">
                Enhance guest experiences with additional services that can be booked alongside rooms. From airport pickups to breakfast packages, customize your offerings.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {extraServices.map((service, index) => (
                  <div key={index} className="glass-panel p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500] flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{service.title}</h4>
                      <p className="text-xs text-[rgba(255,255,255,0.6)]">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#FF9500]" />
                Room Amenities
              </h3>
              <p className="text-[rgba(255,255,255,0.7)] mb-6">
                Define amenities available in your rooms and highlight them to attract guests.
              </p>
              <div className="flex flex-wrap gap-3">
                {amenities.map((amenity, index) => (
                  <div key={index} className="px-4 py-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.3)] rounded-full text-sm text-white">
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Features Section */}
      <section className="section relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Smart Features for a <span className="gradient-text">Seamless Experience</span>
            </h2>
            <p className="section-subtitle">
              Leverage technology to enhance staff efficiency and guest satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {smartFeatures.map((feature, index) => (
              <div key={index} className="glass-panel p-8 flex items-start gap-6 hover:border-[rgba(255,149,0,0.3)] transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF9500] to-[#FFB649] flex items-center justify-center text-white flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-[rgba(255,255,255,0.7)]">{feature.description}</p>
                </div>
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
              <Hotel className="w-16 h-16 text-[#FF9500] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Elevate Your Hotel with <span className="gradient-text">WaoHotel</span>
              </h2>
              <p className="text-[rgba(255,255,255,0.8)] text-lg mb-8 max-w-2xl mx-auto">
                WaoHotel empowers you to manage your hotel efficiently, enhance guest experiences, and drive revenue growth. Join the revolution in hotel management.
              </p>

              <div className="flex flex-wrap gap-4 justify-center items-center">
                <Link href="/business">
                  <span className="btn btn-primary inline-flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link href="/contact">
                  <span className="btn btn-secondary inline-flex items-center justify-center">
                    Contact Sales
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
