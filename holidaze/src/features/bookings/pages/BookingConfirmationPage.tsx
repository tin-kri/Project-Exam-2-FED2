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
import Breadcrumbs from "@/components/layout/HolidazeBreadcrumbs";

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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
          { label: `Booking confirmation ${venue.name}` },
        ]}
      />
      <section className=" rounded-md bg-bg-card md:mx-24">
        <div className="flex flex-col items-center gap-3 px-6 pt-10 pb-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full">
            <CircleCheck className="h-10 w-10 text-sky-500" />
          </span>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-navy-800">
            Your stay at
            <span> {venue.name} </span>
            is confirmed.
          </p>
        </div>

        <dl className="flex flex-col px-6  gap-1 text-navy-800 ">
          <div className="">
            <dt className="font-semibold">Dates:</dt>
            <dd>
              {formatBookingDate(booking.dateFrom)} to{" "}
              {formatBookingDate(booking.dateTo)}
            </dd>
          </div>
          <div className="">
            <dt className="font-semibold">Nights:</dt>
            <dd>{nights}</dd>
          </div>
          <div className="">
            <dt className="font-semibold">Guests:</dt>
            <dd>{booking.guests}</dd>
          </div>
          <div className="">
            <dt className="font-semibold">Total:</dt>
            <dd>${total}</dd>
          </div>
          <div className="">
            <dt className="font-semibold">Booking Reference:</dt>
            <dd>{booking.id}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-2 px-6 py-6  ">
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
