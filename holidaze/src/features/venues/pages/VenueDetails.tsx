import { useParams } from "react-router-dom";
import { useVenue } from "@/features/venues/hooks/useVenue";
import PageWrapper from "@/components/layout/PageWrapper";
import VenueDetailsCard from "@/features/venues/components/VenueDetailsCard";
import BookingSection from "@/features/bookings/components/BookingSection";

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { venue, isLoading, error } = useVenue(id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (!venue) return <p>Venue not found.</p>;

  return (
    <PageWrapper>
      <VenueDetailsCard venue={venue} />
      <BookingSection venue={venue} />
    </PageWrapper>
  );
}
