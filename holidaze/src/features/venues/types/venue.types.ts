import type { Booking } from "@/features/bookings/types/booking.types";

export interface VenueApiData {
  id: string;
  name: string;
  description: string;
  media?: Media[];
  price: number;
  maxGuests: number;
  rating?: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
  bookings?: Booking[];
}

export interface Media {
  url: string;
  alt: string;
}

export interface VenueMeta {
  wifi?: boolean;
  parking?: boolean;
  breakfast?: boolean;
  pets?: boolean;
}

export interface VenueLocation {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
}

export interface VenueQueryParams {
  limit?: number;
  page?: number;
  sort?: keyof VenueApiData;
  sortOrder?: "asc" | "desc";
}

// should this be in venue folder? it is needed for cal availablity but also BookingSection. shared later?
// export interface Booking {
//   id: string;
//   dateFrom: string;
//   dateTo: string;
//   guests: number;
//   created: string;
//   updated: string;
// }
