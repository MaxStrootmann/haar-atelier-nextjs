import SortedCategories from "components/SortedCategories";
import groq from "groq";
import { ProductSchema } from "lib/interfaces";
import client from "lib/sanity/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSearchParams } from "next/navigation";

interface Props {
  categories: any[];
  products: ProductSchema[];
  selectedCategory?: string | null;
}

export default function Test( {categories, products, selectedCategory}: Props) {
  console.log("params:", selectedCategory)
  return (
    <div>
      <SortedCategories products={products} categories={categories}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const selectedCategory = params?.category || null;
  const categories = await client.fetch(groq`array::unique(*[_type == "product"].category)`
  );
  const products = await client.fetch(groq`*[_type == "product"][0...10]`);

  return {
    props: {
      categories,
      products,
      selectedCategory
    }
  }

}