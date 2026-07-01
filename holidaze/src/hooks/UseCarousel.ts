import { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselState() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  
  useEffect(() => {
    if (!api) return;
 // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return { api, setApi, current, count };
}