import { useState } from "react";
import type { VenueApiData } from "@/features/venues/types/venue.types";
import DateRangePicker from "@/features/bookings/components/DateRangePicker";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { useBookingCalculation } from "../hooks/useCalculations";
import BookingSummary from "./BookingSummary";
import { useBookedDates } from "@/features/venues/hooks/useBookingDays";
import Stepper from "@/components/ui/stepper";
interface BookingSectionProps {
  venue: VenueApiData;
}

export default function BookingSection({ venue }: BookingSectionProps) {
  const [guests, setGuests] = useState(1)
  const { price } = venue;
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const { nights, total } = useBookingCalculation(date, price);
  const bookedDays = useBookedDates(venue.bookings);
  console.log("venue.bookings:", venue.bookings);
  console.log("bookedDates:", bookedDays);
  return (
    <div className="mt-4 border-t border-grey-200 pt-8 rounded-lg px-3 py-4 ">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12 ">
        {/* left — always visible */}
        <section className="flex-1 ">
          <h2 className=" mb-2 font-serif text-xl font-bold text-navy-800">
            Plan Your Stay
          </h2>
 <p className="mb-2 text-sm font-medium text-navy-800">
              Select number of guests
            </p>
          <Stepper value={guests} onChange={setGuests}  max={venue.maxGuests}/>

          {/* //GUEST STEPPER */}

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-navy-800">
              Select dates
            </p>
            <DateRangePicker
              date={date}
              onSelect={setDate}
              disabledDates={bookedDays}
            />
          </div>
        </section>

        {/* only show when range is picked */}
        {date?.from && nights > 0 && (
          <section className="flex-1 ">
            <h2 className="font-serif text-xl font-bold text-navy-800">
              My booking
            </h2>
            <BookingSummary date={date} total={total} nights={nights} guests={guests}/>
            <Button
              variant="outline"
              className="mt-4 w-full"
              disabled={nights === 0}
            >
              Book now
            </Button>
          </section>
        )}
      </div>
    </div>
  );
}
