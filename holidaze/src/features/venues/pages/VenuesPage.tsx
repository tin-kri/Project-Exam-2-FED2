import PageWrapper from "@/components/layout/PageWrapper";
import VenueCard from "@/features/venues/components/VenueCard";
import SearchBar from "@/features/venues/components/SearchBar";
import VenueSort from "@/features/venues/components/VenueSort";
import Pagination from "@/features/venues/components/Pagination";
import { useVenuesPage } from "@/features/venues/hooks/useVenuesPage";
import {
  DEFAULT_SORT,
  type SortField,
  type SortOrder,
} from "@/features/venues/utils/sortVenues";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "@/components/layout/HolidazeBreadcrumbs";

/**
 * Displays the venue listing page.
 *
 * Handles venue searching, sorting, loading and error states,
 * and pagination. Search and sorting values are stored in the URL
 * so they can be shared and preserved when navigating.
 */
export default function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const sort = (searchParams.get("sort") as SortField) ?? DEFAULT_SORT.sort;
  const sortOrder =
    (searchParams.get("order") as SortOrder) ?? DEFAULT_SORT.sortOrder;

  const {
    venues,
    meta,
    isLoading,
    error,
    isSearching,
    nextPage,
    previousPage,
  } = useVenuesPage(query, sort, sortOrder);

  /**
   * Updates the search query in the URL.
   *
   * Removes the query parameter when the search field is empty.
   * The current browser history entry is replaced to avoid creating
   * a new history entry for every character typed.
   *
   * @param value - The search query entered by the user.
   */
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
      { replace: true }, // replace so typing doesn't spam browser history
    );
  }

  function handleSortChange(nextSort: SortField, nextOrder: SortOrder) {
    setSearchParams(
      (prev) => {
        prev.set("sort", nextSort);
        prev.set("order", nextOrder);
        return prev;
      },
      { replace: true },
    );
  }

  return (
    <PageWrapper>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
        ]}
      />
      <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">
        Search Venues
      </h1>
      <SearchBar value={query} onChange={handleQueryChange} />
      <VenueSort
        sort={sort}
        sortOrder={sortOrder}
        onChange={handleSortChange}
      />

      {isLoading && (
        <p className="mt-8 text-sm text-grey-900">Loading venues...</p>
      )}
      {error && (
        <p className="mt-8 text-sm text-destructive">
          Something went wrong: {error}
        </p>
      )}
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
