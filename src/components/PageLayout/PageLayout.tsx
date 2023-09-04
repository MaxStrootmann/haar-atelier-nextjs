import Header from "./Header";
import Footer from "./Footer";
import { useData } from "contexts/DataContext";
import { CategorySchema, ProductSchema } from "lib/interfaces";
import Headroom from "react-headroom";
import { useContext, useEffect, useState } from "react";
import SearchVisibilityContext from "contexts/searchVisibilityContext";

interface PageLayoutProps {
  children: React.ReactNode;
  categories: CategorySchema[];
  products: ProductSchema[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { categories, products } = useData();
  const { searchVisibility } = useContext(SearchVisibilityContext);

  useEffect(() => {
    if (searchVisibility) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [searchVisibility]);

  return (
    <>
      <div className="bg-wolken bg-repeat min-h-screen z">
        <Headroom style={{ zIndex: "40" }}>
          <Header
            children={children}
            categories={categories}
            products={products}
          />
        </Headroom>
        <div className="bg-cover container max-w-screen-lg mx-auto px-4 py-12 z-10 relative min-h-[75vh]">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
