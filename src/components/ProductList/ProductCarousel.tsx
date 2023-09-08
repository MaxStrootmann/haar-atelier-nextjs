import { ProductSchema } from "lib/interfaces";
import ProductCard from "./ProductCard";
import Link from "next/link";
import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

interface ProductListProps {
  products: ProductSchema[];
}

const ProductCarousel: React.FC<ProductListProps> = ({ products }) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300; // scroll amount in px
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300; // scroll amount in px
    }
  };

  return (
    <div className="">
      <div className="flex justify-between 2xl:max-w-screen-2xl mx-auto px-6 items-end">
        <h2 className="text-2xl md:text-3xl">Onze favorieten</h2>
        <Link href={"/producten"}>
          <a className="underline text-sm md:text-base">Bekijk meer</a>
        </Link>
      </div>
      <div className="relative">
        <div className="absolute top-[40%]">
          <div className="hidden md:flex justify-between w-screen 2xl:max-w-screen-2xl mx-auto px-6">
            <button onClick={scrollRight} className=""><BsArrowLeftCircle size={32}/></button> {/* Right Scroll Button */}
            <button onClick={scrollLeft} className=""><BsArrowRightCircle size={32}/></button> {/* Left Scroll Button */}
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto py-4 gap-4 ml-4"
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
