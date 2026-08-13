import type { VenueApiData } from "@/features/venues/types/venue.types";

export interface Booking {
    id: string;
    dateFrom:string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
}

export interface BookingVenue extends Booking {
    venue: VenueApiData
}