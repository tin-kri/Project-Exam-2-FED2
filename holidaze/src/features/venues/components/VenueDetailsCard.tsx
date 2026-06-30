import type { VenueApiData } from "../types/venue.types";
import RatingSection from "@/components/ui/StarRating";
import AmenitiesTag from "./AmenitiesTag";

interface VenueDetailsCardProps {
  venue: VenueApiData;
}

export default function VenueDetailsCard({ venue }: VenueDetailsCardProps) {
  const { name, location, media } = venue;

  const image = media?.[0]?.url;
  const imageAlt = media?.[0]?.alt ?? name;

  return (
    <article className="overflow-hidden h-full rounded-sm bg-bg-card">
      {/* photo */}

      <img src={image} alt={imageAlt} className="h-48 w-full object-cover" />

      {/* card body */}
      <div className="px-4 py-3">
        {/* title + location */}
        <h3 className="font-serif text-base font-medium text-navy-900">
          {name}
        </h3>
        <p className="mt-0.5 text-sm text-grey-600">
          {location?.city}, {location?.country}
        </p>

        <AmenitiesTag meta={venue.meta} />

        <RatingSection rating={venue.rating} />

        {/* description */}

        <div className="mt-3 flex items-center justify-between border-t border-grey-200  pt-3">
          <p> {venue.description} </p>
        </div>
      </div>
    </article>
  );
}
