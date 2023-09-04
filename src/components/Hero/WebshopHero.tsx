import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function WebshopHero() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { id: 1, src: "/haa_ps_anti.jpg", alt: "Anti hairloss" },
    { id: 2, src: "/haa_ps_argan.jpg", alt: "Argan oil" },
    { id: 3, src: "/haa_ps_colourshield.jpg", alt: "Colour shield" },
    { id: 4, src: "/haa_ps_colouring.jpg", alt: "Colouring" },
    { id: 5, src: "/haa_ps_colouring2.jpg", alt: "Colouring 2" },
    { id: 6, src: "/haa_ps_curls.jpg", alt: "Curls" },
    { id: 7, src: "/haa_ps_dryshampoo.jpg", alt: "Dry shampoo" },
    { id: 8, src: "/haa_ps_exfoliate.jpg", alt: "Exfoliate" },
    { id: 9, src: "/haa_ps_gel.jpg", alt: "Gel" },
    { id: 10, src: "/haa_ps_hairwax.jpg", alt: "Hairwax" },
    { id: 11, src: "/haa_ps_heat.jpg", alt: "Protection" },
    { id: 12, src: "/haa_ps_mask.jpg", alt: "Hairmask" },
    { id: 13, src: "/haa_ps_medium.jpg", alt: "Medium hold" },
    { id: 14, src: "/haa_ps_refresher.jpg", alt: "Refresher" },
    { id: 15, src: "/haa_ps_spray.jpg", alt: "Spray" },
    { id: 16, src: "/haa_ps_spraywax.jpg", alt: "Spray wax" },
  ];

  useEffect(() => {
   const interval = setInterval(() => {
     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
   }, 3000); // Change image every 3 seconds

   return () => clearInterval(interval); // Cleanup the interval on component unmount
 }, []);

  return (
    <div className="absolute top-0 w-screen h-[calc(100svh/2)] sm:h-[calc(100svh/2)]">
      {images.map((image, index) => {
        return (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            layout="fill"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
