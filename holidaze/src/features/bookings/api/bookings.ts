import type { ApiResponse } from "@/types/types";
import type { BookingVenue } from "../types/booking.types";
import { holidazeFetch } from "@/api/base";

export function getUserBookings(name: string): Promise<ApiResponse<BookingVenue[]>> {
  return holidazeFetch(`profiles/${name}/bookings?_venue=true`);
}