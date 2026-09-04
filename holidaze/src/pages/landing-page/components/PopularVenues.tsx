import PopularVenueCard from "./PopularVenueCard";
import { useVenues } from "@/features/venues/hooks/useVenues";
import { Link } from "react-router-dom";
export default function PopularVenues() {
  const { venues, isLoading, error } = useVenues({
    limit: 4,
    sort: "rating",
    sortOrder: "desc",
  });

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-primary">
          Popular Venues
        </h2>
        <Link
          to={`/venues/`}
          className="mt-4 inline-block font-semibold  text-sm text-primary underline underline-offset-4 hover:text-sky-500"
        >
          See all venues
        </Link>
      </div>

      {isLoading && (
        <p className="mt-4 text-sm text-grey-900">Loading venues...</p>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {venues.map((venue) => (
            <PopularVenueCard key={venue.id} popularVenue={venue} />
          ))}
        </div>
      )}
      
    </section>
  );
}