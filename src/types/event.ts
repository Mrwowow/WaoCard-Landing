// types/event.ts

export interface EventUser {
    name: string;
    avatar: string;
    url: string;
    user_id: string;
  }
  
  export interface EventOrganizer extends EventUser {
    is_verified: number;
    lat?: string;
    lng?: string;
  }
  
  export interface Event {
    id: string;
    name: string;
    location: string;
    description: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    poster_id: string;
    cover: string;
    user_data: EventOrganizer;
    url: string;
    is_going: boolean;
    is_interested: boolean;
    going_count: string;
    interested_count: string;
  }