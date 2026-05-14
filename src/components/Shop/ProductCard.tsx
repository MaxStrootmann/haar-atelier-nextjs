import { ProductSchema } from "lib/interfaces";
import ProductCardBase from "./ProductCardBase";

interface ProductCardProps {
  product: ProductSchema;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <ProductCardBase product={product} />;
};

export default ProductCard;
