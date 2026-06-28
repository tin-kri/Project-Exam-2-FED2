import { useParams } from "react-router-dom";
import { useVenue } from "@/hooks/useVenue";
import PageWrapper from "@/components/layout/PageWrapper";

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { venue, isLoading, error } = useVenue(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (!venue) return <p>Venue not found.</p>;

  return (
    <PageWrapper>
      <h2 className="font-serif text-2xl font-bold text-navy-800">
        {venue.name}
      </h2>
    </PageWrapper>
  );
}
