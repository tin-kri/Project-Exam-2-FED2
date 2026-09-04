import type { VenueApiData } from "@/features/venues/types/venue.types";
import type { ApiResponse } from "@/types/types";
 import type { Booking } from "@/features/bookings/types/booking.types";

export type CreateVenueResponse = ApiResponse<VenueApiData>; 
export type ManagerVenuesResponse = ApiResponse<VenueApiData[]>;
export type EditVenueResponse = ApiResponse<VenueApiData>;

export interface VenueBooking extends Booking {
    customer?: {
        name:string;
        email:string;
            avatar?: { url: string; alt?: string };
    }
}

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