import { useState } from "react";
import { addDays, differenceInCalendarDays } from "date-fns";
import type { VenueApiData } from "@/types/types";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";

interface BookingSectionProps {
  venue: VenueApiData;
}

export default function BookingSection({ venue }: BookingSectionProps) {
  const { price } = venue;

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const nights =
    date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) : 0;

  const total = nights * price;

  return (
    <section className="mt-6 border-t border-grey-200 pt-6">
      <h2 className="font-serif text-xl font-bold text-navy-800">
        Choose your arrival and departure
      </h2>
      
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-navy-800">Select dates</p>
        <DateRangePicker date={date} onSelect={setDate} />
      </div>
     

      {/* price */}
      {/* <p className="text-lg font-bold text-navy-800">
        ${price}
        <span className="text-sm font-normal text-grey-900"> /night</span>
      </p> */}

      {/* date picker */}
      {/* <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-navy-800">Select dates</p>
        <DateRangePicker date={date} onSelect={setDate} />
      </div> */}

      {/* summary */}
      {/* {nights > 0 && (
        <div className="mt-4 border-t border-grey-200 pt-4">
          <div className="mt-2 flex justify-between font-bold text-navy-800">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )} */}

      {/* book button */}
      <Button className="mt-4 w-full" disabled={nights === 0}>
        Book now
      </Button>
    </section>
  );
}
