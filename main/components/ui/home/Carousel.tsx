'use client';

import { CAROUSEL_ITEMS } from "@/lib/utils";
import { Carousel as CarouselReact } from "flowbite-react";
import Image from "next/image";

export default function Carousel() {
  return (
    <div className="h-[300px] sm:h-[500px] overflow-hidden rounded-lg lg:h-96">
      <CarouselReact>
        { CAROUSEL_ITEMS.map((item, index) => (
          <Image
            key={`item:${index}:${item.alt}`}
            src={item.src}
            alt={item.alt}
            className="aspect-video w-full max-w-full h-full max-h-full object-cover object-center rounded-lg"
            width={1280}
            height={720}
            placeholder="blur"
          />
        )) }
      </CarouselReact>
    </div>
  )
}