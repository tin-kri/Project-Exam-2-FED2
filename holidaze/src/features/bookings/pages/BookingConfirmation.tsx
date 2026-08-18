import { Link, Navigate, useLocation } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import type { Booking } from "../types/booking.types";
import type { VenueApiData } from "@/features/venues/types/venue.types";

export default function BookingConfirmationPage() {
  const location = useLocation();
  const state = location.state as {
    booking: Booking;
    venue: VenueApiData;
  } | null;

  if (!state?.booking) return <Navigate to="/profile" replace />;

  const { booking, venue } = state;
  const nights = Math.round(
    (new Date(booking.dateTo).getTime() -
      new Date(booking.dateFrom).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const total = nights * venue.price;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <PageWrapper>
      <section>
        <h1> Booking Confirmed!</h1>
        <p>
          Your stay at {venue.name} is confirmed.
        </p>
<p>    {fmt(booking.dateFrom)} - {fmt(booking.dateTo)}</p>
<p>nights: {nights}</p>
<p>guests:{booking.guests}</p>
<p>total price {total}</p>
<p>booking id: {booking.id}</p>
        

        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={`/venues/${venue.id}`}
            className="font-semibold text-navy-800 underline underline-offset-4"
          >
            Back to Venue
          </Link>
          <Link
            to="/profile"
            className="font-semibold text-navy-800 underline underline-offset-4"
          >
            My Bookings
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
