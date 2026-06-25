import { useState, useEffect } from "react";
import { getVenues } from "../api/venues";
import type { VenueApiData, ApiMeta } from "../types/types";

export function useVenues() {
  const [venues, setVenues] = useState<VenueApiData[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getVenues()
      .then((res) => {
        if (!active) return;
        setVenues(res.data);
        setMeta(res.meta);
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return { venues, meta, loading, error };
}
