import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import client from "lib/sanity/client";
import groq from "groq";

interface DataContextProps {
  categories: any[];
  products: any[];
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = groq`
        *[_type == "product"] {
          _id,
          name,
          "slug": slug.current,
          }`;
      const fetchedProducts = await client.fetch(query);
      const fetchedCategories = await client.fetch(
        groq`array::unique(*[_type == "product"].category)`
      );

      setCategories(fetchedCategories);
      setProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ categories, products }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
