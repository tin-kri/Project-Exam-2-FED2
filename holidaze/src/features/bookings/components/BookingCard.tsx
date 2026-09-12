import { Link } from "react-router-dom";
import type { BookingVenue } from "../types/booking.types";
import { formatBookingDate } from "../utils/booking";
import VenueImage from "@/components/ui/VenueImage";

interface BookingCardProps {
  booking: BookingVenue;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const venue = booking.venue;
  const image = venue?.media?.[0];

  return (
    <Link to={`/venues/${venue.id}`}>
      <article className="flex gap-4 rounded-sm bg-white p-3">
        <VenueImage
          src={image?.url}
          alt={image?.alt || ""}
          className="h-16 w-20 shrink-0 rounded-sm object-cover"
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-navy-800">
            {formatBookingDate(booking.dateFrom)} -{" "}
            {formatBookingDate(booking.dateTo)}
          </h3>
          <p className="text-sm font-bold text-navy-800 ">
            {venue?.name ?? "Venue no longer available"}
          </p>

          <p className="text-grey-900 text-sm">{booking.guests} guests</p>
        </div>
      </article>
    </Link>
  );
}
