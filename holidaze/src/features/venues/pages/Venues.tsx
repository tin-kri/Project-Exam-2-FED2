import VenueCard from "../components/VenueCard";
import PageWrapper from "@/components/layout/PageWrapper";
import Pagination from "@/features/venues/components/Pagination";
import { useVenuePagination } from "@/features/venues/hooks/useVenuePagination";
import { useVenues } from "@/features/venues/hooks/useVenues";

const limit = 24;

export default function VenuesPage() {
  const { page, nextPage, previousPage } = useVenuePagination();
  const { venues, meta, isLoading, error } = useVenues({ page, limit: limit });

  if (isLoading) return <p>Loading venues...</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (venues.length === 0) return <p>No venues found.</p>;

  return (
    <PageWrapper>
      <ul className="mt-6 grid list-none gap-4 md:grid-cols-2">
        {venues.map((venue) => (
          <li key={venue.id}>
            <VenueCard venue={venue} />
          </li>
        ))}
      </ul>

      {meta && (
        <Pagination
          meta={meta}
          onNext={() => nextPage(meta)}
          onPrevious={() => previousPage(meta)}
        />
      )}
    </PageWrapper>
  );
}
