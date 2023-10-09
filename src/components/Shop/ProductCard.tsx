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
    <div className="bg-bg-300 rounded-lg shadow-md flex flex-col">
      <Link href={`/product/${product.slug}`}>

        <div className="relative w-32 h-32 md:w-44 md:h-44 my-4 mx-auto">
          <Image
            src={urlFor(product.featured_image).url()}
            quality={100}
            fill={true}
            sizes="(min-width: 780px) 176px, 128px"
            className=""
            alt={product.name}
          />
        </div>

      </Link>
      <div className="border-t border-bg-800 mx-4"></div>
      <div className="flex flex-col justify-between h-32 md:w-full px-2 pb-2">
        <Link href={`/product/${product.slug}`}>

          <p className="cursor-pointer capitalize mt-3 font-sans truncate-wrap line-clamp-3 w-28">
            {product.name}
          </p>

        </Link>
        <div className="flex justify-between w-full items-center">
          <span className="text-[14px]">€{displayedPrice}</span>
          {product.in_stock ? (
            <button
              id="add-to-cart"
              aria-label="Voeg toe aan winkelmandje"
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
