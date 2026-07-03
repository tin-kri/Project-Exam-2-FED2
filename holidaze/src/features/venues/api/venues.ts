import { apiFetch } from "../../../api/base";
import type { ApiResponse } from "@/types/types"; 
import type { VenueApiData, VenueQueryParams, Booking } from "../types/venue.types";
 

export function getVenues(
  params: VenueQueryParams = {},
): Promise<ApiResponse<VenueApiData[]>> {
  const query = new URLSearchParams();

  if (params.limit) query.set("limit", String(params.limit));
  if (params.page) query.set("page", String(params.page));
  if (params.sort) query.set("sort", params.sort);
  if (params.sortOrder) query.set("sortOrder", params.sortOrder);

  const queryString = query.toString();
  const endpoint = queryString ? `/venues?${queryString}` : "/venues";

  return apiFetch<ApiResponse<VenueApiData[]>>(endpoint);
}

export function getVenueById(id: string): Promise<ApiResponse<VenueApiData>> {
  return apiFetch<ApiResponse<VenueApiData>>(`/venues/${id}`);
}

// search
export function searchVenues(q: string): Promise<ApiResponse<VenueApiData[]>> {
  const params = new URLSearchParams({ q });
  return apiFetch<ApiResponse<VenueApiData[]>>(`/venues/search?${params}`);
}

//  venue bookings availability 
export function getBookingByVenue(id: string): Promise<ApiResponse<VenueApiData>> {
 
     return apiFetch<ApiResponse<VenueApiData>>(`/venues/${id}?_bookings=true`);
}