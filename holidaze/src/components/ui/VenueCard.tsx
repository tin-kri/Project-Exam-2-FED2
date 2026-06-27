import { Link } from "react-router-dom";
import type { VenueApiData } from "@/types/types";
import RatingSection from "@/components/ui/StarRating";

interface VenueCardProps {
  venue: VenueApiData;
}

// remember to include rating in const venue

export default function VenueCard({ venue }: VenueCardProps) {
  const { id, name, location, media, meta, price } = venue;

  const image = media?.[0]?.url;
  const imageAlt = media?.[0]?.alt ?? name;

  const amenities = [
    meta?.wifi && "Wifi",
    meta?.parking && "Parking",
    meta?.breakfast && "Breakfast",
    meta?.pets && "Pets allowed",
  ].filter(Boolean) as string[];

  return (
    <article className="overflow-hidden h-full rounded-sm bg-bg-card">
      {/* photo */}
      <Link to={`/venues/${id}`}>
        <img src={image} alt={imageAlt} className="h-48 w-full object-cover" />
      </Link>

      {/* card body */}
      <div className="px-4 py-3">
        {/* title + location */}
        <h3 className="font-serif text-base font-bold text-navy-800">{name}</h3>
        <p className="mt-0.5 text-sm text-grey-900">
          {location?.city}, {location?.country}
        </p>

        {/* tags */}
        {amenities.length > 0 && (
          <ul className="mt-2 flex list-none flex-wrap gap-1.5">
            {amenities.map((amenity) => (
              <li
                key={amenity}
                className="rounded-sm border border-grey-200 px-2 py-0.5 text-xs text-grey-900"
              >
                {amenity}
              </li>
            ))}
          </ul>
        )}

        {/* Rating shad? lucid? */}<div className="mt-3 pt-3" >
<RatingSection  rating={venue.rating}/>
</div>

        {/* price */}
        <div className="mt-3 flex items-center justify-between border-t border-grey-200 pt-3">
          <p className="text-lg font-bold text-navy-800">
            ${price}
            <span className="text-sm font-normal text-grey-900"> /night</span>
          </p>
          <Link
            to={`/venues/${id}`}
            className="text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-500"
          >
            See venue details
          </Link>
        </div>
      </div>
    </article>
  );
}
