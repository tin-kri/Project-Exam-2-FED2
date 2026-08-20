import type { VenueApiData } from "@/features/venues/types/venue.types";
import type { ApiResponse } from "@/types/types";
 

export type CreateVenueResponse = ApiResponse<VenueApiData>; 


// export interface VenueApiData {
//   id: string;
//   name: string;
//   description: string;
//   media?: Media[];
//   price: number;
//   maxGuests: number;
//   rating?: number;
//   created: string;
//   updated: string;
//   meta: VenueMeta;
//   location: VenueLocation;
//   bookings?: Booking[];
// }

// export interface ApiResponse<T> {
//   data: T;
//   meta: ApiMeta;
// }