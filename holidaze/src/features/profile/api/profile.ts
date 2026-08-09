import { fetchVenues } from "@/api/base";
import type { Profile } from "../types/profile.types";

export function getProfile(name: string): Promise<{ data: Profile }> {
  return fetchVenues<{ data: Profile }>(
    `profiles/${name}?_bookings=true&_venues=true`,
  );
}

export function changeAvatar(
  name: string,
  avatar: { url: string; alt?: string },
): Promise<{ data: Profile }> {
  return fetchVenues<{ data: Profile }>(`profiles/${name}`, {
    method: "PUT",
    body: JSON.stringify({ avatar }),
  });
}