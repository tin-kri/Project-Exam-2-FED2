import type { VenueApiData } from "../types/venue.types";
import RatingSection from "@/components/ui/StarRating";
import AmenitiesTag from "./AmenitiesTag";
import VenueImageCarousel from "./ImageCarousel";

interface VenueDetailsCardProps {
  venue: VenueApiData;
}

export default function VenueDetailsCard({ venue }: VenueDetailsCardProps) {
  const { name, price, location } = venue;

  return (
    <article className="overflow-hidden h-full ">
      {/* photo */}

      <VenueImageCarousel media={venue.media} venueName={venue.name} />
      {/* card body */}

      <div className="px-4 pt-5 pb-4">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">{name}</h1>
        <p className=" text-base text-grey-600">
          {location?.city}, {location?.country}
        </p>
        <div className="mt-2">
          <RatingSection rating={venue.rating} />
        </div>
      </div>

      <div className="flex items-center gap-6 border-t border-grey-200 px-4 py-4 text-sm text-grey-900">
        <span className="text-base font-semibold text-navy-800">
          <span className="font-bold ">${price}</span> / Night
        </span>
        <span></span>
        <span className="text-base font-semibold text-navy-800 ">Max {venue.maxGuests} guests</span>
      </div>

        <div className="border-t border-grey-200 px-4 py-4">
        <AmenitiesTag meta={venue.meta} />
      </div>

      {/* description */}

          <div className="border-t border-grey-200 px-4 py-6">
        <h3 className="font-serif text-lg font-bold text-navy-800 mb-2">
          About this venue
        </h3>
        <p className="text-sm leading-relaxed text-grey-900">
          {venue.description}
        </p>
      </div>

    </article>
  );
}
