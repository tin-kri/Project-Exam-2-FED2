import { useState, useEffect, useMemo } from "react";
import { getVenues } from "@/features/venues/api/venues";
import type {
  VenueApiData,
  VenueQueryParams,
} from "@/features/venues/types/venue.types";
import type { ApiMeta } from "@/types/types";

export function useVenues(params: VenueQueryParams) {
  const [venues, setVenues] = useState<VenueApiData[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stableParams = useMemo(
    () => params,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.page, params.limit, params.sort, params.sortOrder],
  );

  useEffect(() => {
    let active = true;

    getVenues(stableParams)
      .then((res) => {
        if (!active) return;
        setVenues(res.data);
        setMeta(res.meta);
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
  }, [stableParams]);

  return { venues, meta, isLoading, error };
}
