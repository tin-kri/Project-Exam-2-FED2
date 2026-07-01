import { useState } from "react";
import type { VenueApiData } from "@/features/venues/types/venue.types";
import DateRangePicker from "@/features/bookings/components/DateRangePicker";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { useBookingCalculation } from "../hooks/useCalculations";
import BookingSummary from "./BookingSummary";

interface BookingSectionProps {
  venue: VenueApiData;
}

export default function BookingSection({ venue }: BookingSectionProps) {
  const { price } = venue;

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const { days, total } = useBookingCalculation(date, price);

    return (
    <div className="mt-12 border-t border-grey-200 pt-8 rounded-lg px-3 py-4">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
 
        {/* left — always visible */}
        <section className="flex-1">
          <h2 className="font-serif text-xl font-bold text-navy-800">
            Choose your arrival and departure
          </h2>
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-navy-800">Select dates</p>
            <DateRangePicker date={date} onSelect={setDate} />
          </div>
        </section>
 
        {/* only show when range is picked */}
        {date?.from && days > 0 && (
         
          <section className="flex-1 ">
            <h2 className="font-serif text-xl font-bold text-navy-800">
              My booking
            </h2>
            <BookingSummary date={date} total={total} days={days} />
            <Button
              variant="outline"
              className="mt-4 w-full"
              disabled={days === 0}
            >
              Book now
            </Button>
          </section>
          
        )}
 
      </div>
    </div>
  );
}

