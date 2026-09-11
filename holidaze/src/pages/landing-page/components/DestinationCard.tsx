import { Link } from "react-router-dom";

interface Destination {
  city: string;
  image: string;
  alt: string;
  description: string;
}

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      to={`/venues?query=${destination.city}`}
      className="group block overflow-hidden rounded-sm "
    >
      <img
        src={destination.image}
        alt={destination.alt}
        className="h-40 w-full object-cover"
      />
      <div className="py-3 text-xl text-start">
        <h3 className="font-serif font-bold text-navy-800">{destination.city}</h3>
        <p className="text-base text-accent-foreground">
          {destination.description}
        </p>
      </div>
    </Link>
  );
}
