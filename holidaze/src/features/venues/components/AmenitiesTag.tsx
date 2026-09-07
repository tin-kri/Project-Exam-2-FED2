import type { VenueMeta } from "../types/venue.types";

type AmenitiesTagProps = {
  meta: VenueMeta;
};
export default function AmenitiesTag({ meta }: AmenitiesTagProps) {
  const amenities = [
    meta?.wifi && "Wifi",
    meta?.parking && "Parking",
    meta?.breakfast && "Breakfast",
    meta?.pets && "Pets allowed",
  ].filter(Boolean) as string[];

  if (amenities.length === 0) return null;

  return (
    <ul className="mt-2 flex list-none flex-wrap gap-1.5">
      {amenities.map((amenity) => (
        <li
          key={amenity}
          className="rounded-4xl bg-light-blue px-3 py-1 text-xs font-medium leading-5 text-blue"
        >
          {amenity}
        </li>
      ))}
    </ul>
  );
}
