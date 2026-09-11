import { useState } from "react";
import { editVenue } from "../api/venueManagement";
import type { VenueApiData } from "@/features/venues/types/venue.types";
import type { CreateVenueValues } from "../schema/venueManagementSchema";

export function useEditVenue() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEditVenue(
    id: string,
    values: CreateVenueValues,
  ): Promise<VenueApiData | null> {
    setError(null);
    setIsLoading(true);
    try {
      const response = await editVenue(id, values);
      return response.data;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to updated your venue. Please try again!",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { handleEditVenue, isLoading, error };
}
