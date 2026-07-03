import { useState, useEffect } from "react";
import { searchVenues } from "@/features/venues/api/venues";
import type { VenueApiData } from "../types/venue.types";
import type { ApiMeta } from "@/types/types";
import { useDebounce } from "@/hooks/useDebounce";

export function useVenueSearch(query: string) {
  const [results, setResults] = useState<VenueApiData[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setMeta(null)
      setError(null)
      setIsLoading(false)
      return;
    }

    let active = true;
    setIsLoading(true);
    setError(null);

    searchVenues(debouncedQuery)
      .then((response) => {
        if (!active) return;
        setResults(response.data);
        setMeta(response.meta);
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
  }, [debouncedQuery]);

  return { results, meta, isLoading, error };
}