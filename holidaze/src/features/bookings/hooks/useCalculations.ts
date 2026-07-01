
import { useMemo } from "react";
import { differenceInCalendarDays } from "date-fns";
import { type DateRange } from "react-day-picker";
 
export function useBookingCalculation(date: DateRange | undefined, price: number) {
  const days = useMemo(() => {
    if (!date?.from || !date?.to) return 0;
    return differenceInCalendarDays(date.to, date.from);
  }, [date]);
 
  const total = days * price;
 
  return { days, total };
}
 
