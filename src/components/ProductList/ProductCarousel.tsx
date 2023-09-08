import { ProductSchema } from "lib/interfaces";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductListProps {
  products: ProductSchema[];
}

const ProductCarousel: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="">
      <div className="flex justify-between 2xl:max-w-screen-2xl mx-auto px-6 items-end">
        <h2 className="text-2xl md:text-3xl">Onze favorieten</h2>
        <Link href={"/producten"}>
          <a className="underline text-sm md:text-base">Bekijk meer</a>
        </Link>
      </div>
      <div className="flex overflow-x-auto py-4 gap-4 ml-4 lg:gap-14 lg:px-5 lg:py-14">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
