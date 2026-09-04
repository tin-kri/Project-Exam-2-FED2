import PageWrapper from "@/components/layout/PageWrapper";
import VenueCard from "@/features/venues/components/VenueCard";
import SearchBar from "@/features/venues/components/SearchBar";
import Pagination from "@/features/venues/components/Pagination";
import { useVenuesPage } from "@/features/venues/hooks/useVenuesPage";
import { useSearchParams } from "react-router-dom";

export default function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

function handleQueryChange(value: string) {
    setSearchParams(
      (prev) => {
        if (value.trim()) {
          prev.set("query", value);
        } else {
          prev.delete("query");
        }
        return prev;
      },
      { replace: true }, // set to true so it does not spam browser history per keystroke!
    );
  }


  const {
    venues,
    meta,
    isLoading,
    error,
    isSearching,
    nextPage,
    previousPage,
  } = useVenuesPage(query);

  return (
    <PageWrapper>
      <SearchBar value={query} onChange={handleQueryChange} />

      {isLoading && <p className="mt-8 text-sm text-grey-900">Loading venues...</p>}
      {error && <p className="mt-8 text-sm text-destructive">Something went wrong: {error}</p>}
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