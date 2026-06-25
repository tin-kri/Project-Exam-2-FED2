import { apiFetch } from "./base";
import type {
  ApiResponse,
  VenueApiData,
  VenueQueryParams,
} from "../types/types";

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
