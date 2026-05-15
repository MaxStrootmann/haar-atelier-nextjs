import Header from "./Header";
import Footer from "./Footer";
import { useData } from "contexts/DataContext";
import type { StorefrontProduct } from "lib/payload/storefront";
import Headroom from "react-headroom";
import { useContext, useEffect, useState } from "react";
import SearchVisibilityContext from "contexts/searchVisibilityContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";

interface PageLayoutProps {
  children: React.ReactNode;
  categories: string[];
  products: StorefrontProduct[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { categories, products } = useData();
  const { searchVisibility } = useContext(SearchVisibilityContext);
  const { cartVisibility } = useContext(CartVisibilityContext);

  


  return (
    <>
        <div className="">
        {(cartVisibility || searchVisibility) ? (
          <Header products={products} />
        ) : (
          <Headroom>
            <Header products={products} />
          </Headroom>
        )}
          <div className="">{children}</div>
          <Footer />
        </div>
    </>
  );
};

export default PageLayout;
