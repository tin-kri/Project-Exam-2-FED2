import { fetchVenues } from "@/api/base";
import type { Profile } from "../types/profile.types";

export function getProfile(name: string): Promise<{ data: Profile }> {
  return fetchVenues<{ data: Profile }>(
    `profiles/${name}?_bookings=true&_venues=true`,
  );
}