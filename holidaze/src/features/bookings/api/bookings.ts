import type { ApiResponse } from "@/types/types";
import type {
  Booking,
  BookingVenue,
  CreateBookingValues,
} from "../types/booking.types";
import { holidazeFetch } from "@/api/base";

export function getUserBookings(
  name: string,
): Promise<ApiResponse<BookingVenue[]>> {
  return holidazeFetch(`profiles/${name}/bookings?_venue=true`);
}

export function createBooking(
  values: CreateBookingValues,
): Promise<ApiResponse<Booking>> {
  return holidazeFetch("bookings", {
    method: "POST",
    body: JSON.stringify(values),
  });
}
