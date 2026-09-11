import { useState } from "react";
import { createVenue } from "../api/venueManagement";
import type { VenueApiData } from "@/features/venues/types/venue.types";
import type { CreateVenueValues } from "../schema/venueManagementSchema";

export function useCreateVenue() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateVenue(
    values: CreateVenueValues,
  ): Promise<VenueApiData | null> {
    setError(null);
    setIsLoading(true);
    try {
      const response = await createVenue(values);
      return response.data;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create your new venue. Please try again!",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { handleCreateVenue, isLoading, error };
}
