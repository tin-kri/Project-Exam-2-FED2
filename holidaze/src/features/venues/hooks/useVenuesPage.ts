import { useVenues } from "./useVenues";
import { useVenuePagination } from "./useVenuePagination";
import { useVenueSearch } from "./useVenueSearch";

const LIMIT = 24;

export function useVenuesPage(query: string) {
  const { page, nextPage, previousPage, reset } = useVenuePagination();

  const {
    venues: allVenues,
    meta,
    isLoading: listLoading,
    error: listError,
  } = useVenues({ page, limit: LIMIT });

  const {
    results: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useVenueSearch(query);

  const isSearching = query.trim().length > 1;
  const venues = isSearching ? searchResults : allVenues;
  const isLoading = isSearching ? searchLoading : listLoading;
  const error = isSearching ? searchError : listError;

  return {
    venues,
    meta,
    isLoading,
    error,
    isSearching,
    query,
    nextPage,
    previousPage,
    page,
    reset,
  };
}
