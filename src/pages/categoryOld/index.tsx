import { GetStaticProps, GetServerSideProps } from "next";
import { PER_PAGE } from "./[page]";
import PaginationPage from "components/Pagination/PaginatedPage";
import groq from "groq";
import client from "lib/sanity/client";
import { ProductSchema } from "lib/interfaces";
import { useEffect, useState } from "react";

interface Props {
  searchParams: {
    price?: string;
    popularity?: string;
    category?: string;
  };
  categories: any[];
}

export default function Category({ searchParams, categories }: Props) {

  console.log("searchParams:", searchParams);

  console.log("Categories:", categories);

  return (
    <div>
      {/* <PaginationPage
        products={products}
        currentPage={1}
        totalProducts={total}
        perPage={PER_PAGE}
        categories={categories}
      /> */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (searchParams: Props) => {
  const { price = "", popularity = "desc", category = "" } = searchParams;
  const categoryFilter = category ? `&& category == ${category}` : "";
  const priceOrder = price ? `| order(price ${price})` : "";
  const popularityOrder = popularity ? `| order(popularity ${popularity})` : "";
  const order = `${priceOrder}${popularityOrder}`;

  const limit = PER_PAGE;

  const total = await client.fetch(groq`count(*[_type == "product"])`);
  const products = await client.fetch<ProductSchema[]>(groq`
        *[_type == "product" ${categoryFilter}] ${order} [0...${limit}] {
          popularity,
          name,
          featured_image,
          price,
          in_stock,
        }`);
  return {
    props: {
      products,
      total,
    },
  };
};

