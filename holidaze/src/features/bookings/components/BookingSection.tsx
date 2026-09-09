import { useState } from "react";
import type { VenueApiData } from "@/features/venues/types/venue.types";
import DateRangePicker from "@/features/bookings/components/DateRangePicker";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/vendor/button";
import { useBookingCalculation } from "../hooks/useCalculations";
import BookingSummary from "./BookingSummary";
import { useBookedDates } from "@/features/venues/hooks/useBookingDays";
import Stepper from "@/components/vendor/stepper";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/stores/authStore";
import type { CreateBookingValues } from "../types/booking.types";

interface BookingSectionProps {
  venue: VenueApiData;
  onSubmit: (values: CreateBookingValues) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export default function BookingSection({
  venue,
  onSubmit,
  isLoading,
  error,
}: BookingSectionProps) {
  const [guests, setGuests] = useState(1);
  const { price } = venue;
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const { nights, total } = useBookingCalculation(date, price);
  const bookedDays = useBookedDates(venue.bookings);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleBook() {
    if (!date?.from || !date?.to) return;

    const bookingValues: CreateBookingValues = {
      dateFrom: date.from.toISOString(),
      dateTo: date.to.toISOString(),
      guests,
      venueId: venue.id,
    };

    await onSubmit(bookingValues);
  }

  return (
    <div className="rounded-md border border-grey-200 bg-bg-card p-5">
      <h2 className="mb-4 text-center font-serif text-2xl font-bold text-navy-800">
        Plan Your Stay
      </h2>

      <div className="flex flex-col gap-4 md:items-start ">
        <div className="w-full md:w-auto">
          <p className="mb-2 text-center md:text-left text-sm font-medium text-navy-800">
            Select dates
          </p>
          <div className="flex justify-center md:justify-start">
            <DateRangePicker
              date={date}
              onSelect={setDate}
              disabledDates={bookedDays}
            />
          </div>
        </div>

        <div className="w-full md:w-auto">
          <p className="mb-2 text-sm text-center md:text-left font-medium text-navy-800">
            Guests
          </p>
          <div className="flex justify-center md:justify-start">
            <Stepper
              value={guests}
              onChange={setGuests}
              max={venue.maxGuests}
            />
          </div>{" "}
        </div>
      </div>

      {date?.from && nights > 0 && (
        <div className="mt-6 flex flex-col gap-4 border-t border-grey-200 pt-6">
          <BookingSummary
            date={date}
            total={total}
            nights={nights}
            guests={guests}
          />
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          {user ? (
            <Button
              type="submit"
              onClick={handleBook}
              className="w-full"
              disabled={nights === 0 || isLoading}
            >
              {isLoading ? "Booking..." : "Book Now"}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => navigate("/login", { state: { from: location } })}
            >
              Log in to Book
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
