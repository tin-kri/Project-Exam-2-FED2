import { useParams } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import VenueDetailsCard from "@/features/venues/components/VenueDetailsCard";
import { useVenue } from "@/features/venues/hooks/useVenue";
import type { VenueBooking } from "../types/venueManagement.types";
import VenueBookingsList from "../components/VenueBookingList";
import Breadcrumbs from "@/components/layout/HolidazeBreadcrumbs";
export default function ManageVenuePage() {
  const { id } = useParams<{ id: string }>();
  const { venue, isLoading, error } = useVenue(id);

  if (isLoading) return <p className="text-center text-grey-900">Loading...</p>;
  if (error)
    return (
      <p role="alert" className="text-center text-destructive">
        {error}
      </p>
    );
  if (!venue)
    return <p className="text-center text-grey-900">Venue not found.</p>;

  const bookings = venue.bookings as VenueBooking[];

  return (
    <PageWrapper>
      <Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
   { label: `Manage ${venue.name}` },
  ]}
/>
      <VenueDetailsCard venue={venue} />

      {/* do i need a delete and edit section here? i have it on the main page.. */}

      <VenueBookingsList bookings={bookings} price={venue.price} />
    </PageWrapper>
  );
}
