'use client';

import { CAROUSEL_ITEMS } from "@/lib/utils";
import { Carousel as CarouselReact } from "flowbite-react";
import Image from "next/image";

export default function Carousel() {
  return (
    <div className="h-56 overflow-hidden rounded-lg md:h-96">
      <CarouselReact>
        { CAROUSEL_ITEMS.map((item, index) => (
          <Image
            key={`item:${index}:${item.alt}`}
            src={item.src}
            alt={item.alt}
            className="aspect-video w-full max-w-full object-cover object-center"
            width={1280}
            height={720}
          />
        )) }
      </CarouselReact>
    </div>
  )
}