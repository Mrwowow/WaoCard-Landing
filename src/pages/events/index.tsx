// pages/events/index.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext';
import { getAccessToken, getEvents } from "@/utils/api";

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';

// Types
interface Event {
  id: string;
  name: string;
  description: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  cover: string;
  url: string;
  location: string;
  going_count: string;
  interested_count: string;
}

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

// Custom event card component
const FuturisticEventCard = ({ event }: { event: Event }) => {
  // Parse dates for formatting
  const startDate = new Date(
    event.start_date.includes('/') 
      ? `20${event.start_date.split('/')[2]}-${event.start_date.split('/')[0]}-${event.start_date.split('/')[1]}` 
      : event.start_date
  );
  
  return (
    <div className="glass-panel p-4 relative group overflow-hidden">
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
        <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
      </div>
      
      <Link href={`/events/${event.id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
          <Image
            src={getImageUrl(event.cover)}
            alt={event.name}
            width={300}
            height={200}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-2 left-2 z-20 bg-[rgba(255,149,0,0.9)] text-black text-xs px-2 py-1 rounded-md font-medium">
            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF9500] transition-colors">{event.name}</h3>
      </Link>

      <p className="text-[rgba(255,255,255,0.7)] text-sm mb-4">{event.description?.slice(0, 80) || ''}...</p>
      
      <div className="flex items-center justify-between">
        <div className="text-[rgba(255,255,255,0.6)] text-xs flex items-center">
          <span className="inline-block w-1 h-1 rounded-full bg-[#FF9500] mr-1"></span>
          {event.start_time}
        </div>
        
        <div className="flex gap-2">
          <span className="text-xs bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded border border-[rgba(255,255,255,0.1)]">
            {event.going_count || '0'} Going
          </span>
        </div>
      </div>
    </div>
  );
};

// Custom section renderer
const EventSection = ({ title, events, emptyMessage }: { title: string, events: Event[], emptyMessage: string }) => {
  if (events.length === 0) {
    return (
      <div className="bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] rounded-lg p-6 text-center">
        <p className="text-[rgba(255,255,255,0.5)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-6 relative inline-flex items-center">
        {title}
        <span className="ml-3 w-12 h-[1px] bg-gradient-to-r from-[rgba(255,149,0,0.7)] to-transparent"></span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <FuturisticEventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
};

export default function EventsPage({ events }: { events: Event[] }) {
  const { isAuthenticated, login } = useAuth();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('explore');
  
  // Demo data for user events sections
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [goingEvents, setGoingEvents] = useState<Event[]>([]);
  const [interestedEvents, setInterestedEvents] = useState<Event[]>([]);
  const [invitedEvents, setInvitedEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Demo: Populate user event sections with sample data
    // In a real app, these would come from API calls
    if (events.length > 0 && isAuthenticated) {
      // Simulate personal events for demo purposes
      setMyEvents(events.slice(0, 1));
      setGoingEvents(events.slice(0, 2));
      setInterestedEvents(events.slice(0, 1));
      setInvitedEvents(events.slice(0, 1));
      setPastEvents([]);
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [events, isAuthenticated]);

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      (event.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // In a real app, you would filter by actual category data
    const matchesCategory = activeCategory === 'all' ? true : true;
    
    return matchesSearch && matchesCategory;
  });

  // Event categories for demo
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'concerts', name: 'Concerts' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'conferences', name: 'Conferences' },
    { id: 'sports', name: 'Sports' },
    { id: 'networking', name: 'Networking' }
  ];

  // Section tabs
  const sectionTabs = [
    { id: 'explore', name: 'Explore', requiresAuth: false },
    { id: 'my-events', name: 'My Events', requiresAuth: true },
    { id: 'going', name: 'Going', requiresAuth: true },
    { id: 'interested', name: 'Interested', requiresAuth: true },
    { id: 'invited', name: 'Invited', requiresAuth: true },
    { id: 'past', name: 'Past Events', requiresAuth: true }
  ];

  return (
    <div className="min-h-screen bg-black font-sans overflow-x-hidden relative">
      <Head>
        <title>Events | WaoCard</title>
        <meta name="description" content="Discover and manage all your WaoCard events in one place." />
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
      
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-20 relative z-10">
        <div className="glass-panel p-8 mb-10 relative">
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-16 h-16">
            <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-[rgba(255,149,0,0.5)] to-transparent"></div>
            <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[rgba(255,149,0,0.5)] to-transparent"></div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">
            Upcoming <span className="gradient-text">Events</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] max-w-2xl">
            Discover and manage all your WaoCard events in one place. Use your WaoCard for seamless ticket purchases and event check-ins.
          </p>
        </div>
        
        {/* Search and filter bar */}
        <div className="glass-panel p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[rgba(0,0,0,0.4)] text-white border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF9500] placeholder-[rgba(255,255,255,0.5)]"
              />
              <div className="absolute right-3 top-3 text-[rgba(255,255,255,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-[rgba(255,255,255,0.6)]">Filter:</span>
              <select 
                className="bg-[rgba(0,0,0,0.4)] text-white border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-3 focus:outline-none focus:border-[#FF9500]"
                onChange={(e) => setActiveCategory(e.target.value)}
                value={activeCategory}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              <button 
                className="btn btn-primary py-3"
                onClick={() => isAuthenticated ? alert('Create event form would open here') : login()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Create Event
              </button>
            </div>
          </div>
        </div>
        
        {/* Section tabs */}
        <div className="overflow-x-auto mb-8">
          <div className="flex flex-nowrap gap-2 p-1 bg-[rgba(0,0,0,0.2)] rounded-xl backdrop-blur-sm min-w-max">
            {sectionTabs.map((tab) => (
              (!tab.requiresAuth || (tab.requiresAuth && isAuthenticated)) && (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative whitespace-nowrap ${
                    activeSection === tab.id 
                      ? 'bg-gradient-to-br from-[#FF9500] to-[#E08600] text-white' 
                      : 'glass-panel text-white hover:border-[rgba(255,149,0,0.3)]'
                  }`}
                  onClick={() => setActiveSection(tab.id)}
                >
                  {activeSection === tab.id && (
                    <div className="absolute -inset-[2px] bg-[rgba(255,149,0,0.3)] rounded-lg blur-md -z-10"></div>
                  )}
                  {tab.name}
                </button>
              )
            ))}
          </div>
        </div>
        
        {/* Active section content */}
        <div>
          {activeSection === 'explore' && (
            <EventSection 
              title="Discover Events" 
              events={filteredEvents} 
              emptyMessage="No events found. Try a different search term or filter." 
            />
          )}
          
          {activeSection === 'my-events' && (
            <EventSection 
              title="Events You&apos;re Hosting" 
              events={myEvents} 
              emptyMessage="You haven&apos;t created any events yet." 
            />
          )}
          
          {activeSection === 'going' && (
            <EventSection 
              title="Events You&apos;re Attending" 
              events={goingEvents} 
              emptyMessage="You haven&apos;t confirmed attendance for any events yet." 
            />
          )}
          
          {activeSection === 'interested' && (
            <EventSection 
              title="Events You&apos;re Interested In" 
              events={interestedEvents} 
              emptyMessage="You haven&apos;t marked any events as interested yet." 
            />
          )}
          
          {activeSection === 'invited' && (
            <EventSection 
              title="Event Invitations" 
              events={invitedEvents} 
              emptyMessage="You don&apos;t have any event invitations." 
            />
          )}
          
          {activeSection === 'past' && (
            <EventSection 
              title="Past Events" 
              events={pastEvents} 
              emptyMessage="You haven&apos;t attended any past events yet." 
            />
          )}
        </div>
        
        {/* Sign in prompt for unauthenticated users */}
        {!isAuthenticated && (
          <div className="mt-16 glass-panel p-8 border border-[rgba(255,149,0,0.2)]">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">Sign In</span> to Manage Your Events
              </h3>
              <p className="text-[rgba(255,255,255,0.7)] mb-6 max-w-xl mx-auto">
                Create your own events, track events you&apos;re attending, and keep up with invitations by signing in to your WaoCard account.
              </p>
              <button 
                className="btn btn-primary"
                onClick={login}
              >
                Sign In with WaoCard
              </button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const tokenResponse = await getAccessToken();
    const accessToken = tokenResponse.access_token;
    const apiResponse = await getEvents(accessToken);
    
    // Add fallback data in case API returns invalid data
    const events = Array.isArray(apiResponse) ? apiResponse.map((event) => ({
      id: event.id,
      name: event.name || "Untitled Event",
      description: event.description || "Join us for this exciting event!",
      start_date: event.start_date || "2025-05-01",
      start_time: event.start_time || "19:00",
      end_date: event.end_date || "2025-05-01",
      end_time: event.end_time || "21:00", 
      cover: event.cover || "/event-placeholder.png",
      url: event.url || "#",
      location: event.location || "Lagos, Nigeria",
      going_count: event.going_count || "0",
      interested_count: event.interested_count || "0"
    })) : [];
    
    return { 
      props: { events }, 
      revalidate: 10 
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    // Return empty events array as fallback
    return { 
      props: { events: [] }, 
      revalidate: 10 
    };
  }
};