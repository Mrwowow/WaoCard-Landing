// pages/events/[id].tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import QRCode from 'react-qr-code';

// Import components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { getAccessToken } from '@/utils/api';
import { Event, EventUser } from '@/types/event';

interface GoogleMapProps {
  location: string;
  lat: number;
  lng: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
}

// Mock context for demo purposes
const useAuth = (): AuthContextType => {
  return {
    isAuthenticated: false,
    login: () => alert('Login functionality would be triggered here')
  };
};

// Helper function to handle image URLs
const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return "/event-placeholder.png";
  
  // Check if the URL is from an external source that's not configured
  if (imageUrl && imageUrl.startsWith('http')) {
    // In production with next.config.js configured properly:
    return imageUrl;
    // For development or if next.config.js is not configured:
    // return "/event-placeholder.png";
  }
  return imageUrl;
};

// CountDown Component
const CountDownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Event has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex gap-4 justify-center sm:justify-start">
      {timeBlocks.map((block, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="glass-panel w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative">
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-6 h-6">
              <div className="absolute top-0 right-0 w-[1px] h-3 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
              <div className="absolute top-0 right-0 w-3 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-6 h-6">
              <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-gradient-to-t from-[rgba(255,149,0,0.5)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.5)] to-transparent"></div>
            </div>

            <span className="text-2xl sm:text-3xl font-bold text-white">{block.value}</span>
          </div>
          <span className="text-xs mt-2 text-[rgba(255,255,255,0.7)]">{block.label}</span>
        </div>
      ))}
    </div>
  );
};

// Map Component placeholder - in a real app, this would use Google Maps API
const EventMap = ({ location, lat, lng }: GoogleMapProps) => {
  return (
    <div className="glass-panel overflow-hidden rounded-lg p-6 h-full relative">
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-12 h-12">
        <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
        <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
      </div>
      
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Location
      </h3>
      
      <p className="text-[rgba(255,255,255,0.7)] mb-4">{location}</p>
      
      <div className="relative h-60 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-[url('/map-placeholder.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center p-4">
            <p className="text-white mb-2">Map would display here</p>
            <p className="text-sm text-[rgba(255,255,255,0.7)]">Coordinates: {lat}, {lng}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-[rgba(255,149,0,0.2)] rounded-md text-[#FF9500] text-sm hover:bg-[rgba(255,149,0,0.3)] transition-colors"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

interface EventDetailPageProps {
  event: Event;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event }) => {
  const { isAuthenticated, login } = useAuth();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);
  const [goingStatus, setGoingStatus] = useState<string>('none'); // 'none', 'going', 'interested'
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attendees] = useState<EventUser[]>([
    {
      name: "John Doe",
      avatar: "/avatars/user1.png",
      url: "#",
      user_id: "2"
    },
    {
      name: "Sarah Johnson",
      avatar: "/avatars/user2.png",
      url: "#",
      user_id: "3"
    },
    {
      name: "Michael Smith",
      avatar: "/avatars/user3.png",
      url: "#",
      user_id: "4"
    }
  ]);

  // Set initial going status based on event data
  useEffect(() => {
    if (event) {
      if (event.is_going) {
        setGoingStatus('going');
      } else if (event.is_interested) {
        setGoingStatus('interested');
      }
    }
  }, [event]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If event is not available
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="glass-panel p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="text-[rgba(255,255,255,0.7)] mb-6">This event may have been removed or the URL is incorrect.</p>
          <Link href="/events">
            <span className="btn btn-primary">Browse Events</span>
          </Link>
        </div>
      </div>
    );
  }

  // Parse dates
  const startDate = new Date(convertDateFormat(event.start_date) + 'T' + event.start_time);
  const endDate = new Date(convertDateFormat(event.end_date) + 'T' + event.end_time);

  // Function to handle going/interested buttons
  const handleAttendance = async (status: string) => {
    // If not authenticated, prompt for login
    if (!isAuthenticated) {
      if (confirm("Please sign in to mark your attendance. Would you like to sign in now?")) {
        login();
      }
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    // Toggle status if already selected
    const newStatus = goingStatus === status ? 'none' : status;
    
    try {
      // For demo, just update the local state
      setTimeout(() => {
        setGoingStatus(newStatus);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error("Error updating attendance status:", error);
      setIsLoading(false);
    }
  };

  // Toggle share menu
  const toggleShareMenu = () => {
    setShareMenuOpen(!shareMenuOpen);
  };

  // Copy event link to clipboard
  const copyEventLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
      setShareMenuOpen(false);
    }
  };

  // Share on social media
  const shareOnSocialMedia = (platform: string) => {
    if (typeof window === 'undefined') return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(event.name);
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShareMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans overflow-x-hidden relative">
      <Head>
        <title>{event.name} | WaoCard Events</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={event.name} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.cover} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      {/* Background patterns */}
      <div className="grid-pattern opacity-20"></div>
      <div className="absolute top-40 right-5 w-80 h-80 rounded-full bg-gradient-to-l from-[rgba(255,149,0,0.05)] to-transparent blur-[120px]"></div>
      <div className="absolute bottom-60 left-10 w-60 h-60 rounded-full bg-gradient-to-r from-[rgba(255,149,0,0.1)] to-transparent blur-[100px]"></div>
      
      <Header 
        scrolled={scrolled} 
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} 
      />
      
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      <main className="pt-24 pb-20 relative z-10">
        {/* Event Hero Section */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] mb-8">
          {/* Cover image with gradient overlay */}
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(event.cover)}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          </div>
          
          {/* Event title and basic info overlay */}
          <div className="container mx-auto px-4 h-full relative">
            <div className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-[#FF9500] text-black text-sm font-medium rounded-md">
                  {formatDate(startDate)}
                </div>
                <div className="px-3 py-1 bg-[rgba(255,255,255,0.1)] text-white text-sm rounded-md">
                  {formatTime(startDate)} - {formatTime(endDate)}
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                {event.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image
                      src={getImageUrl(event.user_data.avatar)}
                      alt={event.user_data.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[rgba(255,255,255,0.7)]">Organized by</p>
                    <a href={event.user_data.url} className="text-white hover:text-[#FF9500] transition-colors">
                      {event.user_data.name}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-white">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Event details */}
            <div className="lg:col-span-2">
              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => !isLoading && handleAttendance('going')}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    goingStatus === 'going' 
                      ? 'bg-[#FF9500] text-white' 
                      : 'glass-panel hover:border-[rgba(255,149,0,0.3)]'
                  }`}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  Going
                  <span className="text-sm opacity-70">{event.going_count}</span>
                </button>
                
                <button 
                  onClick={() => !isLoading && handleAttendance('interested')}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    goingStatus === 'interested' 
                      ? 'bg-[#FF9500] text-white' 
                      : 'glass-panel hover:border-[rgba(255,149,0,0.3)]'
                  }`}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  Interested
                  <span className="text-sm opacity-70">{event.interested_count}</span>
                </button>
                
                <div className="relative">
                  <button 
                    onClick={toggleShareMenu}
                    className="glass-panel px-6 py-3 rounded-lg flex items-center gap-2 hover:border-[rgba(255,149,0,0.3)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  {shareMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-panel rounded-lg p-2 z-20 border border-[rgba(255,149,0,0.2)]">
                      <ul>
                        <li>
                          <button 
                            className="w-full text-left px-4 py-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] flex items-center gap-2"
                            onClick={() => shareOnSocialMedia('facebook')}
                          >
                            <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                            </svg>
                            Facebook
                          </button>
                        </li>
                        <li>
                          <button 
                            className="w-full text-left px-4 py-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] flex items-center gap-2"
                            onClick={() => shareOnSocialMedia('twitter')}
                          >
                            <svg className="w-4 h-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                            Twitter
                          </button>
                        </li>
                        <li>
                          <button 
                            className="w-full text-left px-4 py-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] flex items-center gap-2"
                            onClick={() => shareOnSocialMedia('whatsapp')}
                          >
                            <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                            </svg>
                            WhatsApp
                          </button>
                        </li>
                        <li>
                          <button 
                            className="w-full text-left px-4 py-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] flex items-center gap-2"
                            onClick={() => shareOnSocialMedia('linkedin')}
                          >
                            <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h-.003z"/>
                            </svg>
                            LinkedIn
                          </button>
                        </li>
                        <li className="border-t border-[rgba(255,255,255,0.1)] mt-1 pt-1">
                          <button 
                            className="w-full text-left px-4 py-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] flex items-center gap-2"
                            onClick={copyEventLink}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy link
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Countdown Timer */}
              <div className="glass-panel p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Countdown to Event
                </h3>
                
                <CountDownTimer targetDate={startDate} />
              </div>
              
              {/* Event description */}
              <div className="glass-panel p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About This Event
                </h3>
                
                <div className="prose prose-invert prose-orange max-w-none">
                  <p className="text-[rgba(255,255,255,0.8)]">{event.description}</p>
                  
                  {/* This would be expanded with more details in a real application */}
                  <p className="text-[rgba(255,255,255,0.8)] mt-4">
                    Join us for this special celebration! There will be cake, games, and plenty of fun activities for everyone.
                  </p>
                  
                  <h4 className="text-white mt-6 text-lg font-medium">What to expect:</h4>
                  <ul className="text-[rgba(255,255,255,0.8)]">
                    <li>Birthday cake and refreshments</li>
                    <li>Party games and entertainment</li>
                    <li>Gift opening ceremony</li>
                    <li>Photo opportunities</li>
                  </ul>
                </div>
              </div>
              
              {/* Attendees */}
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  People Attending
                  <span className="ml-2 text-sm text-[rgba(255,255,255,0.6)]">{attendees.length}</span>
                </h3>
                
                {attendees.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {attendees.map((attendee, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.03)] rounded-lg">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                          <Image
                            src={getImageUrl(attendee.avatar)}
                            alt={attendee.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <a 
                            href={attendee.url}
                            className="text-white hover:text-[#FF9500] transition-colors font-medium"
                          >
                            {attendee.name}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[rgba(255,255,255,0.6)]">No one has confirmed attendance yet. Be the first!</p>
                )}
                
                <div className="mt-6 text-center">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => isAuthenticated ? alert('Invite feature would open here') : login()}
                  >
                    Invite Friends
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right column - Event Details */}
            <div className="lg:col-span-1 space-y-8">
              {/* Event Details Card */}
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Event Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[rgba(255,255,255,0.7)] text-sm">Date & Time</h4>
                      <p className="text-white">{formatFullDate(startDate)}</p>
                      <p className="text-white">{formatTime(startDate)} - {formatTime(endDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[rgba(255,255,255,0.7)] text-sm">Location</h4>
                      <p className="text-white">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#FF9500]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[rgba(255,255,255,0.7)] text-sm">Ticket Price</h4>
                      <p className="text-white">Free Admission</p>
                    </div>
                  </div>
                </div>
                
                {/* Add to calendar options */}
                <div className="mt-8">
                  <button className="w-full btn btn-primary mb-3 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to WaoCard
                  </button>
                  
                  <div className="text-center">
                    <button 
                      className="text-[rgba(255,255,255,0.7)] hover:text-[#FF9500] transition-colors text-sm flex items-center gap-1 mx-auto"
                      onClick={() => {
                        // In a real app, open calendar options dropdown
                        alert('Calendar options would open here');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Add to calendar
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Location Map */}
              <EventMap 
                location={event.location}
                lat={parseFloat(event.user_data.lat || "0")}
                lng={parseFloat(event.user_data.lng || "0")}
              />
              
              {/* Organizer Info */}
              <div className="glass-panel p-6 relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Organizer
                </h3>
                
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative">
                    <Image
                      src={getImageUrl(event.user_data.avatar)}
                      alt={event.user_data.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <a href={event.user_data.url} className="text-white hover:text-[#FF9500] transition-colors font-bold">
                      {event.user_data.name}
                    </a>
                    <p className="text-[rgba(255,255,255,0.7)] text-sm">
                      {event.user_data.is_verified ? 'Verified Organizer' : 'Event Organizer'}
                    </p>
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-[rgba(255,255,255,0.1)] my-4"></div>
                
                <button 
                  className="w-full py-2 text-center text-[#FF9500] hover:text-white hover:bg-[rgba(255,149,0,0.2)] transition-colors rounded-md"
                  onClick={() => isAuthenticated ? alert('Contact form would open here') : login()}
                >
                  Contact Organizer
                </button>
              </div>
              
              {/* QR Code for Event */}
              <div className="glass-panel p-6 text-center relative z-10">
                <h3 className="text-xl font-bold mb-4">Event QR Code</h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm mb-6">Scan with WaoCard app for quick access</p>
                
                <div className="w-40 h-40 mx-auto bg-white p-2 rounded-md">
                  <QRCode
                    value={`https://waocard.co/app/events/${event.id}`}
                    size={144}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="H"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Events Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 relative inline-flex items-center">
              Similar Events
              <span className="ml-3 w-12 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.7)] to-transparent"></span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder related events would go here - using the same card style */}
              <div className="glass-panel p-4 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                  <Image
                    src="/event-placeholder.png"
                    alt="Related Event"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-2 z-20 bg-[rgba(255,149,0,0.9)] text-black text-xs px-2 py-1 rounded-md font-medium">
                    Aug 15
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF9500] transition-colors">Children&apos;s Birthday Party</h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm mb-4">Join us for another fun birthday celebration with games and cake!</p>
              </div>
              
              <div className="glass-panel p-4 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                  <Image
                    src="/event-placeholder.png"
                    alt="Related Event"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-2 z-20 bg-[rgba(255,149,0,0.9)] text-black text-xs px-2 py-1 rounded-md font-medium">
                    Aug 22
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF9500] transition-colors">Family Fun Day</h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm mb-4">A day filled with activities for the whole family to enjoy together.</p>
              </div>
              
              <div className="glass-panel p-4 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                  <Image
                    src="/event-placeholder.png"
                    alt="Related Event"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-2 z-20 bg-[rgba(255,149,0,0.9)] text-black text-xs px-2 py-1 rounded-md font-medium">
                    Sep 5
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF9500] transition-colors">Kids Play Day</h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm mb-4">Special day for children with games, educational activities and more.</p>
              </div>
              
              <div className="glass-panel p-4 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
                  <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                  <Image
                    src="/event-placeholder.png"
                    alt="Related Event"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-2 z-20 bg-[rgba(255,149,0,0.9)] text-black text-xs px-2 py-1 rounded-md font-medium">
                    Sep 12
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF9500] transition-colors">Community Celebration</h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm mb-4">Join the neighborhood for food, music, and celebration of our community.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Date formatting helper functions
function convertDateFormat(dateStr: string): string {
  // Convert from "MM/DD/YY" to "YYYY-MM-DD"
  if (!dateStr) return "";
  
  const parts = dateStr.split('/');
  if (parts.length !== 3) return "";
  
  const month = parts[0];
  const day = parts[1];
  const year = `20${parts[2]}`; // Assuming YY format for year
  
  return `${year}-${month}-${day}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Define the getServerSideProps function to fetch event data
export async function getServerSideProps(context: {params: {id: string}}) {
  const { id } = context.params;
  
  try {
    // Get access token - we call this but don't need to use the token for the demo data
    await getAccessToken();
    
    // In a production environment, you would fetch the specific event from API
    // For demo purposes, using sample data
    const sampleEventData = {
      "id": id || "1",
      "name": "Princess Victory 3rd Birthday",
      "location": "Lagos Nigeria",
      "description": "Princess Victory 3rd Birthday! Join us for this special celebration with cake, games, and fun activities for all ages.",
      "start_date": "07/10/25",
      "start_time": "16:28:00",
      "end_date": "07/10/25",
      "end_time": "17:00:00",
      "poster_id": "1",
      "cover": "https://waocard.co/app/upload/photos/2024/11/8eys4xjCQ6XCb1KtdIF5_10_94a2df85ff39b6849b45d837ee90c2b3_cover.jpg",
      "user_data": {
        "user_id": "1",
        "name": "MORGAN VICTOR",
        "avatar": "https://waocard.co/app/upload/photos/d-avatar.jpg?cache=0",
        "url": "https://waocard.co/app/admin",
        "is_verified": 1,
        "lat": "9.0570752",
        "lng": "7.4514432"
      },
      "url": `https://waocard.co/app/events/${id}/`,
      "is_going": false,
      "is_interested": false,
      "going_count": "0",
      "interested_count": "0"
    };
    
    return {
      props: {
        event: sampleEventData
      }
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return {
      notFound: true
    };
  }
}

export default EventDetailPage;