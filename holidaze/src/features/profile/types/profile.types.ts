import type { VenueApiData } from "@/features/venues/types/venue.types";

export interface Profile {
  name: string;
  email: string;
  venueManager: boolean;
  avatar?: {
    url: string;
    alt?: string;
  };
  venues?: VenueApiData[];
  bookings?: VenueApiData[];
  _count: {
    bookings: number;
    venues: number;
  };
}



