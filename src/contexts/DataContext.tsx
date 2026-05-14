import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

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
      const response = await fetch("/api/payload-products");
      if (!response.ok) return;

      const { products: fetchedProducts = [] } = await response.json();
      const fetchedCategories = Array.from(
        new Set(
          fetchedProducts
            .map((product: any) => product.subcategories?.[0]?.title)
            .filter(Boolean)
        )
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
