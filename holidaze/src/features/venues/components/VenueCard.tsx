import { Link } from "react-router-dom";
import type { VenueApiData } from "../types/venue.types";
import RatingSection from "@/components/ui/StarRating";
import VenueImage from "../../../components/ui/VenueImage";

interface VenueCardProps {
  venue: VenueApiData;
}

export default function VenueCard({ venue }: VenueCardProps) {
  const { id, name, location, media, price } = venue;

  const image = media?.[0]?.url;
  const imageAlt = media?.[0]?.alt ?? name;

  return (
    <article className="overflow-hidden h-full rounded-sm shadow-sm">
      {/* photo */}
      <Link to={`/venues/${id}`}>
        <VenueImage
          src={image}
          alt={imageAlt}
          className="h-48 w-full object-cover"
        />{" "}
      </Link>

      {/* card body */}
      <div className="px-4 py-3">
        {/* title + location */}
        <h3 className="font-serif text-base font-medium text-navy-900">
          {name}
        </h3>
        <p className="mt-0.5 text-sm text-grey-600">
          <RatingSection rating={venue.rating} /> {location?.city},{" "}
          {location?.country}
        </p>

        {/* price */}

        <div className="mt-3 flex items-center justify-between border-t border-grey-200  pt-3">
          <p className="text-lg font-bold text-navy-800">
            ${price}
            <span className="text-sm font-normal text-grey-900"> /night</span>
          </p>

          <Link
            to={`/venues/${id}`}
            className="text-sm font-bold text-navy-800  underline underline-offset-4 hover:text-navy-500"
          >
            See venue details
          </Link>
        </div>
      </div>
    </article>
  );
}
