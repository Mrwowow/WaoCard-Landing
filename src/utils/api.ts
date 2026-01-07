// utils/api.ts
import { Event, EventOrganizer, EventUser } from '@/types/event';

// Add explicit types for API responses
interface AuthResponse {
  api_status?: number;
  access_token: string;
  user_id?: string;
  // Add other properties if needed
}

interface EventsResponse {
  api_status?: number;
  events: Event[];
}

interface EventResponse {
  api_status?: number;
  event?: Event | null;
  data?: {
    event?: Event;
  };
}

interface EventAttendeesResponse {
  api_status?: number;
  users: EventUser[];
}

interface EventAttendanceResponse {
  api_status?: number;
  message?: string;
}

// Update Event interface to use proper typing for user_data
export interface ApiEvent extends Omit<Event, 'user_data'> {
  user_data: EventOrganizer;
}

// Authentication
export const getAccessToken = async (): Promise<AuthResponse> => {
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  formdata.append("username", "admin");
  formdata.append("password", "Possible@2025");
  formdata.append("device_type", "windows");

  try {
    const response = await fetch("https://waocard.co/app/api/auth", {
      method: "POST",
      headers: new Headers(),
      body: formdata,
    });
    const result = await response.text();
    const data = JSON.parse(result) as AuthResponse;
    return data;
  } catch (error) {
    console.error("Authentication error:", error);
    return { 
      access_token: "dummy-token-for-development",
      api_status: 200
    };
  }
};

// Get all events
export const getEvents = async (accessToken: string): Promise<Event[]> => {
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  formdata.append("fetch", "events");
  
  try {
    const response = await fetch(
      `https://waocard.co/app/api/get-events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: new Headers(),
        body: formdata
      }
    );
    const result = await response.json() as EventsResponse;
    return result.events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    
    // Return sample events for development
    return getSampleEvents();
  }
};

// Helper function to get sample events
const getSampleEvents = (): Event[] => {
  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const dateStr = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth() + 1).padStart(2, '0')}-${String(nextWeek.getDate()).padStart(2, '0')}`;
  
  return Array.from({ length: 10 }, (_, index) => ({
    id: `sample-${index + 1}`,
    name: `Sample Event ${index + 1}`,
    description: "This is a sample event description for development purposes.",
    location: "San Francisco, CA",
    start_date: dateStr,
    start_time: "18:00:00",
    end_date: dateStr,
    end_time: "20:00:00",
    poster_id: "1",
    cover: "/event-placeholder.png",
    user_data: {
      user_id: "sample-organizer",
      name: "Demo Organizer",
      avatar: "/event-placeholder.png",
      url: "#",
      is_verified: 1
    },
    url: `/events/sample-${index + 1}`,
    is_going: false,
    is_interested: false,
    going_count: `${Math.floor(Math.random() * 100)}`,
    interested_count: `${Math.floor(Math.random() * 100)}`
  }));
};

// Get specific event by ID
export const getEventById = async (accessToken: string, eventId: string): Promise<Event | null> => {
  try {
    // Try multiple approaches to get the event data
    let event = await getEventDirectly(accessToken, eventId);
    
    // If direct event fetch failed, try getting all events and filtering
    if (!event) {
      console.log("Direct event fetch failed, trying to get from event list");
      const allEvents = await getEvents(accessToken);
      event = allEvents.find(e => e.id === eventId) || null;
    }
    
    if (event) {
      return event;
    }
    
    // If no event found, return a sample one for development
    return getSampleEvent(eventId);
  } catch (error) {
    console.error("Error in getEventById:", error);
    
    // Fallback to a sample event if all API calls fail
    return getSampleEvent(eventId);
  }
};

// Helper function to get a sample event with specific ID
const getSampleEvent = (eventId: string): Event => {
  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const dateStr = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth() + 1).padStart(2, '0')}-${String(nextWeek.getDate()).padStart(2, '0')}`;
  
  return {
    id: eventId,
    name: `Sample Event ${eventId}`,
    description: "This is a sample event description for development purposes.",
    location: "San Francisco, CA",
    start_date: dateStr,
    start_time: "18:00:00",
    end_date: dateStr,
    end_time: "20:00:00",
    poster_id: "1",
    cover: "/event-placeholder.png",
    user_data: {
      user_id: "sample-organizer",
      name: "Demo Organizer",
      avatar: "/event-placeholder.png",
      url: "#",
      is_verified: 1
    },
    url: `/events/${eventId}`,
    is_going: false,
    is_interested: false,
    going_count: "42",
    interested_count: "89"
  };
};

// Helper function to try direct API call
async function getEventDirectly(accessToken: string, eventId: string): Promise<Event | null> {
  
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  // Support both parameter naming conventions
  formdata.append("event_id", eventId);
  formdata.append("id", eventId);
  formdata.append("fetch", "events");
  
  const endpoints = [
    `https://waocard.co/app/api/get-event?access_token=${accessToken}`,
    `https://waocard.co/app/api/get_event_by_id?access_token=${accessToken}`,
    `https://waocard.co/app/api/get_event?access_token=${accessToken}`
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers(),
        body: formdata
      });
      
      const rawResponse = await response.text();
      console.log(`Raw response from ${endpoint}:`, rawResponse.substring(0, 300));
      
      let result;
      try {
        result = JSON.parse(rawResponse) as EventResponse;
      } catch (e) {
        console.error(`Error parsing response from ${endpoint}:`, e);
        continue; // Try next endpoint
      }
      
      // Try to extract event from different possible response structures
      let event = result.event;
      
      // Some API endpoints might nest the event under 'data.event'
      if (!event && result.data?.event) {
        event = result.data.event;
      }
      
      if (event) {
        return event;
      }
    } catch (error) {
      console.error(`Error with endpoint ${endpoint}:`, error);
      // Continue to next endpoint
    }
  }
  
  return null;
};

// Update event attendance status
export const updateEventAttendance = async (
  accessToken: string, 
  eventId: string, 
  status: 'going' | 'interested' | 'none'
): Promise<boolean> => {
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  formdata.append("event_id", eventId);
  formdata.append("going", status === 'going' ? '1' : '0');
  formdata.append("interested", status === 'interested' ? '1' : '0');
  
  try {
    const response = await fetch(
      `https://waocard.co/app/api/update-event-going?access_token=${accessToken}`,
      {
        method: "POST",
        headers: new Headers(),
        body: formdata
      }
    );
    const result = await response.json() as EventAttendanceResponse;
    return result.api_status === 200;
  } catch (error) {
    console.error("Error updating event attendance:", error);
    return false;
  }
};

// Get event attendees
export const getEventAttendees = async (
  accessToken: string,
  eventId: string
): Promise<EventUser[]> => {
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  formdata.append("event_id", eventId);
  
  try {
    const response = await fetch(
      `https://waocard.co/app/api/get-event-going?access_token=${accessToken}`,
      {
        method: "POST",
        headers: new Headers(),
        body: formdata
      }
    );
    const result = await response.json() as EventAttendeesResponse;
    return result.users || [];
  } catch (error) {
    console.error("Error fetching event attendees:", error);
    
    // Fallback to sample attendees
    return getSampleAttendees();
  }
};

// Helper function to get sample attendees
const getSampleAttendees = (): EventUser[] => {
  return [
    {
      user_id: "sample-user-1",
      name: "John Doe",
      avatar: "/event-placeholder.png",
      url: "#"
    },
    {
      user_id: "sample-user-2",
      name: "Jane Smith",
      avatar: "/event-placeholder.png",
      url: "#"
    },
    {
      user_id: "sample-user-3",
      name: "Alex Johnson",
      avatar: "/event-placeholder.png",
      url: "#"
    }
  ];
};

// Get similar events
export const getSimilarEvents = async (
  accessToken: string,
  eventId: string
): Promise<Event[]> => {
  try {
    // Fetch all events
    const events = await getEvents(accessToken);
    
    // Filter out the current event and return up to 4 other events
    return events
      .filter(event => event.id !== eventId)
      .slice(0, 4);
  } catch (error) {
    console.error("Error in getSimilarEvents:", error);
    
    // If API fails, use sample data
    const sampleEvents = getSampleEvents();
    return sampleEvents
      .filter(event => event.id !== eventId)
      .slice(0, 4);
  }
};