import { useState } from "react";
import { deleteVenue } from "../api/venueManagement";

export function useDeleteVenue() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteVenue(id:string): Promise<boolean> {
    setError(null);
    setIsLoading(true);
    try {
     await deleteVenue(id);
      return true;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete venue. Please try again!",
      );
      return (false);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleDeleteVenue, isLoading, error };
}
