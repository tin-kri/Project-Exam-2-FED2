import { Link } from "react-router-dom";
import type { BookingVenue } from "../types/booking.types";
import { format } from "date-fns";

interface BookingCardProps {
  booking: BookingVenue;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const venue = booking.venue;
  const image = venue?.media?.[0];

  return (
      <Link
            to={`/venues/${venue.id}`}
          >
    <article className="flex gap-4 rounded-sm bg-white p-3">
   
      <img
        src={image?.url }
        alt={image?.alt || venue?.name || "Venue"}
        className="h-16 w-20 shrink-0 rounded-sm object-cover"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-navy-800">
          {venue?.name ?? "Venue no longer available"}
        </h3>
        <p className="text-grey-900 text-sm">
          {format(new Date(booking.dateFrom), "d MMM yyyy")} -{" "}
          {format(new Date(booking.dateTo), "d MMM yyyy")}
        </p>
        <p className="text-grey-900 text-sm">{booking.guests} guests</p>
         
           
         
      </div>
    </article> </Link>
  );
}
