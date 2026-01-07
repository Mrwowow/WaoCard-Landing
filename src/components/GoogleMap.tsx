// components/GoogleMap.tsx
import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  location: string;
  lat: number;
  lng: number;
  className?: string;
}

declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
    [key: string]: (() => void) | typeof google | undefined;
  }
}

const GoogleMap = ({ location, lat, lng, className = '' }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Validate coordinates and API key
  const validLat = !isNaN(lat) && lat !== 0;
  const validLng = !isNaN(lng) && lng !== 0;
  const hasValidCoordinates = validLat && validLng;
  const hasApiKey = !!apiKey;
  
  useEffect(() => {
    // Reset states on component mount/update
    setIsLoading(true);
    
    // Check for API key first
    if (!apiKey) {
      setMapError('Google Maps API key is missing');
      setIsLoading(false);
      return;
    }
    
    // Check for valid coordinates
    if (!hasValidCoordinates) {
      setIsLoading(false);
      return;
    }
    
    // Reset error state on new attempt
    setMapError(null);

    // Create a script loading error handler
    const handleScriptError = () => {
      console.error('Google Maps script failed to load. Check API key and network connection.');
      console.log('API Key prefix:', apiKey?.substring(0, 8) + '...');
      setMapError('Failed to load Google Maps API. Please check your API key and network connection.');
      setIsLoading(false);
    };

    // This function will be called by Google Maps API when loaded
    const initializeMap = () => {
      if (!window.google?.maps || !mapRef.current) {
        console.error('Google Maps initialized but either window.google.maps or mapRef is not available');
        return;
      }
      
      console.log('Initializing Google Maps with coordinates:', { lat, lng });
      
      try {
        const mapOptions = {
          center: { lat, lng },
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        };

        // Create map instance
        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        
        // Add marker at the event location
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: location,
          animation: window.google.maps.Animation.DROP
        });

        // Add info window with location name
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="color: #000; padding: 5px;">${location}</div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        // Auto-open info window
        setTimeout(() => {
          infoWindow.open(map, marker);
        }, 1000);
        
        // Map successfully loaded
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setMapError('Error initializing Google Maps. Please try again later.');
        setIsLoading(false);
      }
    };

    // Set up global callback for Google Maps
    const callbackName = `initGoogleMap_${Math.random().toString(36).substring(2, 9)}`;
    window[callbackName] = initializeMap;

    // Create script element to load Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = handleScriptError;
    
    // Inject script into document
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      window[callbackName] = undefined;
      script.remove();
    };
  }, [lat, lng, location, apiKey, hasValidCoordinates]);

  return (
    <div className={`glass-panel overflow-hidden rounded-lg p-6 h-full relative ${className}`}>
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
      
      {/* Map Container */}
      <div className="relative h-48 rounded-lg overflow-hidden">
        {/* Handle different rendering states */}
        {!hasApiKey ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e24] border border-[rgba(255,255,255,0.1)]">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgba(255,149,0,0.5)] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-[rgba(255,255,255,0.7)]">Google Maps API key is missing</p>
            </div>
          </div>
        ) : !hasValidCoordinates ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e24] border border-[rgba(255,255,255,0.1)]">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgba(255,149,0,0.5)] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-[rgba(255,255,255,0.7)]">Location coordinates not available</p>
            </div>
          </div>
        ) : isLoading && !mapError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e24] border border-[rgba(255,255,255,0.1)]">
            <div className="text-center p-4">
              <div className="h-8 w-8 border-4 border-[rgba(255,149,0,0.5)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-[rgba(255,255,255,0.7)]">Loading map...</p>
            </div>
          </div>
        ) : mapError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e24] border border-[rgba(255,255,255,0.1)]">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgba(255,149,0,0.5)] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[rgba(255,255,255,0.7)]">{mapError}</p>
            </div>
          </div>
        ) : (
          <div 
            ref={mapRef} 
            className="w-full h-full rounded-lg"
            aria-label={`Map showing location at ${lat}, ${lng}`}
          />
        )}
      </div>

      <div className="mt-4 text-center">
        {!hasValidCoordinates && !location ? (
          <span className="inline-block px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-md text-[rgba(255,255,255,0.5)] text-sm cursor-not-allowed">
            No location data available
          </span>
        ) : (
          <a 
            href={hasValidCoordinates 
              ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}` 
              : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
            } 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[rgba(255,149,0,0.2)] rounded-md text-[#FF9500] text-sm hover:bg-[rgba(255,149,0,0.3)] transition-colors"
          >
            Open in Google Maps
          </a>
        )}
      </div>
    </div>
  );
};

export default GoogleMap;