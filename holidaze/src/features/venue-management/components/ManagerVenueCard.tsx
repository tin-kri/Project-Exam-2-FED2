import { Link } from "react-router-dom";
import type { VenueApiData } from "@/features/venues/types/venue.types";

interface ManagerVenueCardProps {
  venue: VenueApiData;
}

export default function ManagerVenueCard({ venue }: ManagerVenueCardProps) {
  const image = venue.media?.[0];

  return (
    <article className="overflow-hidden rounded-sm bg-white">
      {/* clickable image */}
      <Link to={`/venues/${venue.id}`}>
        <img
          src={image?.url ?? "/placeholder.svg"}
          alt={image?.alt ?? venue.name}
          className="aspect-video w-full object-cover"
        />
      </Link>

      <div className="px-4 py-3">
        <Link
          to={`/manage-venues/${venue.id}`}
          className="font-serif text-base font-bold text-navy-800 hover:text-sky-300"
        >
          {venue.name}
        </Link>
        <p className="mt-0.5 text-sm text-grey-900">This venue has {venue.bookings?.length ?? 0} booked periods </p>
        {/* <p className="mt-0.5 text-sm text-grey-900">
          {venue.location?.city}, {venue.location?.country}
        </p> */}


      </div>

      <div className="flex items-center justify-between border-t border-grey-200 px-4 py-3">
        <Link
          to={`/manage-venues/${venue.id}`}
          className="text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-sky-300"
        >
          View Venue Bookings
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to={`/manage-venues/${venue.id}/edit`}
            className="flex items-center gap-1 text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-sky-300"
          >
            Edit
          </Link>

          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-destructive hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
