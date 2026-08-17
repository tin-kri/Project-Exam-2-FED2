import { format } from "date-fns";
import { type DateRange } from "react-day-picker";


type BookingSummaryProps = {
  date: DateRange | undefined;
  total: number;
  nights: number;
  guests: number;

};

export default function BookingSummary({
  date,
  total,
  nights,
  guests,
}: BookingSummaryProps) {
  if (!date?.from) return null;

  return (
    <div className="mt-4">
      <div className="mt-3 space-y-2">
        <div className="flex gap-4 text-sm">
          <span className="w-24 font-bold text-navy-800">Arrival</span>
          <span className="text-grey-900">{format(date.from, "d/M/yyyy")}</span>
        </div>
        {date.to && (
          <div className="flex gap-4 text-sm">
            <span className="w-24 font-bold text-navy-800">Departure</span>
            <span className="text-grey-900">{format(date.to, "d/M/yyyy")}</span>
          </div>
        )}
        {nights > 0 && (
          <div className="flex gap-4 text-sm">
            <span className="w-24 font-bold text-navy-800">Nights</span>
            <span className="text-grey-900">{nights}</span>
          </div>
        )}
           {nights > 0 && (
          <div className="flex gap-4 text-sm">
            <span className="w-24 font-bold text-navy-800">Guests</span>
            <span className="text-grey-900">{guests}</span>
            
          </div>
        )}
        {nights > 0 && (
          <div className="flex gap-4 text-sm">
            <span className="w-24 font-bold text-navy-800">Price</span>
            <span className="text-grey-900">${total}</span>
          </div>
        )}
      </div>
    </div>
  );
}
