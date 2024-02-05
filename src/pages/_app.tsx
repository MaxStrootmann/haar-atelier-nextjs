import "styles/globals.scss";
import type { AppProps } from "next/app";
import React, { useEffect, useReducer, useState } from "react";
import PageLayout from "components/PageLayout/PageLayout";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { cartReducer } from "reducers/cart/reducer";
import Types from "reducers/cart/types";
import productsBySlugsQuery from "lib/sanity/queries/products_by_slugs";
import { CookieCart, CartProduct, CategorySchema, ProductSchema } from "lib/interfaces";
import Cookies from "js-cookie";
import client from "lib/sanity/client";
import { useRouter } from "next/router";
import SearchVisibilityContext from "contexts/searchVisibilityContext";
import { DataProvider } from "contexts/DataContext";
import Script from "next/script";

interface MyAppProps {
  children: React.ReactNode;
  categories: CategorySchema[];
  products: ProductSchema[];
}

const cartItems = Cookies.get("_cart");

const parsedCartItems = cartItems && JSON.parse(cartItems);
const slugs =
  parsedCartItems &&
  parsedCartItems.reduce((slugs: string[], item: CookieCart) => {
    return [...slugs, item.slug];
  }, []);

const MyApp = ({ Component, pageProps }: AppProps, { categories, products }: MyAppProps) => {
  const router = useRouter();
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartVisibility, setCartVisibilty] = useState(false);
  const [searchVisibility, setSearchVisibilty] = useState(false);
  const [backClicked, setBackClicked] = useState(false);

  const appendTotalItemsField = (products: CartProduct[]) => {
    return products.map((product: CartProduct, i) => {
      return {
        ...product,
        quantity: parsedCartItems[i].quantity ? parsedCartItems[i].quantity : 1,
      };
    });
  };

  const toggleCartVisibility = () => {
    setCartVisibilty(!cartVisibility);
  };

  const toggleSearchVisibility = () => {
    setSearchVisibilty(!searchVisibility);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (parsedCartItems) {
        const cartProducts = await client.fetch(productsBySlugsQuery, {
          slugs,
        });

        if (!cartProducts) {
          throw Error("Sorry, something went wrong.");
        }

        dispatch({
          type: Types.bulkAdd,
          payload: cartProducts && appendTotalItemsField(cartProducts),
        });
      }
    };

    if (router.asPath !== "/success") fetchCartProducts();
  }, [router.asPath]);

  // useEffect(() => {
  //   window.fbAsyncInit = function() {
  //     window.FB.init({
  //       appId            : APP_ID,
  //       autoLogAppEvents : true,
  //       xfbml            : true,
  //       version          : 'v18.0'
  //     });
  //   };
  // }, []);

  useEffect(() => {
    const handleBackClick = () => {
      setSearchVisibilty(false);
    };

    window.addEventListener("popstate", handleBackClick);

    return () => {
      window.removeEventListener("popstate", handleBackClick);
    };
  }, []);

  return (
    <SearchVisibilityContext.Provider
      value={{
        searchVisibility,
        toggleSearchVisibility,
      }}
    >
      <CartItemsContext.Provider
        value={{
          cart,
          dispatch,
        }}
      >
        <CartVisibilityContext.Provider
          value={{
            cartVisibility,
            toggleCartVisibility,
          }}
        >
          <DataProvider>
            <Script
              strategy='afterInteractive'
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
            />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA}');
              `}
            </Script>
            <PageLayout categories={categories} products={products}>
              <Component backClicked={backClicked} {...pageProps} />
              <Script async defer crossOrigin='anonymous' src='https://connect.facebook.net/en_US/sdk.js' />
            </PageLayout>
          </DataProvider>
        </CartVisibilityContext.Provider>
      </CartItemsContext.Provider>
    </SearchVisibilityContext.Provider>
  );
};

export default MyApp;
