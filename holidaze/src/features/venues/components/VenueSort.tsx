import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/vendor/select";
import {
  SORT_OPTIONS,
  type SortField,
  type SortOrder,
} from "@/features/venues/utils/sortVenues";

type VenueSortProps = {
  sort: SortField;
  sortOrder: SortOrder;
  onChange: (sort: SortField, sortOrder: SortOrder) => void;
};

/**
 * Displays a dropdown that allows users to sort venues
 * by price, rating, or creation date.
 *
 * @param sort - Currently selected sorting field.
 * @param sortOrder - Currently selected sorting direction.
 * @param onChange - Callback triggered when the sorting option changes.
 */
export default function VenueSort({
  sort,
  sortOrder,
  onChange,
}: VenueSortProps) {
  const value = `${sort}:${sortOrder}`;

  /**
   * Converts the selected dropdown value into a sort field
   * and sort order before passing them to the parent component.
   *
   * @param next - Selected value in "sort:sortOrder" format.
   */
  function handleValueChange(next: string) {
    const [nextSort, nextOrder] = next.split(":") as [SortField, SortOrder];
    onChange(nextSort, nextOrder);
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        className=" flex items-center gap-3 mt-3 rounded-md border border-grey-200 bg-white px-4 py-3 transition-colors focus-within:border-navy-800 "
        aria-label="Sort venues"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {SORT_OPTIONS.map((o) => (
            <SelectItem
              key={`${o.sort}:${o.sortOrder}`}
              value={`${o.sort}:${o.sortOrder}`}
            >
              {o.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}