import Link from "next/link";
import Image from "next/image";
import { ProductSchema } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import { useContext } from "react";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";

interface ProductCardProps {
  product: ProductSchema;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const { dispatch } = useContext(CartItemsContext);

  const addToCart = () => {
    dispatch({
      type: Types.addToCart,
      payload: { ...product },
    });

    toggleCartVisibility();
  };

  const displayedPrice = product.price.toFixed(2).replace(".", ",");

  return (
    <div className="w-36 min-w-[9rem] h-72 bg-bg-300 rounded-lg shadow-md flex flex-col lg:scale-125">
      <Link href={`/product/${product.slug}`}>
        <a>
          <div className="relative w-32 h-32 my-4">
            <Image
              src={urlFor(product.featured_image).url()}
              quality={100}
              layout="fill"
              className=""
              alt={product.name}
            />
          </div>
        </a>
      </Link>
      <div className="border-t border-bg-800 mx-4"></div>
      <div className="flex flex-col justify-between h-full px-2 pb-2">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h4 className="cursor-pointer capitalize mt-3 font-sans">
              {product.name}
            </h4>
          </a>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-[14px]">€{displayedPrice}</span>
          {product.op_voorraad ? (
            <button
              onClick={addToCart}
              className="bg-accent-500 py-2 px-2 rounded-lg text-white text-xs"
            >
              Voeg toe
            </button>
          ) : (
            <span className="text-xs text-center">Niet op voorraad</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;