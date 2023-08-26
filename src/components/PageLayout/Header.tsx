import styles from "styles/components/PageLayout/Header.module.scss";
import Link from "next/link";
import Cart from "./Cart/Cart";
import { useContext } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { CartProduct } from "lib/interfaces";
import { MdManageSearch, MdOutlineShoppingBag } from "react-icons/md";
import haalogo from "/public/haalogo.svg"
import Image from "next/image";
import SearchVisibilityContext from "contexts/searchVisibilityContext";
import Searchbar from "./Searchbar/Searchbar";

const Header = () => {
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
    <Searchbar />
      <Cart />
      <header className=" bg-wolken sticky top-0 z-20">
        <div className="w-full mx-auto flex justify-between py-4 max-w-7xl px-6">
          <nav>
            <ul className={styles.mainNav}>
              <li>
                <Link href="/">
                  <a>
                    <Image
                  src= {haalogo}
                  alt= "home logo Haar Atelier Alkmaar"
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
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
