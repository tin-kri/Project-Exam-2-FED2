import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import type { VenueApiData } from "../types/types";
import VenueCard from "@/components/ui/VenueCard";
import PageWrapper from "@/components/layout/PageWrapper";

export default function VenuesPage() {
  const [venues, setVenues] = useState<VenueApiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVenues()
      .then((response) => setVenues(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading venues...</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (venues.length === 0) return <p>No venues found.</p>;

  return (
    <PageWrapper>
     
            <ul className="mt-6 grid list-none  gap-4 md:grid-cols-2">
          {venues.map((venue) => (
            <li key={venue.id}>
              <VenueCard venue={venue} />
            </li>
          ))}
        </ul>

      
    </PageWrapper>
  );
}
