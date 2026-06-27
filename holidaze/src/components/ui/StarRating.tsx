import { useId } from "react";
import type { VenueApiData } from "@/types/types";

type StarType = "full" | "half" | "empty";
type RatingSectionProps = {
  rating: VenueApiData["rating"];
};

function Star({ type }: { type: StarType }) {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={
        type === "full"
          ? "currentColor"
          : type === "half"
            ? `url(#${gradientId})`
            : "none"
      }
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      {/* Half star gradient */}
      {type === "half" && (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}

      <path
        strokeLinecap="butt"
        stroke-Linejoin="miter"
        stroke-Miterlimit="2"
        d="M12 2l2.832 6.836 7.394.5888-5.363 4.592 1.576 7.216L12 17.77 5.561 21.232 7.137 14.016 1.774 9.424 9.168 8.836 12 2z"
      />
    </svg>
  );
}

export default function RatingSection({ rating = 0 }: RatingSectionProps) {
  const decimal = rating % 1;

  let fullStars = Math.floor(rating);
  const hasHalfStar = decimal > 0 && decimal < 0.9;

  if (decimal >= 0.9) {
    fullStars += 1;
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      <div className="flex items-center gap-1 text-star">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} type="full" />
        ))}

        {hasHalfStar && <Star type="half" />}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} type="empty" />
        ))}
      </div>
    </div>
  );
}
