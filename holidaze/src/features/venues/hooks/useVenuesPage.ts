import { useState } from "react";
import { useVenues } from "./useVenues";
import { useVenuePagination } from "./useVenuePagination";
import { useVenueSearch } from "./useVenueSearch";

const LIMIT = 24;

export function useVenuesPage() {
  const [query, setQuery] = useState("");
  const { page, nextPage, previousPage, reset } = useVenuePagination();

  const { venues: allVenues, meta, isLoading: listLoading, error: listError } =
    useVenues({ page, limit: LIMIT });

  const { results: searchResults, isLoading: searchLoading, error: searchError } =
    useVenueSearch(query);

  const isSearching = query.trim().length > 1;
  const venues = isSearching ? searchResults : allVenues;
  const isLoading = isSearching ? searchLoading : listLoading;
  const error = isSearching ? searchError : listError;

  function handleQueryChange(value: string) {
    setQuery(value);
    reset();
  }

  return {
    venues,
    meta,
    isLoading,
    error,
    isSearching,
    query,
    onQueryChange: handleQueryChange,
    nextPage,
    previousPage,
    page,
  };
}