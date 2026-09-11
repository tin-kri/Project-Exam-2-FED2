import { type DateRange } from "react-day-picker";
import { formatBookingDate } from "../utils/booking";

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
      <dl className="mt-3 space-y-2">
        <div className="flex gap-4 text-sm">
          <dt className="w-24 font-bold text-navy-800">Arrival</dt>
          <dd className="text-grey-900">
            {formatBookingDate(date.from.toISOString())}
          </dd>
        </div>
        {date.to && (
          <div className="flex gap-4 text-sm">
            <dt className="w-24 font-bold text-navy-800">Departure</dt>
            <dd className="m-0 text-grey-900">
              {formatBookingDate(date.to.toISOString())}
            </dd>
          </div>
        )}
        {nights > 0 && (
          <div className="flex gap-4 text-sm">
            <dt className="w-24 font-bold text-navy-800">Nights</dt>
            <dd className="m-0 text-grey-900">{nights}</dd>
          </div>
        )}
        {nights > 0 && (
          <div className="flex gap-4 text-sm">
            <dt className="w-24 font-bold text-navy-800">Guests</dt>
            <dd className="m-0 text-grey-900">{guests}</dd>
          </div>
        )}
        {nights > 0 && (
          <div className="flex gap-4 text-sm">
            <dt className="w-24 font-bold text-navy-800">Price</dt>
            <dd className="m-0 text-grey-900">${total}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
