import { useManagerVenues } from "@/features/venue-management/hooks/useManagerVenues";
import ManagerVenueCard from "./ManagerVenueCard";
import CreateVenueCTA from "./VenueLinkCTA";


export default function VenueManagerSection() {
  const { venues, isLoading, error } = useManagerVenues();

  return (
    <section className="mt-12 rounded-sm bg-bg-card">
      <div className="flex flex-col gap-4 px-6 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-navy-800">
            My Venues
          </h2>
        </div>

        {isLoading && (
          <p className="text-center text-base text-grey-900">Loading…</p>
        )}

        {error && (
          <p role="alert" className="text-center text-base text-red-600">
            {error}
          </p>
        )}

        {!isLoading && !error && venues.length === 0 && (
          <p className="text-center text-base text-grey-900">
            You have no venues
          </p>
        )}

        {venues.length > 0 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <ManagerVenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}

        <CreateVenueCTA />
    
      </div>
    </section>
  );
}
