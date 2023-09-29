import { useContext, useState } from "react";
import { CartProduct } from "lib/interfaces";
import Image from "next/legacy/image";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";
import urlFor from "lib/sanity/urlFor";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

interface ItemProps {
  product: CartProduct;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const { dispatch } = useContext(CartItemsContext);
  const { slug, featured_image, name, in_stock, price, quantity } = product;

  const removeWholeProduct = () => {
    dispatch({
      type: Types.removeWholeProduct,
      payload: slug,
    });
  };

  const removeSingleItem = () => {
    dispatch({
      type: Types.removeSingleItem,
      payload: slug,
    });
  };

  const addSingleItem = () => {
    dispatch({
      type: Types.addToCart,
      payload: product,
    });
  };

  const displayedPrice = product.price.toFixed(2).replace(".", ",");

  return (
    <div className="my-8 grid grid-cols-[0.5fr_1fr_1fr] gap-2">

      <div className="row-span-2 flex items-center ml-2">
        <Link href={`/product/${product.slug}`}>

          <Image
            src={urlFor(featured_image).url()}
            width={80}
            height={80}
            className=""
            quality={100}
            alt={name}
          />

        </Link>
      </div>

      <Link href={`/product/${product.slug}`}>

        <div className="text-lg w-32 leading-snug">{name}</div>

      </Link>

      <div className="text-end">
        <button onClick={removeWholeProduct} className="">
          <AiOutlineClose color="hsl(0, 70%, 40%)" size={20} />
        </button>
        <div className="">€{displayedPrice}</div>
      </div>

      <div className="col-start-2 col-span-2 flex justify-between px-3 py-1 border border-black rounded-lg">
        <button className="" onClick={removeSingleItem}>
          <AiOutlineMinus color="hsl(213, 90%, 35%)"/>
        </button>
        <span>{quantity}</span>
        <button className="" onClick={addSingleItem}>
          <AiOutlinePlus color="hsl(213, 90%, 35%)"/>
        </button>
      </div>
    </div>
  );
};

export default Item;
