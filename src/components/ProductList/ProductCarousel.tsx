import { ProductSchema } from "lib/interfaces";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: ProductSchema[];
}

const ProductCarousel: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-4 lg:gap-14 lg:px-10 lg:py-14 hide-scrollbar">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductCarousel;
