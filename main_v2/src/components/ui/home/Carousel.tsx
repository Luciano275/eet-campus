import { Carousel as CarouselReact } from 'flowbite-react'

const CAROUSEL_ITEMS = [
  { alt: "Banner", src: "/school/banner.webp" },
  { alt: "Adentro", src: "/school/adentro1.webp" },
  { alt: "Patio-1", src: "/school/patio1.webp" },
  { alt: "Taller-1", src: "/school/taller1.webp" },
];

export default function Carousel() {
  return (
    <div className="h-56 overflow-hidden rounded-lg md:h-96">
      <CarouselReact>
        {
          CAROUSEL_ITEMS.map((item) => (
            <img
              src={item.src}
              alt={item.alt}
              className="rounded-xl object-center absolute block w-full min-h-[500px] object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 aspect-video"
            />
          ))
        }
      </CarouselReact>
    </div>
  )
}