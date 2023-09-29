import CategoriesDropdown from "components/Shop/CategoriesDropdown";
import ProductCard from "components/Shop/ProductCard";
import SortDropdown from "components/Shop/SortDropdown";
import groq from "groq";
import { ProductSchema } from "lib/interfaces";
import client from "lib/sanity/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

interface Props {
  categories: any[];
  products: ProductSchema[];
  categoryFilter: string;
}

export default function CategoriesPage({
  categories,
  products,
  categoryFilter,
}: Props) {
  const [displayedProducts, setDisplayedProducts] =
  useState<ProductSchema[]>(products);

  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 1500
    ) {
      // Fetch next set of products
      const newProducts = await client.fetch(
        groq`*[_type == "product" ${categoryFilter}][${
          displayedProducts.length
        }...${displayedProducts.length + 10}]`
      );
      setDisplayedProducts([...displayedProducts, ...newProducts]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [displayedProducts]);

  useEffect(() => {
    async function fetchNewData() {
      const newProducts = await client.fetch(
        groq`*[_type == "product" ${categoryFilter}] [0...10]`
      );
      setDisplayedProducts(newProducts);
    }
  
    fetchNewData();
  }, [categoryFilter]);

  return (
    <div>
      <div className="space-y-4">
        <h1>Sorted Categories</h1>
        <CategoriesDropdown categories={categories} />
        <SortDropdown />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8">
          {displayedProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {

  console.log("context.query:", context.query.category)
  let category = typeof context.query.category === 'string' ? decodeURIComponent(context.query.category).replace(/-/g, ' ').replace(/and/g, "&").trim() : undefined;
  console.log("category:", category)
  const categoryFilter = category ? `&& category == "${category}"` : "";
  console.log("categoryFilter:", categoryFilter)
  const categories = await client.fetch(
    groq`array::unique(*[_type == "product"].category)`
  );
  const products = await client.fetch(
    groq`*[_type == "product" ${categoryFilter}] [0...10]`
  );

  return {
    props: {
      categories,
      products,
      categoryFilter,
    },
  };
};
