import Header from "./Header";
import Footer from "./Footer";
import { useData } from "contexts/DataContext";
import { CategorySchema, ProductSchema } from "lib/interfaces";
import Headroom from "react-headroom";
import { useContext, useEffect, useState } from "react";
import SearchVisibilityContext from "contexts/searchVisibilityContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";

interface PageLayoutProps {
  children: React.ReactNode;
  categories: CategorySchema[];
  products: ProductSchema[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { categories, products } = useData();
  const { searchVisibility } = useContext(SearchVisibilityContext);
  const { cartVisibility } = useContext(CartVisibilityContext);

  useEffect(() => {
    if (searchVisibility) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [searchVisibility]);

  return (
    <>
      <div className="bg-wolken bg-repeat min-h-screen">
        <div className="2xl:container">
          {!cartVisibility ? (
            <Headroom style={{ zIndex: "40" }}>
              <Header
                children={children}
                categories={categories}
                products={products}
              />
            </Headroom>
          ) : (
            <Header
              children={children}
              categories={categories}
              products={products}
            />
          )}
          <div className="">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PageLayout;
