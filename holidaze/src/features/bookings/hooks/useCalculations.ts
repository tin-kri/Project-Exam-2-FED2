import { useMemo } from "react";
import { calculateNights, calculateTotal } from "../utils/booking";
import { type DateRange } from "react-day-picker";

export function useBookingCalculation(
  date: DateRange | undefined,
  price: number,
) {
  return useMemo(() => {
    if (!date?.from || !date?.to) return { nights: 0, total: 0 };
    const nights = calculateNights(
      date.from.toISOString(),
      date.to.toISOString(),
    );
    return { nights, total: calculateTotal(nights, price) };
  }, [date, price]);
}
