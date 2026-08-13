import { fetchVenues } from "@/api/base";
import type { Profile } from "../types/profile.types";

export function getBookings(name: string): Promise<{ApiResponse<BookingVenue }> {
  return fetchVenues<{ data: Profile }>(
    `profiles/${name}?_bookings=true&_venues=true`,
  );
}