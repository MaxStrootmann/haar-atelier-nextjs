import { ProductSchema } from "lib/interfaces";
import ProductCard from "./ProductCard";
import Link from "next/link";
import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import CarouselCard from "./CarouselCard";

interface ProductListProps {
  products: ProductSchema[];
}

const PopularProductCarousel: React.FC<ProductListProps> = ({ products }) => {
  // const carouselRef = React.useRef<HTMLDivElement>(null);
  // function smoothScroll(
  //   element: HTMLDivElement, 
  //   target: number, 
  //   duration: number, 
  //   easingFunction: (t: number, b: number, c: number, d: number) => number
  // ) {
  //   const start = element.scrollLeft;
  //   let currentTime = 0;
  
  //   const animateScroll = function () {
  //     currentTime += 20; // increment by 20ms
  //     const val = easingFunction(currentTime, start, target - start, duration);
  //     element.scrollLeft = val;
  //     if (currentTime < duration) {
  //       requestAnimationFrame(animateScroll);
  //     }
  //   };
  
  //   animateScroll();
  // }
  
  // // An example easing function (EaseInOutQuart)
  // function easeInOutQuart(t: number, b: number, c: number, d: number): number {
  //   t /= d / 2;
  //   if (t < 1) return (c / 2) * t * t * t * t + b;
  //   t -= 2;
  //   return (-c / 2) * (t * t * t * t - 2) + b;
  // }
  
  // const scrollLeft = () => {
  //   if (carouselRef.current) {
  //     const newScrollPos = carouselRef.current.scrollLeft - 600;
  //     smoothScroll(carouselRef.current, newScrollPos, 500, easeInOutQuart);
  //   }
  // };
  
  // const scrollRight = () => {
  //   if (carouselRef.current) {
  //     const newScrollPos = carouselRef.current.scrollLeft + 600;
  //     smoothScroll(carouselRef.current, newScrollPos, 500, easeInOutQuart);
  //   }
  // };
  const handleScrollToProducts = (e: any) => {
    e.preventDefault(); // prevent the default behavior
  
    // Get the element with id="producten"
    const productenElement = document.getElementById("producten");
  
    // Scroll to the element
    productenElement?.scrollIntoView({ behavior: "smooth" });
  };
  

  return (
    <div className="">
      <div className="flex justify-between lg:max-w-screen-lg  mx-auto px-6 items-end">
        <h2 className="text-2xl md:text-3xl">Onze favorieten</h2>
        <Link onClick={handleScrollToProducts} href={"/#producten"} className="underline text-sm md:text-base">
          Bekijk meer
        </Link>
      </div>
      <div className="relative lg:max-w-screen-lg  mx-auto">
        {/* <div className="absolute top-[40%]">
          <div className="hidden md:flex justify-between w-[calc(100vw-1.5rem)] 2xl:max-w-screen-2xl mx-auto px-6">
            <button onClick={scrollLeft} className="bg-bg-300 rounded-full"><BsArrowLeftCircle size={32}/></button>
            <button onClick={scrollRight} className="bg-bg-300 rounded-full"><BsArrowRightCircle size={32}/></button>
          </div>
        </div> */}
        <div
          // ref={carouselRef}
          className="flex overflow-x-auto py-4 gap-4 pl-4"
        >
          {products.map((product) => (
            <CarouselCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProductCarousel;
