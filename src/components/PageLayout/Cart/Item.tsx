import { useContext } from "react";
import styles from "styles/components/PageLayout/Cart/Item.module.scss";
import { CartProduct } from "lib/interfaces";
import Image from "next/image";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";
import urlFor from "lib/sanity/urlFor";

interface ItemProps {
  product: CartProduct;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const { dispatch } = useContext(CartItemsContext);
  const { slug, featured_image, name, on_sale, sale_price, price, quantity } =
    product;

  const removeWholeProduct = () => {
    dispatch({
      type: Types.removeWholeProduct,
      payload: slug
    });
  };

  const removeSingleItem = () => {
    dispatch({
      type: Types.removeSingleItem,
      payload: slug
    });
  };

  const addSingleItem = () => {
    dispatch({
      type: Types.addToCart,
      payload: product
    });
  };

  return (
    <div className={styles.item}>
      <div className="flex flex-row mb-3 justify-between">
        <div className="w-4/5 flex flex-row">
          <Image
            src={urlFor(featured_image).url()}
            width={64}
            height={64}
            className="clickable-img"
            quality={100}
            alt={name}
          />
          <span className="text-lg ml-4 text-white">{name}</span>
        </div>
        <div className="w-1/5">
          <span className="text-lg text-grey-300">
            ${on_sale ? sale_price : price}
          </span>
        </div>
      </div>
      <div className="flex flex-row">
        <button
          onClick={removeWholeProduct}
          className="border border-grey-500 p-1 border-solid w-9 h-9 flex flex-row justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <input
          type="text"
          className="border border-grey-500 p-1 border-solid bg-transparent ml-2 outline-none text-white flex-1 h-9 pl-3"
          value={quantity}
          disabled
        />
        <button
          className="border border-grey-500 p-1 border-solid w-9 h-9 flex flex-row justify-center items-center text-white font-light text-lg"
          onClick={removeSingleItem}
        >
          -
        </button>
        <button
          className="border border-grey-500 p-1 border-solid w-9 h-9 flex flex-row justify-center items-center text-white font-light text-lg"
          onClick={addSingleItem}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
