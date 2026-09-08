import { useVenues } from "./useVenues";
import { useVenuePagination } from "./useVenuePagination";
import { useVenueSearch } from "./useVenueSearch";
import { useMemo } from "react";

import {
  sortVenues,
  DEFAULT_SORT,
  type SortField,
  type SortOrder,
} from "../utils/sortVenues";

const LIMIT = 24;


export function useVenuesPage(query: string, sort: SortField = DEFAULT_SORT.sort,
  sortOrder: SortOrder = DEFAULT_SORT.sortOrder,
) {
  const { page, nextPage, previousPage, reset } = useVenuePagination();

  const {
    venues: allVenues,
    meta,
    isLoading: listLoading,
    error: listError,
  } = useVenues({ page, limit: LIMIT, sort, sortOrder });

  const {
    results: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useVenueSearch(query);

  const isSearching = query.trim().length > 1;
  const sortedSearchResults = useMemo(
    () => sortVenues(searchResults, sort, sortOrder),
    [searchResults, sort, sortOrder],
  );
  const venues = isSearching ? sortedSearchResults : allVenues;
  const isLoading = isSearching ? searchLoading : listLoading;
  const error = isSearching ? searchError : listError;

  return {
    venues,
    meta,
    isLoading,
    error,
    isSearching,
    query,
    sort,
    sortOrder,
    nextPage,
    previousPage,
    page,
    reset,
  };
}
