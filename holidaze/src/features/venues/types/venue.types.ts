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