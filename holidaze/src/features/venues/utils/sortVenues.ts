import type { VenueApiData } from "../types/venue.types";

/**
 * Fields that can be used to sort venues.
 */
export type SortField = "price" | "rating" | "created";

/**
 * Determines the direction in which venues are sorted.
 */
export type SortOrder = "asc" | "desc";

/**
 * Defines an option available in the venue sorting menu.
 */
export type SortOption = {
  /** Text displayed to the user. */
  label: string;

  /** Field used to sort the venues. */
  sort: SortField;

  /** Direction used for sorting. */
  sortOrder: SortOrder;
};

/**
 * Available sorting options for the venue list.
 */
export const SORT_OPTIONS: SortOption[] = [
  { label: "Newest", sort: "created", sortOrder: "desc" },
  { label: "Price - High to low", sort: "price", sortOrder: "desc" },
  { label: "Price - Low to high", sort: "price", sortOrder: "asc" },
  { label: "Rating - High to low", sort: "rating", sortOrder: "desc" },
  { label: "Rating - Low to high", sort: "rating", sortOrder: "asc" },
];

/**
 * Default sorting option used when no other sorting option is selected.
 */
export const DEFAULT_SORT: SortOption = SORT_OPTIONS[0];

/**
 * Compares two venues by the selected field.
 *
 * @param a - First venue to compare.
 * @param b - Second venue to compare.
 * @param field - Venue field used for comparison.
 * @returns A number indicating the sorting order.
 */
function compare(a: VenueApiData, b: VenueApiData, field: SortField): number {
  switch (field) {
    case "created":
      return new Date(a.created).getTime() - new Date(b.created).getTime();

    default:
      // price, rating
      return (a[field] ?? 0) - (b[field] ?? 0);
  }
}

/**
 * Sorts a list of venues by price, rating, or creation date.
 *
 * Returns a new array and does not modify the original venue list.
 * When two venues have the same primary value, rating is used as a tie-breaker.
 *
 * @param venues - Array of venues to sort.
 * @param sort - Field to sort by.
 * @param sortOrder - Direction of the sort.
 * @returns A new sorted array of venues.
 */
export function sortVenues(
  venues: VenueApiData[],
  sort: SortField,
  sortOrder: SortOrder,
): VenueApiData[] {
  const dir = sortOrder === "asc" ? 1 : -1;

  return [...venues].sort((a, b) => {
    const primary = compare(a, b, sort) * dir;

    if (primary !== 0) return primary;

    return (b.rating ?? 0) - (a.rating ?? 0);
  });
}
