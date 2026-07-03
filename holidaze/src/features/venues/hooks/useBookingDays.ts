import { useMemo } from "react";
import type { Booking } from "@/features/venues/types/venue.types";
 
type DateRange = {
  from: Date;
  to: Date;
};
 
export function useBookedDates(bookings: Booking[] | undefined): DateRange[] {
  return useMemo(() => {
    if (!bookings || bookings.length === 0) return [];
 
    return bookings.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    }));
  }, [bookings]);
}
 


