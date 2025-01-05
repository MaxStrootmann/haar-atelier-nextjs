import { ProductSchema } from "lib/interfaces";
import Link from "next/link";
import React from "react";
import CarouselCard from "./CarouselCard";

interface ProductListProps {
  products: ProductSchema[];
}

const PopularProductCarousel: React.FC<ProductListProps> = ({ products }) => {
  const handleScrollToProducts = (e: any) => {
    e.preventDefault();
    const productenElement = document.getElementById("producten");
    productenElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="">
      <div className="flex justify-between lg:max-w-screen-lg  mx-auto px-6 items-end">
        <h2 className="text-2xl md:text-3xl">Onze favorieten</h2>
        <Link
          onClick={handleScrollToProducts}
          href={"/#producten"}
          className="underline text-sm md:text-base"
        >
          Bekijk meer
        </Link>
      </div>
      <div className="relative lg:max-w-screen-lg  mx-auto">
        <div className="flex overflow-x-auto py-4 gap-4 pl-4">
          {products.map((product) => (
            <CarouselCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProductCarousel;
