import styles from "styles/components/PageLayout/Header.module.scss";
import Link from "next/link";
import Cart from "./Cart/Cart";
import React, { useContext, useEffect } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { CartProduct, CategorySchema, ProductSchema } from "lib/interfaces";
import { MdManageSearch, MdOutlineShoppingBag } from "react-icons/md";
import haalogo from "/public/haalogo.svg"
import Image from "next/legacy/image";
import SearchVisibilityContext from "contexts/searchVisibilityContext";
import Searchbar from "./Searchbar/Searchbar";
import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import popularProductsQuery from "lib/sanity/queries/popular_products";



interface HeaderProps {
  products: ProductSchema[];
}


const Header: React.FC<HeaderProps> = ({ products }) => {
  const { cart } = useContext(CartItemsContext);
  const { cartVisibility, toggleCartVisibility } = useContext(CartVisibilityContext);
  const { searchVisibility, toggleSearchVisibility } = useContext(SearchVisibilityContext);
  const cartLength = cart.reduce(
    (count: number, item: CartProduct) =>
      (count += item.quantity ? item.quantity : 1),
    0
  );

  useEffect(() => {
    if (searchVisibility || cartVisibility) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [searchVisibility, cartVisibility]);

  return (
  <div className="z-50">
  <Searchbar products={products} />
    <Cart />
    <header className="sticky">
      <div className="w-full mx-auto flex justify-between py-4 max-w-screen-2xl px-6">
        <nav>
          <ul className={styles.mainNav}>
            <li className=" mt-2 w-36 md:w-56">
              <Link href="/">

                <Image
              src= {haalogo}
              alt= "Haar Atelier Alkmaar Logo"
              width={771}
              height={197}
              ></Image>

              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <button className="relative pr-2 z-50 border-0 bg-transparent outline-0">
            <MdOutlineShoppingBag
              color="black"
              onClick={toggleCartVisibility}
              size={24}
              className=""
            />
            {cartLength > 0 && (
              <span className="absolute w-4 h-4 text-black text-xs border border-solid border-gray-500 rounded-full flex flex-row justify-center items-center p-2 -left-1 -bottom-1 bg-white">
                {cartLength}
              </span>
            )}
          </button>
          <button className="relative z-50 border-0 bg-transparent outline-0">
            <MdManageSearch
              onClick={toggleSearchVisibility}
              color="black"
              size={34}
              className=""
            />
          </button>
        </div>
      </div>
    </header>
  </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await client.fetch(categoriesQuery);
  const popularProducts = await client.fetch(popularProductsQuery);

  if (!categories || !popularProducts) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { categories, products: popularProducts },
    revalidate: 60
  };
};

export default Header;
