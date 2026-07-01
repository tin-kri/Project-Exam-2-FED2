import { useState, useEffect, useMemo } from "react";
import { searchVenues } from "@/features/venues/api/venues";
import type { ApiMeta } from "@/types/types";
import type { VenueApiData} from "../types/venue.types";
import { useDebounce } from "@/hooks/useDebounce";

export function useVenueSearch(query: string) {
  const [results, setResults] = useState<VenueApiData[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounce = useDebounce(query, 400);

  useEffect(() => {
    if (!debounce.trim()) {
      setResults([]);
      return;
    }
    let active = true;
    setIsLoading(true);
    setError(null);

    searchVenues(debounce)
      .then((response) => {
        if (!active) return;
        setResults(response.data);
        setMeta(response.meta);
        setIsLoading(true);
      })
      .catch((error) => {
        if (!active) return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  },[debounce]);

  return { results, meta, isLoading, error };
}
