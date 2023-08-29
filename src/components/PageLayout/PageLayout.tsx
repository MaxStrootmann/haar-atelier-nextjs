import Header from "./Header";
import Footer from "./Footer";
import { useData } from "contexts/DataContext";
import { CategorySchema, ProductSchema } from "lib/interfaces";

interface PageLayoutProps {
  children: React.ReactNode;
  categories: CategorySchema[];
  products: ProductSchema[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {

  const {categories, products} = useData();

  return (
    <div className="bg-wolken">
      <Header children={children} categories={categories} products={products}/>
      <div className="bg-cover container max-w-screen-lg mx-auto px-4 py-12 z-10 relative min-h-[75vh]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
