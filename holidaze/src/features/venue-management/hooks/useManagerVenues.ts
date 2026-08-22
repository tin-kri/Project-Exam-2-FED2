import { useState, useEffect } from "react";
import { getManagerVenues } from "../api/venueManagement";
import { useAuthStore } from "@/features/auth/stores/authStore";
import type { VenueApiData } from "@/features/venues/types/venue.types";

export function useManagerVenues() {
  const user = useAuthStore((state) => state.user);
  const [venues, setVenues] = useState<VenueApiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.name) return;

    let active = true;

    getManagerVenues(user.name)
      .then((response) => {
        if (!active) return;
        setVenues(response.data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        if (!active) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user?.name]);

  return { venues, isLoading, error };
}