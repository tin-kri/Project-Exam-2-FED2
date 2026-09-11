import { useParams } from "react-router-dom";
import { useVenue } from "@/features/venues/hooks/useVenue";
import PageWrapper from "@/components/layout/PageWrapper";
import VenueDetailsCard from "@/features/venues/components/VenueDetailsCard";
import BookingSection from "@/features/bookings/components/BookingSection";
import type { CreateBookingValues } from "@/features/bookings/types/booking.types";
import { useCreateBooking } from "@/features/bookings/hooks/useCreateBooking";
import { useNavigate } from "react-router-dom";
import VenueInformation from "../components/VenueInformation";
import Breadcrumbs from "@/components/layout/HolidazeBreadcrumbs";

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { venue, isLoading: isVenueLoading, error: venueError } = useVenue(id);
  const navigate = useNavigate();
  const {
    handleCreateBooking,
    isLoading: isBooking,
    error: bookingError,
  } = useCreateBooking();

  async function handleSubmit(values: CreateBookingValues): Promise<boolean> {
    const booking = await handleCreateBooking(values);
    if (booking) {
      navigate("/booking-confirmed", { state: { booking, venue } });
      return true;
    }
    return false;
  }
  if (isVenueLoading) {
    return (
      <PageWrapper>
        <p className="mt-8 text-center text-sm text-grey-900">Loading...</p>
      </PageWrapper>
    );
  }

  if (venueError) {
    return (
      <PageWrapper>
        <p role="alert" className="mt-8 text-center text-sm text-destructive">
          Something went wrong: {venueError}
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

  return (
    <PageWrapper>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
          { label: venue.name },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="md:flex-1">
          <VenueDetailsCard venue={venue} />
        </div>
        <div className=" md:top-24 md:w-95 md:shrink-0">
          <BookingSection
            venue={venue}
            onSubmit={handleSubmit}
            isLoading={isBooking}
            error={bookingError}
          />
        </div>
      </div>
      <VenueInformation />
    </PageWrapper>
  );
}
