import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { ProductSchema } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Types from "reducers/cart/types";

interface ProductCardBaseProps {
  product: ProductSchema;
  contentClassName?: string;
}

export default function ProductCardBase({
  product,
  contentClassName = "flex flex-col justify-between h-32 md:w-full px-2 pb-2",
}: ProductCardBaseProps) {
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
      <div className="border-t border-bg-800 mx-4" />
      <div className={contentClassName}>
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
}
