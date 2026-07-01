import type { VenueApiData } from "../types/venue.types";
import RatingSection from "@/components/ui/StarRating";
import AmenitiesTag from "./AmenitiesTag";
import VenueImageCarousel from "./ImageCarousel";

interface VenueDetailsCardProps {
  venue: VenueApiData;
}

export default function VenueDetailsCard({ venue }: VenueDetailsCardProps) {
  const { name, location } = venue;

  return (
    <article className="overflow-hidden h-full ">
      {/* photo */}

      {/* <img src={image} alt={imageAlt} className="h-48 w-full object-cover" /> */}
      <VenueImageCarousel media={venue.media} venueName={venue.name} />
      {/* card body */}
      <div className="px-4 py-3">
        {/* title + location */}
        <div className="flex ">
        <h3 className="font-serif text-base font-medium text-navy-900">
          {name}
        </h3>  <RatingSection rating={venue.rating} /> </div>

        <p className="mt-0.5 text-sm text-grey-600">
          {location?.city}, {location?.country}
        </p>

        <AmenitiesTag meta={venue.meta} />
     

        {/* description */}

        <div className="mt-3 flex items-center justify-between border-t border-grey-200  pt-3">
          <p> {venue.description} </p>
        </div>
        
      </div>
    </article>
  );
}
