import { useState } from "react";
import { CameraOff } from "lucide-react";
import { cn } from "@/lib/utils";

type VenueImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export default function VenueImage({ src, alt, className }: VenueImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full items-center justify-center rounded-sm bg-grey-100",
          className,
        )}
      >
        <CameraOff className="size-8 text-accent-foreground" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
