import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useVenueSearch } from "@/features/venues/hooks/useVenueSearch";
import { Button } from "@/components/vendor/button";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function LandingSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { results, isLoading } = useVenueSearch(query);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setQuery("");
    navigate(
      query.trim()
        ? `/venues?query=${encodeURIComponent(query.trim())}`
        : "/venues",
    );
  }

  function handleSelect(venueId: string) {
    setQuery("");
    navigate(`/venues/${venueId}`);
  }

  const showListSuggestions =
    query.trim().length > 0 && !isLoading && results.length > 0;

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setQuery(""));

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        role="search"
        className="flex items-center gap-3 rounded-md border border-grey-200 bg-white px-4 py-3 transition-colors focus-within:border-navy-800"
      >
        <Search
          size={18}
          className="shrink-0 text-navy-800 stroke-3"
          aria-hidden="true"
        />
        <label htmlFor="landing-search" className="sr-only">
          Search for a venue
        </label>
        <input
          id="landing-search"
          type="text"
          aria-expanded={showListSuggestions}
          aria-controls="search-listbox"
          aria-autocomplete="list"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a venue"
          autoComplete="off"
          className="w-full bg-transparent text-base text-navy-900 outline-none placeholder:text-sm placeholder:text-grey-600"
        />

        <Button
          type="submit"
          aria-label="Search venues"
          className="cursor-pointer"
        >
          Search
        </Button>
      </form>

      {showListSuggestions && (
        <ul
          id="search-listbox"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50  overflow-hidden rounded-md border border-grey-200 bg-white shadow-lg"
        >
          {results.slice(0, 3).map((venue) => (
            <li
              key={venue.id}
              role="option"
              aria-selected="false"
              onClick={() => handleSelect(venue.id)}
              onKeyDown={(e) => e.key === "Enter" && handleSelect(venue.id)}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-grey-100"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-navy-800">
                  {venue.name}
                </span>
              </div>
            </li>
          ))}
          <li className="border-t border-grey-200 ">
            <Button
              type="button"
              aria-label="Search for venues"
              variant="link"
              onClick={handleSubmit}
              className=" cursor-pointer "
            >
              See all results for "{query}"
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
}
