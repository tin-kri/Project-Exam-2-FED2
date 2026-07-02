import PageWrapper from "@/components/layout/PageWrapper";
import VenueCard from "@/features/venues/components/VenueCard";
import SearchBar from "@/features/venues/components/SearchBar";
import Pagination from "@/features/venues/components/Pagination";
import { useVenuesPage } from "@/features/venues/hooks/useVenuesPage";

export default function VenuesPage() {
  const {
    venues,
    meta,
    isLoading,
    error,
    isSearching,
    query,
    onQueryChange,
    nextPage,
    previousPage,
  } = useVenuesPage();

  return (
    <PageWrapper>
      <SearchBar value={query} onChange={onQueryChange} />

      {isLoading && <p className="mt-8 text-sm text-grey-900">Loading venues...</p>}
      {error && <p className="mt-8 text-sm text-red-500">Something went wrong: {error}</p>}
      {!isLoading && !error && venues.length === 0 && (
        <p className="mt-8 text-sm text-grey-900">No venues found.</p>
      )}

      {!isLoading && !error && venues.length > 0 && (
        <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
          {venues.map((venue) => (
            <li key={venue.id}>
              <VenueCard venue={venue} />
            </li>
          ))}
        </ul>
      )}

      {!isSearching && meta && (
        <Pagination
          meta={meta}
          onNext={() => nextPage(meta)}
          onPrevious={() => previousPage(meta)}
        />
      )}
    </PageWrapper>
  );
}