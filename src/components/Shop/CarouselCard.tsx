import { ProductSchema } from "lib/interfaces";
import ProductCardBase from "./ProductCardBase";

interface ProductCardProps {
  product: ProductSchema;
}

const CarouselCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <ProductCardBase
      product={product}
      contentClassName="flex flex-col justify-between h-32 w-36 md:w-full px-2 pb-2"
    />
  );
};

export default CarouselCard;
