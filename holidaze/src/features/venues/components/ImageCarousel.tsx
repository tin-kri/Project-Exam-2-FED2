import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Media } from "@/features/venues/types/venue.types";
import { useCarouselState } from "@/hooks/UseCarousel";

type VenueImageCarouselProps = {
  media?: Media[];
  venueName: string;
};

export default function VenueImageCarousel({
  media,
  venueName,
}: VenueImageCarouselProps) {
  const { current, count, setApi } = useCarouselState();
  if (!media || media.length === 0) return null;

  
  return (
    <div className="">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {media.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image.url}
                alt={image.alt || `${venueName} photo ${index + 1}`}
                className="aspect-video w-full rounded-sm object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {media.length > 1 && (
          <>
            <CarouselPrevious className="left-2 rounded-2xl" />
            <CarouselNext className="right-2 rounded-2xl" />
          </>
        )}
      </Carousel>
      {media.length > 1 && (
        <div className="py-2 text-center text-sm text-grey-900">
          Slide {current} of {count}
        </div>
      )}
    </div>
  );
}
