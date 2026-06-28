import VenueCard from "@/components/ui/VenueCard";
import PageWrapper from "@/components/layout/PageWrapper";
import Pagination from "@/components/ui/Pagination";
import { useVenuePagination } from "@/hooks/useVenuePagination";
import { useVenues } from "@/hooks/useVenue";

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
