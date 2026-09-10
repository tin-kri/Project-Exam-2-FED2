import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/vendor/carousel";
import type { Media } from "@/features/venues/types/venue.types";
import { useCarouselState } from "@/hooks/useCarousel";
import VenueImage from "../../../components/ui/VenueImage";

type VenueImageCarouselProps = {
  media?: Media[];
  venueName: string;
};

export default function VenueImageCarousel({
  media,
  venueName,
}: VenueImageCarouselProps) {
  const { current, count, setApi } = useCarouselState();
  if (!media || media.length === 0) {
    return (
      <VenueImage
        src={undefined}
        alt={`${venueName} — no photos available`}
        className="aspect-video w-full rounded-sm object-cover"
      />
    );
  }

  return (
    <div className="">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {media.map((image, index) => (
            <CarouselItem key={index}>
              <VenueImage
                src={image.url}
                alt={image.alt || `${venueName} photo ${index + 1}`}
                className="aspect-video w-full rounded-sm object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {media.length > 1 && (
          <div className="mt-2 flex items-center justify-center gap-4">
            <CarouselPrevious
              variant="ghost"
              className="static translate-y-0"
            />
            <span className="text-sm text-grey-900">
              Slide {current} of {count}
            </span>
            <CarouselNext variant="ghost" className="static translate-y-0" />
          </div>
        )}
      </Carousel>
    </div>
  );
}
