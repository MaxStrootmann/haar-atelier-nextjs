import React from "react";
import Image from "next/image";

const WebshopMarquee: React.FC = () => {
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

  return (
   <div className="overflow-hidden w-screen">
     <div className="absolute top-0 w-[1400%] h-[calc(100vh/1.5)] flex whitespace-nowrap animation-marquee">
       {images.map((image) => (
         <div key={image.id} className="w-3/5 h-full relative">
           <Image
             src={image.src}
             alt={image.alt}
             layout="fill"
             objectFit="cover"
           />
         </div>
       ))}
       {/* Duplicate for seamless transition */}
       {images.map((image) => (
         <div key={image.id + "-duplicate"} className="w-3/5 h-full relative">
           <Image
             src={image.src}
             alt={image.alt}
             layout="fill"
             objectFit="cover"
           />
         </div>
       ))}
     </div>
   </div>
 );
};

export default WebshopMarquee;
