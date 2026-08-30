import { Link } from "react-router-dom";


interface Destination {
  city: string;
  image: string;
}

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (

    <Link
  to={`/venues?query=${(destination.city)}`}
  className="group block overflow-hidden rounded-sm gap-3"
>
    
  <div className="flex h-60 w-80 flex-col   ">
    
    <img
      src={destination.image}
      alt={destination.city}
      className="min-h-0 flex-1 w-full object-cover  "
    />
    <div className="bg-sky-100 px-4 py-3 text-center">
      <p className="font-serif font-bold text-navy-800">
        {destination.city}
      </p>
    </div>
  </div>
</Link>

  );
}
