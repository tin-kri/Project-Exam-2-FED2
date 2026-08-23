import { holidazeFetch } from "@/api/base";
import type { CreateVenueResponse, ManagerVenuesResponse, EditVenueResponse } from "../types/venueManagement.types";
import type { CreateVenueValues } from "../schema/venueManagementSchema";

export function createVenue(values: CreateVenueValues): Promise<CreateVenueResponse> {
    return holidazeFetch("venues", {
        method: "POST",
        body: JSON.stringify(values)
    })
}

export function editVenue(
  id: string,
  values: CreateVenueValues,
): Promise<EditVenueResponse> {
  return holidazeFetch(`venues/${id}`, {
    method: "PUT",
    body: JSON.stringify(values),
  });
}

export function getManagerVenues(name: string): Promise<ManagerVenuesResponse>{
  return holidazeFetch(`profiles/${name}/venues?_bookings=true`);
}
