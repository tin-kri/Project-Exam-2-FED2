import { Link, Navigate, useLocation } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import type { Booking } from "../types/booking.types";
import type { VenueApiData } from "@/features/venues/types/venue.types";
import { CircleCheck } from "lucide-react";
import {
  calculateNights,
  calculateTotal,
  formatBookingDate,
} from "../utils/booking";

export default function BookingConfirmationPage() {
  const location = useLocation();
  const state = location.state as {
    booking: Booking;
    venue: VenueApiData;
  } | null;

  if (!state?.booking) return <Navigate to="/profile" replace />;

  const { booking, venue } = state;
  const nights = calculateNights(booking.dateFrom, booking.dateTo);
  const total = calculateTotal(nights, venue.price);

  return (
    <PageWrapper>
      <section className=" rounded-md bg-bg-card">
        <div className="flex flex-col items-center gap-3 px-6 pt-10 pb-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full">
            <CircleCheck className="h-10 w-10 text-sky-500" />
          </span>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-navy-800">
            Your stay at
            <span className=""> {venue.name} </span>
            is confirmed.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-6 py-6  text-navy-800">
          <p>
            <span className="font-semibold">Dates:</span>{" "}
            {formatBookingDate(booking.dateFrom)} to{" "}
            {formatBookingDate(booking.dateTo)}
          </p>
          <p>
            <span className="font-semibold">Nights:</span> {nights}
          </p>
          <p>
            <span className="font-semibold">Guests:</span> {booking.guests}
          </p>
          <p>
            <span className="font-semibold">Total:</span> ${total}
          </p>
          <p>
            <span className="font-semibold">Booking Reference:</span>{" "}
            {booking.id}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 px-6 py-6 ">
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
