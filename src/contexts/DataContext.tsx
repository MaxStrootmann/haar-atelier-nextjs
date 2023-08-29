import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import onSaleProductsQuery from "lib/sanity/queries/on_sale_products";

interface DataContextProps {
  categories: any[];
  products: any[];
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await client.fetch(categoriesQuery);
      const fetchedProducts = await client.fetch(onSaleProductsQuery);

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

