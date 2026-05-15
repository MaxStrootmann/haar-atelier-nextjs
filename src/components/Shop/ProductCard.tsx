import type { StorefrontProduct } from "lib/payload/storefront";
import ProductCardBase from "./ProductCardBase";

interface ProductCardProps {
  product: StorefrontProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <ProductCardBase product={product} />;
};

export default ProductCard;
