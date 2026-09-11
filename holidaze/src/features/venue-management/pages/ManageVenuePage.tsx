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

  if (isLoading) {
    return (
      <PageWrapper>
        <p className="mt-8 text-center text-sm text-grey-900">Loading...</p>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <p role="alert" className="mt-8 text-center text-sm text-destructive">
          Something went wrong: {error}
        </p>
      </PageWrapper>
    );
  }

  if (!venue) {
    return (
      <PageWrapper>
        <p className="mt-8 text-center text-sm text-grey-900">
          Venue not found.
        </p>
      </PageWrapper>
    );
  }

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
      <VenueBookingsList bookings={bookings} price={venue.price} />
    </PageWrapper>
  );
}
