import styles from "styles/components/PageLayout/Header.module.scss";
import Link from "next/link";
import Cart from "./Cart/Cart";
import React, { useContext } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { CartProduct, CategorySchema, ProductSchema } from "lib/interfaces";
import { MdManageSearch, MdOutlineShoppingBag } from "react-icons/md";
import haalogo from "/public/haalogo.svg"
import Image from "next/image";
import SearchVisibilityContext from "contexts/searchVisibilityContext";
import Searchbar from "./Searchbar/Searchbar";
import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import onSaleProductsQuery from "lib/sanity/queries/on_sale_products";



interface HeaderProps {
  children: React.ReactNode;
  categories: CategorySchema[];
  products: ProductSchema[];
}


const Header: React.FC<HeaderProps> = ({ categories, products }) => {
  const { cart } = useContext(CartItemsContext);
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const { toggleSearchVisibility } = useContext(SearchVisibilityContext);
  const cartLength = cart.reduce(
    (count: number, item: CartProduct) =>
      (count += item.quantity ? item.quantity : 1),
    0
  );

  return (
    <>
    <Searchbar categories={categories} products={products} />
      <Cart />
      <header className="sticky">
        <div className="w-full mx-auto flex justify-between py-4 max-w-7xl px-6">
          <nav>
            <ul className={styles.mainNav}>
              <li className=" mt-2 w-36 lg:w-56">
                <Link href="/">
                  <a>
                    <Image
                  src= {haalogo}
                  alt= "Haar Atelier Alkmaar Logo"
                  width={771}
                  height={197}
                  ></Image>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <button className=" mr-4 relative z-50 border-0 bg-transparent outline-0">
              <MdOutlineShoppingBag
                color="black"
                onClick={toggleCartVisibility}
                size={24}
                className="lg:w-8 lg:h-8"
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
                className="lg:w-12 lg:h-12"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await client.fetch(categoriesQuery);
  const onSaleProducts = await client.fetch(onSaleProductsQuery);

  if (!categories || !onSaleProducts) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { categories, products: onSaleProducts },
    revalidate: 60
  };
};

export default Header;
