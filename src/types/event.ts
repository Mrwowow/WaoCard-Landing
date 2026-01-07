// types/event.ts

export interface EventUser {
  user_id: string;
  name: string;
  avatar: string;
  url: string;
  is_verified?: number;
  lat?: string;
  lng?: string;
}

  
  export interface EventOrganizer extends EventUser {
    is_verified: number;
    lat?: string;
    lng?: string;
  }
  
export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  poster_id: string;
  cover: string;
  content?: string;
  ticket_price?: string;
  user_data: EventUser;
  url: string;
  is_going: boolean;
  is_interested: boolean;
  going_count: string;
  interested_count: string;
  lat?: string; // Some APIs may include lat/lng directly on the event
  lng?: string;
}