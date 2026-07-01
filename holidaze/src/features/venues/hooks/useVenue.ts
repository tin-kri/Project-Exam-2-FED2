import { useState, useEffect } from "react";
import { getVenueById } from "@/features/venues/api/venues";
import type { VenueApiData } from "../types/venue.types";

export function useVenue(id: string | undefined) {
  const [venue, setVenue] = useState<VenueApiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let active = true;

    getVenueById(id)
      .then((res) => {
        if (!active) return;
        setVenue(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  return { venue, isLoading, error };
}
