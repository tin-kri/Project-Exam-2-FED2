import { Link } from "react-router-dom";
import type { VenueApiData } from "@/features/venues/types/venue.types";
import VenueImage from "@/components/ui/VenueImage";
interface PopularVenueProps {
  popularVenue: VenueApiData;
}

export default function PopularVenueCard({ popularVenue }: PopularVenueProps) {
  const { id, name, location, media } = popularVenue;
  const image = media?.[0]?.url;
  const imageAlt = media?.[0]?.alt ?? name;
  return (
    <Link
      to={`/venues/${id}`}
      className="group block overflow-hidden rounded-sm"
    >
      <VenueImage
        src={image}
        alt={imageAlt}
        className=" h-50 w-full object-cover"
      />
      <div className="py-3 text-xl text-start text-primary">
        <h3 className="font-serif font-bold ">{name}</h3>
        <p className="text-sm text-accent-foreground">
          {location?.city}, {location?.country}
        </p>
      </div>
    </Link>
  );
}
