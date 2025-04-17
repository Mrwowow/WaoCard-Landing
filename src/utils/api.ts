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
  event: Event | null;
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
  formdata.append("password", "Possible@2024");
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
    return { access_token: "" };
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
    return [];
  }
};

// Get specific event by ID
export const getEventById = async (accessToken: string, eventId: string): Promise<Event | null> => {
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  formdata.append("event_id", eventId);
  
  try {
    const response = await fetch(
      `https://waocard.co/app/api/get-event?access_token=${accessToken}`,
      {
        method: "POST",
        headers: new Headers(),
        body: formdata
      }
    );
    const result = await response.json() as EventResponse;
    return result.event || null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
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
    return [];
  }
};

// Get similar events
export const getSimilarEvents = async (
  accessToken: string,
  eventId: string
): Promise<Event[]> => {
  // In a real app, you would have an endpoint for this
  // For demo purposes, we'll just fetch all events
  const events = await getEvents(accessToken);
  return events.filter(event => event.id !== eventId).slice(0, 4);
};